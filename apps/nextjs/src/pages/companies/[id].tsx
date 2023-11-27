import { FC, useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter, appRouter, createContext } from "@acme/api";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { get, isEmpty } from "lodash";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { format, parseISO } from "date-fns";

interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  sentiment: number;
  total: number;
}

const initialState: SentimentStats = {
  positive: 0,
  negative: 0,
  neutral: 0,
  sentiment: 0,
  total: 0,
};

interface Article {
  categories: string[];
  company_id: number;
  content: string;
  countries: string[];
  createdAt: Date;
  description: string;
  id: string;
  image_url: string | null;
  keywords: string[];
  language: string;
  link: string;
  publish_date: Date | null;
  s_negative: Prisma.Decimal;
  s_neutral: Prisma.Decimal;
  s_positive: Prisma.Decimal;
  sentiment: string;
  source_id: string;
  title: string;
  updatedAt: Date;
  video_url: string | null;
}

interface GroupedArticles {
  [key: string]: Article[];
}

const CompanyDetails: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  companyId,
}) => {
  const {
    data: company,
    isLoading,
    refetch,
  } = trpc.company.byId.useQuery(companyId);
  const articleQuery = trpc.article.byCompanyId.useQuery(companyId);
  const articles: Article[] = get(articleQuery, "data", []);
  const [sentiment, setSentiment] = useState<SentimentStats | undefined>(
    initialState,
  );

  function groupArticlesByDate(articles: Article[]): {
    [date: string]: number;
  } {
    const groupedByDate: { [date: string]: number } = {};

    articles.sort((a, b) => {
      const dateA = a.publish_date ? new Date(a.publish_date) : null;
      const dateB = b.publish_date ? new Date(b.publish_date) : null;

      if (!dateA && !dateB) {
        return 0; // Both dates are considered equal
      }

      if (!dateA) {
        return -1; // dateA is considered smaller (comes first)
      }

      if (!dateB) {
        return 1; // dateB is considered smaller (comes first)
      }

      // Now, you can safely call getDate() on dateA and dateB
      return dateA.getDate() - dateB.getDate();
    });

    articles.forEach((article) => {
      const date = article.publish_date
        ? new Date(article.publish_date)
        : new Date(article.createdAt);
      const formatted = date ? format(date, "dd/MM/yyyy") : "";

      if (formatted) {
        // Check if the date already has a group, if not, create one
        let sum = groupedByDate[formatted];
        if (!sum) {
          sum = 0;
        }

        // Add the numeric property to the corresponding date group
        switch (article.sentiment) {
          case "Positive":
            sum += 1;
            break;
          case "Negative":
            sum -= 1;
            break;
          case "Neutral":
            break;
          default:
            break;
        }
        groupedByDate[formatted] = sum;
      }
    });

    return groupedByDate;
  }

  const groupedArticles = articles ? groupArticlesByDate(articles) : [];

  console.log(groupedArticles, "groupedArticles");

  ChartJS.register();
  defaults.maintainAspectRatio = true;
  defaults.responsive = true;

  const lineData = {
    labels: Object.entries(groupedArticles).map(([key, value]) => key),
    datasets: [
      {
        label: "Sentiment",
        data: Object.entries(groupedArticles).map(([key, value]) => value),
        backgroundColor: "#41258633",
        borderColor: "#412586CC",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    const articlesSentiment = articles?.reduce(
      (accumulator, current) => {
        accumulator.total++;

        switch (current.sentiment) {
          case "Positive":
            accumulator.positive++;
            accumulator.sentiment++;
            break;
          case "Negative":
            accumulator.negative++;
            accumulator.sentiment--;
            break;
          case "Neutral":
            accumulator.neutral++;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        positive: 0,
        negative: 0,
        neutral: 0,
        sentiment: 0,
        total: 0,
      },
    );

    setSentiment(articlesSentiment);
  }, [articles]);

  return company ? (
    <main className="bg-light-gray lgr:px-48 flex min-h-screen flex-col py-7 px-7 lg:px-16 xl:px-60">
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <div className="flex flex-col lg:w-[50%] lg:max-w-[50%]">
          <CompanyCard company={company} refetch={refetch} />
          <div className="m-2 mt-0 flex flex-grow rounded-lg bg-white p-6">
            <Line
              data={lineData}
              options={{
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Sentiment Analysis",
                    font: {
                      size: 14,
                    },
                    padding: {
                      bottom: 20,
                    },
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
        <OtherOrFavoritedCompany />
      </div>
      <ArticlesSection />
    </main>
  ) : null;
};

import { Prisma, prisma } from "@acme/db";
import superjson from "superjson";
import CompanyCard from "../../components/CompanyCard";
import OtherOrFavoritedCompany from "../../components/OtherOrFavoritedCompany";
import ArticlesSection from "../../components/ArticlesSection";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, auth: null },
    transformer: superjson,
  });
  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  const companyId = +id;
  await ssg.company.byId.prefetch(companyId);

  return {
    props: {
      trpcState: JSON.parse(JSON.stringify(ssg.dehydrate())),
      companyId,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default CompanyDetails;

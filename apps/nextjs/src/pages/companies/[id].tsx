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
  id: number;
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
  const { data: company, isLoading } = trpc.company.byId.useQuery(companyId);
  const { data: companies } = trpc.company.all.useQuery();
  const { data: articles } = trpc.article.byCompanyId.useQuery(companyId);
  const [sentiment, setSentiment] = useState<SentimentStats | undefined>(
    initialState,
  );

  const articleData = {
    article_id: "a97c710d43296bfa6ba171a5cd28fa6f",
    title: "Test 7",
    link: "https://investorplace.com/2023/10/7-stocks-to-buy-before-they-become-the-next-trillion-dollar-companies-october-edition/",
    keywords: [
      "Stocks to Buy",
      "NYSE:BRK-A",
      "NYSE:BRK-B",
      "NYSE:V",
      "NYSE:MA",
      "NYSE:TSM",
      "NYSE:WMT",
      "NYSE:XOM",
      "NYSE:DHR",
      "OTCMKTS:PCCYF",
      "OTCMKTS:WMMVY",
      "Stocks to Buy",
    ],
    creator: ["TEST"],
    video_url: null,
    description:
      "Looking for the next trillion-dollar companies to pump up your portfolio? These seven firms have a good shot at reaching that mark.",
    content: "The trillion-dollar this exclusive club in coming years.",
    pubDate: "2023-10-21 16:25:11",
    image_url: null,
    source_id: "investorplace",
    source_priority: 3707,
    country: ["united states of america"],
    category: ["top"],
    language: "english",
    sentiment: "Positive",
    SPositive: 0.4290240406990051,
    SNegative: 0.044307246804237366,
    SNeutral: 0.5266686677932739,
  };

  const utils = trpc.useContext();
  const { mutate } = trpc.article.create.useMutation({
    async onSuccess() {
      await utils.article.all.invalidate();
    },
  });

  const createArticle = () => {
    mutate({
      id: 20,
      company_id: 1,
      title: articleData.title,
      link: articleData.link,
      keywords: articleData.keywords,
      video_url: articleData.video_url || "",
      description: articleData.description,
      content: articleData.content,
      publish_date: new Date(articleData.pubDate),
      image_url: articleData.image_url || "",
      source_id: articleData.source_id,
      countries: articleData.country,
      categories: articleData.category,
      language: articleData.language,
      sentiment: articleData.sentiment,
      s_positive: articleData.SPositive,
      s_negative: articleData.SNegative,
      s_neutral: articleData.SNeutral,
    });
  };

  articles?.map((article) => {
    const date = article.publish_date ? new Date(article.publish_date) : null;
    const formatted = date ? format(date, "dd/MM/yyyy") : null;

    console.log(formatted);
  });

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
      const date = article.publish_date ? new Date(article.publish_date) : "";
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
  const companyName = get(company, "name", null);

  return company ? (
    <main className="bg-light-gray lgr:px-48 flex min-h-screen flex-col py-7 px-7 lg:px-16 xl:px-60">
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <div className="flex flex-col lg:w-[50%] lg:max-w-[50%]">
          <CompanyCard company={company} sentiment={sentiment} />
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
        <div>
          <h2 className="font-lato text-primary p-2 text-xl font-bold">
            Other Company / Favorited Company
          </h2>
          <div className="flex flex-col gap-2">
            {companies?.map((company) => (
              <CompanyCardMinimal key={company.name} company={company} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col px-0">
        <div className="lg:w-[50%] lg:max-w-[50%]">
          <h2 className="font-lato text-primary p-2 text-2xl font-bold">
            Articles
          </h2>
        </div>
        <div className="grid grid-cols-1 justify-end gap-x-28 gap-y-5 pl-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-7">
          {articles?.map((article) => (
            <ArticleCardSmall
              key={`article-card-${article.id}`}
              article={article}
            />
          ))}
        </div>
      </div>
    </main>
  ) : null;
};

import { Prisma, prisma } from "@acme/db";
import superjson from "superjson";
import CompanyCard from "../../components/CompanyCard";
import CompanyCardSmall from "../../components/CompanyCardSmall";
import ArticleCard from "../../components/ArticleCard";
import CompanyCardMinimal from "../../components/CompanyCardMinimal";
import ArticleCardSmall from "../../components/ArticleCardSmall";

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

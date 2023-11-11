import { FC, useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter, appRouter, createContext } from "@acme/api";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { get } from "lodash";

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

const CompanyDetails: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  companyId,
}) => {
  const { data: company, isLoading } = trpc.company.byId.useQuery(companyId);
  const { data: companies } = trpc.company.all.useQuery();
  const { data: articles } = trpc.article.byCompanyId.useQuery(companyId);
  const [sentiment, setSentiment] = useState<SentimentStats | undefined>(
    initialState,
  );

  console.log(company, "company");
  console.log(articles, "articles");

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
    <main className="bg-light-gray flex min-h-screen flex-col py-7 lg:px-36">
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <div className="flex flex-col lg:w-[50%] lg:max-w-[50%]">
          <CompanyCard company={company} sentiment={sentiment} />
          <div>Where graph is going to be</div>
        </div>
        <div>
          <h2 className="font-lato text-primary p-2 text-xl font-bold">
            Other Company / Favorited Company
          </h2>
          <div>
            {companies?.map((company) => (
              <CompanyCardSmall key={company.name} company={company} />
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
        <div className="grid grid-cols-2 justify-end gap-y-5 gap-x-36 pl-2">
          {articles?.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </main>
  ) : null;
};

import { prisma } from "@acme/db";
import superjson from "superjson";
import CompanyCard from "../../components/CompanyCard";
import CompanyCardSmall from "../../components/CompanyCardSmall";
import ArticleCard from "../../components/ArticleCard";

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

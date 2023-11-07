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
    <main className="bg-light-gray flex min-h-screen justify-center py-7 lg:px-36">
      <div className="flex-auto flex-col">
        <CompanyCard company={company} sentiment={sentiment} />
      </div>
      <div className="flex-auto flex-col">
        <CompanyCard company={company} />
      </div>
    </main>
  ) : null;
};

import { prisma } from "@acme/db";
import superjson from "superjson";
import CompanyCard from "../../components/CompanyCard";

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

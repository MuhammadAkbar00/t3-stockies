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

const ArticleDetails: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articleId,
}) => {
  const { data: article, isLoading } = trpc.article.byId.useQuery(articleId);

  return article ? (
    <main className="bg-light-gray lgr:px-48 flex min-h-screen flex-col py-7 px-7 lg:px-16 xl:px-60">
      <div className="flex flex-col justify-between gap-8">
        <p className="text-primary text-4xl font-bold">{article.title}</p>
        <p className="text-primary text-2xl">{article.description}</p>
        <p>{article.content}</p>
      </div>
    </main>
  ) : null;
};

import { prisma } from "@acme/db";
import superjson from "superjson";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, auth: null },
    transformer: superjson,
  });
  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  const articleId = id;
  await ssg.article.byId.prefetch(articleId);

  return {
    props: {
      trpcState: JSON.parse(JSON.stringify(ssg.dehydrate())),
      articleId,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ArticleDetails;

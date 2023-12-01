import { FC, useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter, appRouter, createContext } from "@acme/api";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { get } from "lodash";

const ArticleDetails: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articleId,
}) => {
  const { data: article, isLoading } = trpc.article.byId.useQuery(articleId);

  return article && article.title && article.content ? (
    <>
      <div>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="h-96 w-full object-cover"
          src={
            formatImageSource(
              "https://wallpapers.com/images/featured/new-york-aesthetic-pictures-hdj6cfehppy286jt.jpg",
            ) ||
            "https://media.istockphoto.com/id/1202205418/photo/find-the-shortest-path-between-points-a-and-b.jpg?s=612x612&w=0&k=20&c=_0PSqcLbxAHx8eb_vFzDuKpKtlvZmxj1XbwZ61iwE0s="
          }
          alt=""
        />
      </div>
      <main className="bg-light-gray lgr:px-48 flex min-h-screen flex-col py-7 px-7 lg:px-16 xl:px-60">
        <div className="flex flex-col justify-between gap-8">
          <p className="text-4xl font-bold">{article.title}</p>
          {article.description && (
            <p className="text-primary text-2xl">{article.description}</p>
          )}
          {article.link && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={article.link}
              className="text-primary text-2xl"
            >
              {article.link}
            </a>
          )}
          <p>{article.content}</p>
        </div>
      </main>
    </>
  ) : null;
};

import { prisma } from "@acme/db";
import superjson from "superjson";
import Image from "next/image";
import { formatImageSource } from "../../utils/formatImageSource";

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

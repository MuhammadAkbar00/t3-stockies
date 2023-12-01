import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import React, { useState } from "react";
import ArticleCardSmall from "./ArticleCardSmall";
import Pagination from "./Pagination";
import { paginate } from "../helper/paginate";
import { get } from "lodash";
import { trpc } from "../utils/trpc";
import ArticleCardSmallSkeleton from "./skeleton/ArticleCardSmallSkeleton";

const ArticlesSection: React.FC = () => {
  const articleQuery = trpc.article.all.useQuery();
  const articleData = get(articleQuery, "data", []);
  const isLoading = get(articleQuery, "isLoading", false);

  const [currentPageArticle, setCurrentPageArticle] = useState(1);
  const pageSizeArticle = 9;

  const paginatedArticle = paginate(
    articleData,
    currentPageArticle,
    pageSizeArticle,
  );

  return (
    <div className="flex flex-col px-0 pt-4">
      <h2 className="font-lato text-primary p-2 text-2xl font-bold">
        Articles
      </h2>
      <div className="grid grid-cols-1 justify-end gap-x-28 gap-y-5 pl-2 xl:grid-cols-2 2xl:grid-cols-3 2xl:gap-x-7">
        {!isLoading
          ? paginatedArticle.map((article) => (
              <ArticleCardSmall
                key={`article-card-${article.id}`}
                article={article}
              />
            ))
          : [...Array(pageSizeArticle)].map((article, index) => (
              <ArticleCardSmallSkeleton
                key={`article-card-small-skeleton-${index}`}
              />
            ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPageArticle}
          totalCount={articleData.length}
          pageSize={pageSizeArticle}
          onPageChange={(page) => setCurrentPageArticle(page)}
        />
      </div>
    </div>
  );
};

export default ArticlesSection;

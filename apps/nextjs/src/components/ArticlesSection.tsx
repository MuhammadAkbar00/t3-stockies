import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import React, { useState } from "react";
import ArticleCardSmall from "./ArticleCardSmall";
import Pagination from "./Pagination";
import { paginate } from "../helper/paginate";

const ArticlesSection: React.FC<{
  articles: inferProcedureOutput<AppRouter["article"]["all"]>;
}> = ({ articles }) => {
  const [currentPageArticle, setCurrentPageArticle] = useState(1);
  const pageSizeArticle = 9;

  const paginatedArticle = paginate(
    articles,
    currentPageArticle,
    pageSizeArticle,
  );

  return (
    <div className="flex flex-col px-0">
      <h2 className="font-lato text-primary p-2 text-2xl font-bold">
        Articles
      </h2>
      <div className="grid grid-cols-1 justify-end gap-x-28 gap-y-5 pl-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-7">
        {paginatedArticle.map((article) => (
          <ArticleCardSmall
            key={`article-card-${article.id}`}
            article={article}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPageArticle}
          totalCount={articles.length}
          pageSize={pageSizeArticle}
          onPageChange={(page) => setCurrentPageArticle(page)}
        />
      </div>
    </div>
  );
};

export default ArticlesSection;

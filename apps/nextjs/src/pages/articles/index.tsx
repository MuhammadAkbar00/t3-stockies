import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import ArticleCardSmall from "../../components/ArticleCardSmall";
import ArticleCardSmallSkeleton from "../../components/skeleton/ArticleCardSmallSkeleton";
import { paginate } from "../../helper/paginate";
import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import Pagination from "../../components/Pagination";
import Dropdown from "../../components/Dropdown";

const Articles = () => {
  const { data: articles = [], isLoading } = trpc.article.all.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedArticles, setSearchedArticles] =
    useState<inferProcedureOutput<AppRouter["article"]["all"]>>(articles);

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    setTimeout(() => {
      setSearchedArticles(
        articles.filter(
          (article) =>
            article.title.toLowerCase().includes(search) ||
            article.description.toLowerCase().includes(search),
        ),
      );
    }, 300);
  }, [searchTerm, articles]);

  const [currentPageArticle, setCurrentPageArticle] = useState(1);
  const [pageSizeArticle, setPageSizeArticle] = useState(9);

  const paginatedArticle = paginate(
    searchedArticles,
    currentPageArticle,
    pageSizeArticle,
  );

  const pageSizeOptions = [3, 6, 9, 12, 24];

  return (
    <main className="bg-light-gray lgr:px-48 flex min-h-screen flex-col py-7 px-7 lg:px-16 xl:px-60">
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <p className="text-primary text-xl font-bold">Articles</p>
          <div className="flex items-center justify-center gap-4">
            <Dropdown
              options={pageSizeOptions}
              onChange={(text) => setPageSizeArticle(text)}
            />
            <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 justify-end gap-x-28 gap-y-5 pl-2 xl:grid-cols-2 2xl:grid-cols-3 2xl:gap-x-7">
          {!isLoading
            ? paginatedArticle?.map((article) => (
                <ArticleCardSmall key={article.id} article={article} />
              ))
            : [...Array(15)]?.map((article, index) => (
                <ArticleCardSmallSkeleton
                  key={`article-small-card-skeleton-${index}`}
                />
              ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPageArticle}
            totalCount={searchedArticles.length}
            pageSize={pageSizeArticle}
            onPageChange={(page) => setCurrentPageArticle(page)}
          />
        </div>
      </div>
    </main>
  );
};

export default Articles;

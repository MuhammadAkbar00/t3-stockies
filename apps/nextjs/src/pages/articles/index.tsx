import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { get } from "lodash";
import SearchBar from "../../components/SearchBar";
import ArticleCardSmall from "../../components/ArticleCardSmall";

const Articles = () => {
  const { data: articles } = trpc.article.all.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedArticles, setSearchedArticles] = useState(articles);

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    setSearchedArticles(
      articles?.filter(
        (article) =>
          article.title.toLowerCase().includes(search) ||
          article.description.toLowerCase().includes(search),
      ),
    );
  }, [searchTerm, articles]);

  console.log(articles, "articles");

  return (
    <main className="bg-light-gray lgr:px-48 flex min-h-screen flex-col py-7 px-7 lg:px-16 xl:px-60">
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <p className="text-primary text-xl font-bold">Articles</p>
          <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="mt-4 grid grid-cols-1 justify-end gap-x-28 gap-y-5 pl-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-7">
          {searchedArticles?.map((article) => (
            <ArticleCardSmall key={article.id} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Articles;

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
    <main className="bg-light-gray flex min-h-screen flex-col py-7 lg:px-36">
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <p className="text-primary text-xl font-bold">Articles</p>
          <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {searchedArticles?.map((article) => (
            <ArticleCardSmall key={article.id} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Articles;

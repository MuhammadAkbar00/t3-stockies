import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { get } from "lodash";
import CompanyCard from "../../components/CompanyCard";
import SearchBar from "../../components/SearchBar";
import ArticleCard from "../../components/ArticleCard";

const Articles = () => {
  const { data: articles } = trpc.article.all.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedArticles, setSearchedArticles] = useState(articles);

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    setSearchedArticles(
      articles?.filter((article) =>
        article.title.toLowerCase().includes(search),
      ),
    );
  }, [searchTerm, articles]);

  console.log(articles, "articles");

  return (
    <main className="bg-light-gray flex min-h-screen flex-col py-7 lg:px-36">
      <div className="flex flex-col justify-center gap-2">
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
        {searchedArticles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
};

export default Articles;

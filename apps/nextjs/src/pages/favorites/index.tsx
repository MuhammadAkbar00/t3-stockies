import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { get } from "lodash";
import CompanyCard from "../../components/CompanyCard";
import SearchBar from "../../components/SearchBar";
import CompanyCardMinimal from "../../components/CompanyCardMinimal";
import { useUser } from "../../context/authContext";

const Favorites = () => {
  const { user } = useUser();
  const userId = user?.id ? user.id : null;

  const userCompanyFavoriteQuery =
    trpc.userCompanyFavorite.byUserId.useQuery(userId);

  const companyFavoriteArray = get(userCompanyFavoriteQuery, "data", []);

  const companyFavoriteData = companyFavoriteArray.map(
    (companyFavorite) => companyFavorite.user_company,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedFavoriteCompanies, setSearchedFavoriteCompanies] =
    useState(companyFavoriteData);

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    setTimeout(() => {
      setSearchedFavoriteCompanies(
        companyFavoriteData?.filter(
          (company) =>
            company.name.toLowerCase().includes(search) ||
            company.ticker.toLowerCase().includes(search),
        ),
      );
    }, 300);
  }, [searchTerm, companyFavoriteData]);

  return (
    <main className="bg-light-gray lgr:px-48 flex min-h-screen flex-col py-7 px-7 lg:px-16 xl:px-60">
      <div className="flex flex-col justify-center">
        {user ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-primary text-xl font-bold">
                Favorited Company List
              </p>
              <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {searchedFavoriteCompanies?.map((company) => (
                <CompanyCardMinimal key={company.id} company={company} />
              ))}
            </div>{" "}
          </>
        ) : (
          <div className="flex justify-center">
            Make sure you are logged in to see your favorites
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;

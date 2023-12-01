import React from "react";
import CompanyCardMinimal from "./CompanyCardMinimal";
import CompanyCardMinimalSkeleton from "./skeleton/CompanyCardMinimalSkeleton";
import { trpc } from "../utils/trpc";
import { get } from "lodash";
import { useUser } from "../context/authContext";

const OtherOrFavoritedCompany: React.FC = () => {
  const { user } = useUser();
  const companyQuery = trpc.company.all.useQuery();
  const userId = user?.id ? user.id : null;
  const userCompanyFavoriteQuery =
    trpc.userCompanyFavorite.byUserId.useQuery(userId);
  const companyData = get(companyQuery, "data", []);
  const companyFavoriteArray = get(userCompanyFavoriteQuery, "data", []);
  const isLoading = get(companyQuery, "isLoading", false);

  const companyFavoriteData = companyFavoriteArray.map(
    (companyFavorite) => companyFavorite.user_company,
  );

  return (
    <div>
      <h2 className="font-lato text-primary p-2 text-xl font-bold">
        {!user ? "Other Company" : "Favorited Company"}
      </h2>
      <div className="flex flex-col gap-2 md:min-w-[350px]">
        {!isLoading
          ? user
            ? companyFavoriteData
                .slice(0, 5)
                .map((companyItem) => (
                  <CompanyCardMinimal
                    key={companyItem.name}
                    company={companyItem}
                  />
                ))
            : companyData
                .slice(0, 5)
                .map((companyItem) => (
                  <CompanyCardMinimal
                    key={companyItem.name}
                    company={companyItem}
                  />
                ))
          : [...Array(5)]
              .slice(0, 5)
              .map((companyItem, index) => (
                <CompanyCardMinimalSkeleton
                  key={`article-card-small-skeleton-${index}`}
                />
              ))}
      </div>
    </div>
  );
};

export default OtherOrFavoritedCompany;

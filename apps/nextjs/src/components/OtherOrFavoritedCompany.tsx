import React from "react";
import CompanyCardMinimal from "./CompanyCardMinimal";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";
import CompanyCardMinimalSkeleton from "./skeleton/CompanyCardMinimalSkeleton";
import { trpc } from "../utils/trpc";
import { get } from "lodash";

const OtherOrFavoritedCompany: React.FC = () => {
  const companyQuery = trpc.company.all.useQuery();
  const companyData = get(companyQuery, "data", []);
  const isLoading = get(companyQuery, "isLoading", false);

  return (
    <div>
      <h2 className="font-lato text-primary p-2 text-xl font-bold">
        Other Company / Favorited Company
      </h2>
      <div className="flex flex-col gap-2">
        {!isLoading
          ? companyData
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

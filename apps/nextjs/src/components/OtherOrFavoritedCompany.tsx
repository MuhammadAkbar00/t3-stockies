import React from "react";
import CompanyCardMinimal from "./CompanyCardMinimal";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";

const OtherOrFavoritedCompany: React.FC<{
  companies: inferProcedureOutput<AppRouter["company"]["all"]>;
}> = ({ companies }) => {
  return (
    <div>
      <h2 className="font-lato text-primary p-2 text-xl font-bold">
        Other Company / Favorited Company
      </h2>
      <div className="flex flex-col gap-2">
        {companies.slice(0, 5).map((companyItem) => (
          <CompanyCardMinimal key={companyItem.name} company={companyItem} />
        ))}
      </div>
    </div>
  );
};

export default OtherOrFavoritedCompany;

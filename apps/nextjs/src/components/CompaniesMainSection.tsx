import React, { useState } from "react";
import Pagination from "./Pagination";
import { paginate } from "../helper/paginate";
import { get } from "lodash";
import { trpc } from "../utils/trpc";
import CompanyCard from "./CompanyCard";
import CompanyCardSkeleton from "./skeleton/CompanyCardSkeleton";

function CompaniesMainSection() {
  const companyQuery = trpc.company.all.useQuery();
  const companyData = get(companyQuery, "data", []);
  const isLoading = get(companyQuery, "isLoading", true);

  const [currentPageCompany, setCurrentPageCompany] = useState(1);
  const pageSizeCompany = 5;

  const paginatedCompany = paginate(
    companyData,
    currentPageCompany,
    pageSizeCompany,
  );

  return (
    <>
      {!isLoading
        ? paginatedCompany.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))
        : [...Array(pageSizeCompany)].map((company, index) => (
            <CompanyCardSkeleton key={`company-card-skeleton-${index}`} />
          ))}

      <Pagination
        currentPage={currentPageCompany}
        totalCount={companyData.length}
        pageSize={pageSizeCompany}
        onPageChange={(page) => setCurrentPageCompany(page)}
      />
    </>
  );
}

export default CompaniesMainSection;

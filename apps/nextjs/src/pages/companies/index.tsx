import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { get } from "lodash";
import CompanyCard from "../../components/CompanyCard";
import SearchBar from "../../components/SearchBar";

const Companies = () => {
  const { data: companies } = trpc.company.all.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedCompanies, setSearchedCompanies] = useState(companies);

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    setSearchedCompanies(
      companies?.filter(
        (company) =>
          company.name.toLowerCase().includes(search) ||
          company.ticker.toLowerCase().includes(search),
      ),
    );
  }, [searchTerm, companies]);

  console.log(companies, "companies");

  return (
    <main className="bg-light-gray flex min-h-screen flex-col py-7 lg:px-36">
      <div className="flex flex-col justify-center gap-2">
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
        {searchedCompanies?.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </main>
  );
};

export default Companies;

import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { useAuth, UserButton } from "@clerk/nextjs";
import CompanyCard from "../components/CompanyCard";
import CompanyCardSmall from "../components/CompanyCardSmall";
import { get } from "lodash";
import ArticleCard from "../components/ArticleCard";
import CompanyCardMinimal from "../components/CompanyCardMinimal";
import ArticleCardSmall from "../components/ArticleCardSmall";
import { paginate } from "../helper/paginate";
import { useState } from "react";
import Pagination from "../components/Pagination";
import OtherOrFavoritedCompany from "../components/OtherOrFavoritedCompany";
import ArticlesSection from "../components/ArticlesSection";

const Home: NextPage = () => {
  const companyQuery = trpc.company.all.useQuery();
  const articleQuery = trpc.article.all.useQuery();
  const companyData = get(companyQuery, "data", []);
  const articleData = get(articleQuery, "data", []);

  const [currentPageArticle, setCurrentPageArticle] = useState(1);
  const pageSizeArticle = 9;

  const paginatedArticle = paginate(
    articleData,
    currentPageArticle,
    pageSizeArticle,
  );

  const [currentPageCompany, setCurrentPageCompany] = useState(1);
  const pageSizeCompany = 5;

  const paginatedCompany = paginate(
    companyData,
    currentPageCompany,
    pageSizeCompany,
  );

  console.log(paginatedArticle, "paginatedArticle");

  return (
    <main className="bg-light-gray lgr:px-48 flex min-h-screen flex-col py-7 px-7 lg:px-16 xl:px-60">
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <div className="lg:w-[50%] lg:max-w-[50%]">
          {paginatedCompany.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
          <Pagination
            currentPage={currentPageCompany}
            totalCount={companyData.length}
            pageSize={pageSizeCompany}
            onPageChange={(page) => setCurrentPageCompany(page)}
          />
        </div>

        <OtherOrFavoritedCompany companies={companyData} />
      </div>
      <ArticlesSection articles={articleData} />
    </main>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { isSignedIn } = useAuth();
//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined,
//     { enabled: !!isSignedIn },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       {isSignedIn && (
//         <>
//           <p className="text-center text-2xl text-white">
//             {secretMessage && (
//               <span>
//                 {" "}
//                 {secretMessage} click the user button!
//                 <br />
//               </span>
//             )}
//           </p>
//           <div className="flex items-center justify-center">
//             <UserButton
//               appearance={{
//                 elements: {
//                   userButtonAvatarBox: {
//                     width: "3rem",
//                     height: "3rem",
//                   },
//                 },
//               }}
//             />
//           </div>
//         </>
//       )}
//       {!isSignedIn && (
//         <p className="text-center text-2xl text-white">
//           <Link href="/sign-in">Sign In</Link>
//         </p>
//       )}
//     </div>
//   );
// };

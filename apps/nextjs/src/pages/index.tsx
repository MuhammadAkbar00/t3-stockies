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

const Home: NextPage = () => {
  const companyQuery = trpc.company.all.useQuery();
  const articleQuery = trpc.article.all.useQuery();
  const companyData = get(companyQuery, "data", []);
  const articleData = get(articleQuery, "data", []);
  console.log(companyData, "companyData");
  console.log(articleData, "articleData");

  return (
    <main className="bg-light-gray lgr:px-48 flex min-h-screen flex-col py-7 px-7 lg:px-16 xl:px-60">
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <div className="lg:w-[50%] lg:max-w-[50%]">
          {companyData.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>
        <div>
          <h2 className="font-lato text-primary p-2 text-xl font-bold">
            Other Company / Favorited Company
          </h2>
          <div className="flex flex-col gap-2">
            {companyData.map((company) => (
              <CompanyCardMinimal key={company.name} company={company} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col px-0">
        <h2 className="font-lato text-primary p-2 text-2xl font-bold">
          Articles
        </h2>
        <div className="grid grid-cols-1 justify-end gap-x-28 gap-y-5 pl-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-7">
          {articleData.map((article) => (
            <ArticleCardSmall
              key={`article-card-${article.id}`}
              article={article}
            />
          ))}
        </div>
      </div>
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

import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Header from "../components/Header";
import CompanyCard from "../components/CompanyCard";
import CompanyCardSmall from "../components/CompanyCardSmall";

// const PostCard: React.FC<{
//   post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
// }> = ({ post }) => {
//   return (
//     <div className="max-w-2xl rounded-lg border-2 border-gray-500 p-4 transition-all hover:scale-[101%]">
//       <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">
//         {post.title}
//       </h2>
//       <p>{post.content}</p>
//     </div>
//   );
// };

const Home: NextPage = () => {
  const postQuery = trpc.post.all.useQuery();

  const nasdaq = [
    {
      name: "Airbnb Inc",
      image: "https://cdn-icons-png.flaticon.com/512/2111/2111320.png",
      ticker: "ABNB",
    },
    {
      name: "Advanced Micro Devices Inc",
      image: "https://cdn-icons-png.flaticon.com/512/731/731984.png",
      ticker: "AMD",
    },
    {
      name: "Amazon.com Inc",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png",
      ticker: "AMZN",
    },
    {
      name: "Apple Inc",
      image: "https://cdn-icons-png.flaticon.com/512/94/94225.png",
      ticker: "AAPL",
    },
    {
      name: "Activision Blizzard Inc",
      image: "https://cdn-icons-png.flaticon.com/512/731/731984.png",
      ticker: "ATVI",
    },
    {
      name: "Adobe Inc.",
      image: "https://cdn-icons-png.flaticon.com/512/731/731984.png",
      ticker: "ADBE",
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-light-gray flex min-h-screen flex-col px-48 py-7">
        <div className="flex flex-row justify-center gap-8">
          <div className="min-h-[600px]">
            {nasdaq.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </div>
          <div className="min-h-[600px]">
            <h2 className="font-lato text-primary text-xl font-bold">
              Other Company / Favorited Company
            </h2>
            <div>
              {nasdaq.map((company) => (
                <CompanyCardSmall key={company.name} company={company} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-red-600">
          <div className="min-h-[600px] min-w-[50%] flex-grow bg-green-600">
            Section1
          </div>
          <div className="min-h-[600px] min-w-[50%] flex-grow bg-pink-600">
            Section2
          </div>
        </div>
      </main>
    </>
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

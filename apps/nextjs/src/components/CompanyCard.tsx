import Image from "next/image";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "../context/authContext";
import { get } from "lodash";

interface IProps {
  company: {
    id: number;
    logo: string;
    name: string;
    ticker: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  sentiment: number;
  total: number;
}

const initialState: SentimentStats = {
  positive: 0,
  negative: 0,
  neutral: 0,
  sentiment: 0,
  total: 0,
};

export default function CompanyCard({ company }: IProps) {
  const [isFavorited, setIsFavorite] = useState(false);
  const { user } = useUser();
  const userId = user?.id || null;
  const { data: articles } = trpc.article.byCompanyId.useQuery(company.id);
  const userCompanyQuery = trpc.userCompanyFavorite.byUserAndCompanyId.useQuery(
    {
      user_id: userId,
      user_company_favorite_id: company.id,
    },
  );

  const utils = trpc.useContext();
  const { mutate: createUserCompanyFavorite } =
    trpc.userCompanyFavorite.create.useMutation({
      async onSuccess() {
        await utils.userCompanyFavorite.all.invalidate();
        setIsFavorite(true);
      },
    });

  const { mutate: deleteUserCompanyFavorite } =
    trpc.userCompanyFavorite.delete.useMutation({
      async onSuccess() {
        await utils.userCompanyFavorite.all.invalidate();
        setIsFavorite(false);
      },
    });

  const userCompanyData = get(userCompanyQuery, "data", null);

  useEffect(() => {
    if (userCompanyData && user) {
      setIsFavorite(true);
    }
  }, [userCompanyData, user]);

  const handleFavorite = () => {
    if (userId && company.id && !isFavorited) {
      createUserCompanyFavorite({
        user_id: userId,
        user_company_favorite_id: company.id,
      });
    }
    if (userId && company.id && isFavorited) {
      deleteUserCompanyFavorite({
        user_id: userId,
        user_company_favorite_id: company.id,
      });
    }
  };

  const [sentimentData, setSentimentData] = useState<
    SentimentStats | undefined
  >(initialState);

  useEffect(() => {
    const articlesSentiment = articles?.reduce(
      (accumulator, current) => {
        accumulator.total++;

        switch (current.sentiment) {
          case "Positive":
            accumulator.positive++;
            accumulator.sentiment++;
            break;
          case "Negative":
            accumulator.negative++;
            accumulator.sentiment--;
            break;
          case "Neutral":
            accumulator.neutral++;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        positive: 0,
        negative: 0,
        neutral: 0,
        sentiment: 0,
        total: 0,
      },
    );

    setSentimentData(articlesSentiment);
  }, [articles]);
  return (
    <div className="relative m-2 mt-0 flex flex-row justify-between rounded-lg bg-white p-6">
      {/* Star Icon */}
      {user && (
        <svg
          onClick={() => handleFavorite()}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill={isFavorited ? "#412586EE" : "none"}
          className="absolute right-6 cursor-pointer"
        >
          <path
            d="M11.2826 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3716 2.75291 12.4869 2.98638 12.7174 3.45332L14.904 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2775 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.912 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1911 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.9059 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7553 20.57 17.607 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6276 17.9658L7.25491 20.2654C6.7939 20.5078 6.5634 20.6291 6.39296 20.5975C6.24467 20.57 6.11671 20.477 6.04472 20.3445C5.96199 20.1922 6.00601 19.9355 6.09406 19.4221L6.92887 14.5547C6.9549 14.403 6.96791 14.3271 6.9591 14.2545C6.95131 14.1902 6.9311 14.128 6.89959 14.0715C6.86401 14.0076 6.80886 13.9538 6.69857 13.8464L3.16054 10.4004C2.78765 10.0372 2.6012 9.85558 2.57851 9.68377C2.55877 9.5343 2.60754 9.38389 2.71124 9.27444C2.83042 9.14863 3.08796 9.11099 3.60303 9.03571L8.4943 8.32077C8.64641 8.29854 8.72247 8.28742 8.7887 8.25662C8.84735 8.22935 8.90015 8.19096 8.94417 8.14358C8.99389 8.09006 9.02791 8.02113 9.09596 7.88328L11.2826 3.45332Z"
            stroke="#222222"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <div className="flex flex-col gap-3 lg:gap-9">
        <div className="flex flex-row">
          <Image
            src={company.logo}
            width={50}
            height={50}
            alt={`${company.name}-logo`}
            className="m-2 self-start"
          />
          <div>
            <p className="text-primary text-2xl font-bold">{company.name}</p>
            <p className="text-base text-[#A7A7A7]">{company.ticker}</p>
          </div>
        </div>
        <div>
          <p className="text-base text-[#A7A7A7]">Sentiment</p>
          <div className="flex gap-3">
            <p className="text-2xl font-bold text-[#222]">
              {sentimentData?.sentiment ? sentimentData.sentiment : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end gap-8">
        <Link href={`/companies/${company.id}`}>
          <button className="font-lato rounded-lg bg-[#412586] p-2 px-8 py-3 text-white">
            More
          </button>
        </Link>
      </div>
    </div>
  );
}

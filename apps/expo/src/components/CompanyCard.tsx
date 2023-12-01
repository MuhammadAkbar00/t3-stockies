import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { trpc } from "../utils/trpc";

interface CompanyCardProps {
  company: inferProcedureOutput<AppRouter["company"]["all"]>[number];
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

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { data: articles } = trpc.article.byCompanyId.useQuery(company.id);

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
    <View
      className="m-2 flex h-[152px] w-[152px] rounded-xl bg-[#FFFFFF] p-4"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
    >
      <Image
        style={{
          flex: 1,
          width: 32,
          height: 32,
          resizeMode: "contain",
          alignSelf: "center",
        }}
        source={{ uri: company.logo }}
      />
      <Text className="text-primary line-clamp-1 text-xl font-bold ">
        {company.name}
      </Text>
      <View>
        <Text className="text-primary">{company.ticker}</Text>
        <Text className="text-primary absolute right-0 text-xl font-bold">
          {sentimentData?.sentiment ? sentimentData.sentiment : 0}
        </Text>
      </View>
    </View>
  );
};

export default CompanyCard;

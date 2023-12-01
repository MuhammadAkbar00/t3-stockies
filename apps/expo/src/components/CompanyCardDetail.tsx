import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { trpc } from "../utils/trpc";

interface CompanyCardDetailsProps {
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

const CompanyCardDetail: React.FC<CompanyCardDetailsProps> = ({ company }) => {
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
      className="flex h-[152px] w-full rounded-xl bg-[#F2F2F2] p-4"
      style={{
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 1,
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

export default CompanyCardDetail;

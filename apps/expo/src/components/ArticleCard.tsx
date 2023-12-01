import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { formatImageSource } from "../utils/formatImageSource";
import { AntDesign } from "@expo/vector-icons";

interface ArticleCardProps {
  article: inferProcedureOutput<AppRouter["article"]["all"]>[number];
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <View
      className="m-2 flex flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-[#FFFFFF] p-2 pt-0 pr-4"
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
          width: 72,
          height: 72,
          resizeMode: "cover",
          alignSelf: "center",
          borderRadius: 8,
        }}
        source={{
          uri:
            formatImageSource(article.image_url) ||
            "https://media.istockphoto.com/id/1202205418/photo/find-the-shortest-path-between-points-a-and-b.jpg?s=612x612&w=0&k=20&c=_0PSqcLbxAHx8eb_vFzDuKpKtlvZmxj1XbwZ61iwE0s=",
        }}
      />
      <Text className="line-clamp-4 w-2/3 font-normal text-gray-700">
        {article.title}
      </Text>
      <AntDesign name="arrowright" size={24} color="black" />
    </View>
  );
};

export default ArticleCard;

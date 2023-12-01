import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  Linking,
} from "react-native";

import {
  ArticleStackParamList,
  CompanyStackParamList,
} from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { trpc } from "../../utils/trpc";
import { formatImageSource } from "../../utils/formatImageSource";

type ArticleDetailsScreenNavigationProp = StackNavigationProp<
  ArticleStackParamList,
  "ArticleDetails"
>;

type ArticleDetailsScreenRouteProp = RouteProp<
  ArticleStackParamList,
  "ArticleDetails"
>;

type Props = {
  navigation: ArticleDetailsScreenNavigationProp;
  route: ArticleDetailsScreenRouteProp;
};

export const ArticleDetailsScreen = ({ route, navigation }: Props) => {
  const { articleId } = route.params;
  const { data: article, isLoading } = trpc.article.byId.useQuery(articleId);

  const goToURL = (url: string) =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });

  return article && article.title && article.content ? (
    <SafeAreaView className="flex-column flex h-full bg-white px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{
            resizeMode: "cover",
            alignSelf: "center",
            height: 200,
            width: Dimensions.get("screen").width,
          }}
          source={{
            uri:
              formatImageSource(article.image_url) ||
              "https://wallpapers.com/images/featured/new-york-aesthetic-pictures-hdj6cfehppy286jt.jpg",
          }}
        />
        <View className="gap-2 p-2">
          {article?.company?.name && article?.company?.ticker && (
            <View>
              <Text className="text-lg font-bold">
                {article.company.name} - {article.company.ticker}{" "}
              </Text>
              <Text>{article.sentiment}</Text>
            </View>
          )}
          <Text className="text-xl font-bold">{article.title}</Text>
          {article.description && (
            <Text className="text-primary">{article.description}</Text>
          )}
          {article.link && (
            <Text
              className="text-primary"
              onPress={() => goToURL(article.link)}
            >
              {article.link}
            </Text>
          )}
          <Text>{article.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : null;
};

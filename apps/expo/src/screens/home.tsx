import React, { useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { get } from "lodash";
import { trpc } from "../utils/trpc";
import CompanyCard from "../components/CompanyCard";
import ArticleCard from "../components/ArticleCard";
import { BottomTabParamList, CompanyStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeNavigationProp = StackNavigationProp<BottomTabParamList, "Home">;

// Props for screens in Home
type HomeProps = {
  navigation: HomeNavigationProp;
};

export const HomeScreen = ({ navigation }: HomeProps) => {
  const companyQuery = trpc.company.all.useQuery();
  const companies = get(companyQuery, "data", []);
  const articleQuery = trpc.article.latest50.useQuery();
  const articles = get(articleQuery, "data", []);

  return (
    <SafeAreaView className="flex h-full bg-white">
      <View className="px-4">
        <Text className="text-primary text-2xl font-bold tracking-tight">
          Stockies
        </Text>
        <View className="flex flex-row items-start justify-between pt-4">
          <Text className="text-primary mb-5 text-2xl font-bold tracking-tight">
            Companies
          </Text>
          <TouchableOpacity className="bg-primary flex rounded-3xl">
            <Text
              className="py-1 px-2 font-bold text-white"
              onPress={() =>
                navigation.navigate("Company", {
                  screen: "CompanyHome",
                })
              }
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {companies && (
        <View className="mb-5 flex flex-grow flex-row px-4">
          <FlatList
            horizontal={true}
            data={companies}
            showsHorizontalScrollIndicator={false}
            renderItem={(company) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Company", {
                    screen: "CompanyDetails",
                    params: { companyId: company.item.id },
                  })
                }
              >
                <CompanyCard company={company.item} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {/* Section Header */}
      <View className="border border-r-0 border-l-0 border-[#7a7a7a20]">
        <View className="flex flex-row items-center justify-between py-6 px-4">
          <Text className="text-primary text-xl font-bold">
            ARTICLES SECTION
          </Text>
          <TouchableOpacity
            className="bg-primary flex rounded-3xl"
            onPress={() =>
              navigation.navigate("Article", {
                screen: "ArticleHome",
              })
            }
          >
            <Text className="py-1 px-2 font-bold text-white">View All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex">
        <FlatList
          data={articles}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 350 }} />}
          ListHeaderComponent={<View style={{ height: 10 }} />}
          renderItem={(article) => (
            <View
              key={`article-view-main-card-${article.item.id}`}
              style={{
                flex: 1,
                flexDirection: "column",
                marginLeft: 12,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Article", {
                    screen: "ArticleDetails",
                    params: { articleId: article.item.id },
                  })
                }
              >
                <ArticleCard
                  key={`article-main-card-${article.item.id}`}
                  article={article.item}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

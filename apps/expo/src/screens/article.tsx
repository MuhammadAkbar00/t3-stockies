import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { get } from "lodash";

import { trpc } from "../utils/trpc";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ArticleCard from "../components/ArticleCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { ArticleStackParamList } from "../navigation/types";
import { RouteProp } from "@react-navigation/native";

type ArticleScreenNavigationProp = StackNavigationProp<
  ArticleStackParamList,
  "ArticleHome"
>;

type ArticleScreenRouteProp = RouteProp<ArticleStackParamList, "ArticleHome">;

type Props = {
  navigation: ArticleScreenNavigationProp;
  route: ArticleScreenRouteProp;
};

export const ArticleScreen = ({ navigation }: Props) => {
  const articleQuery = trpc.article.all.useQuery();
  const articles = get(articleQuery, "data", []);
  const [searchedArticles, setSearchedArticles] = useState(articles);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = React.createRef<TextInput>();

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    setTimeout(() => {
      setSearchedArticles(
        articles?.filter(
          (article) =>
            article.title.toLowerCase().includes(search) ||
            article.content.toLowerCase().includes(search),
        ),
      );
    }, 300);
  }, [searchTerm, articles]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [inputRef, isSearchOpen]);

  return (
    <SafeAreaView className="flex h-full bg-white">
      {!isSearchOpen ? (
        <View className="flex flex-row justify-between border-b p-4">
          <Text className="text-primary text-2xl font-bold tracking-tight">
            Articles
          </Text>
          <TouchableOpacity onPress={() => setIsSearchOpen((open) => !open)}>
            <Feather name="search" size={24} color="#412586" />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex flex-row gap-2 border-b p-4">
          <TouchableOpacity onPress={() => setIsSearchOpen(false)}>
            <AntDesign name="arrowleft" size={24} color="#412586" />
          </TouchableOpacity>
          <TextInput
            onChangeText={setSearchTerm}
            value={searchTerm}
            placeholder="Search"
            className="flex-1"
            ref={inputRef}
          />
          <TouchableOpacity
            onPress={() => setIsSearchOpen((open) => !open)}
            className="ml-auto"
          >
            <Feather name="search" size={24} color="#412586" />
          </TouchableOpacity>
        </View>
      )}
      <View className=" flex flex-grow flex-row px-4 pt-4">
        <FlatList
          data={searchedArticles}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 350 }} />}
          ListHeaderComponent={<View style={{ height: 10 }} />}
          renderItem={(article) => (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                marginLeft: 12,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ArticleDetails", {
                    articleId: article.item.id,
                  })
                }
              >
                <ArticleCard article={article.item} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

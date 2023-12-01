import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { get } from "lodash";

import { trpc } from "../../utils/trpc";
import {
  BottomTabParamList,
  CompanyStackParamList,
} from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";
import { format } from "date-fns";
import { LineChart } from "react-native-chart-kit";
import CompanyCardDetail from "../../components/CompanyCardDetail";
import ArticleCard from "../../components/ArticleCard";

type CompanyDetailsScreenRouteProp = RouteProp<
  CompanyStackParamList,
  "CompanyDetails"
>;

type Props = {
  navigation: CompanyNavigationProp;
  route: CompanyDetailsScreenRouteProp;
};

type CompanyNavigationProp = StackNavigationProp<BottomTabParamList, "Company">;

export const CompanyDetailsScreen = ({ route, navigation }: Props) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const { companyId } = route.params;
  const { data: company } = trpc.company.byId.useQuery(companyId);

  const articleQuery = companyId
    ? trpc.article.byCompanyId.useQuery(companyId)
    : null;
  const articles: inferProcedureOutput<AppRouter["article"]["all"]> = get(
    articleQuery,
    "data",
    [],
  );

  function groupArticlesByDate(
    articles: inferProcedureOutput<AppRouter["article"]["all"]>,
  ): {
    [date: string]: number;
  } {
    const groupedByDate: { [date: string]: number } = {};

    articles.sort((a, b) => {
      const dateA = a.publish_date ? new Date(a.publish_date) : null;
      const dateB = b.publish_date ? new Date(b.publish_date) : null;

      if (!dateA && !dateB) {
        return 0; // Both dates are considered equal
      }

      if (!dateA) {
        return -1; // dateA is considered smaller (comes first)
      }

      if (!dateB) {
        return 1; // dateB is considered smaller (comes first)
      }

      // Now, you can safely call getDate() on dateA and dateB
      return dateA.getDate() - dateB.getDate();
    });

    articles.forEach((article) => {
      const date = article.publish_date
        ? new Date(article.publish_date)
        : new Date(article.createdAt);
      const formatted = date ? format(date, "dd/MM/yyyy") : "";

      if (formatted) {
        // Check if the date already has a group, if not, create one
        let sum = groupedByDate[formatted];
        if (!sum) {
          sum = 0;
        }

        // Add the numeric property to the corresponding date group
        switch (article.sentiment) {
          case "Positive":
            sum += 1;
            break;
          case "Negative":
            sum -= 1;
            break;
          case "Neutral":
            break;
          default:
            break;
        }
        groupedByDate[formatted] = sum;
      }
    });

    return groupedByDate;
  }

  useEffect(() => {
    const groupedArticles = articles ? groupArticlesByDate(articles) : {};
    const labelsData = Object.entries(groupedArticles).map(([key]) => key);
    const dataValues = Object.entries(groupedArticles).map(
      ([, value]) => value,
    );
    setLabels(labelsData);
    setData(dataValues);
  }, [articles]);

  return (
    <SafeAreaView className="flex-column flex h-full bg-white px-4">
      {labels.length > 0 && data.length > 0 && company && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <CompanyCardDetail company={company} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data,
                  },
                ],
              }}
              width={1000} // from react-native
              height={260}
              yAxisInterval={1} // optional, defaults to 1
              verticalLabelRotation={20}
              chartConfig={{
                backgroundColor: "#66509e",
                backgroundGradientFrom: "#412586",
                backgroundGradientTo: "#66509e",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#412586FF",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>

          <View className="pt-2">
            {articles.map((article) => (
              <View
                key={`company-details-article-view-main-card-${article.id}`}
                style={{
                  flex: 1,
                  flexDirection: "column",
                  marginLeft: 12,
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  key={`company-details-article-main-card-${article.id}`}
                  onPress={() =>
                    navigation.navigate("Article", {
                      screen: "ArticleDetails",
                      params: {
                        articleId: article.id,
                      },
                    })
                  }
                >
                  <ArticleCard article={article} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

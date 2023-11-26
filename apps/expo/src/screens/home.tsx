import React from "react";

import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { get } from "lodash";

import { trpc } from "../utils/trpc";

const CompanyCard: React.FC<{
  company: inferProcedureOutput<AppRouter["company"]["all"]>[number];
}> = ({ company }) => {
  console.log(company, "company");
  return (
    <View className="h-[152px] w-[152px] rounded-xl border-2 border-gray-500 p-4">
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
      <View className="flex flex-row justify-between">
        <View className="">
          <Text className="text-primary line-clamp-1 text-xl font-bold ">
            {company.name}
          </Text>
          <Text className="text-primary">{company.ticker}</Text>
        </View>
        <View className="bg-purple flex">
          <Text className="text-primary">9</Text>
        </View>
      </View>
    </View>
  );
};

export const HomeScreen = () => {
  const companyQuery = trpc.company.all.useQuery();
  const companies = get(companyQuery, "data", []);

  console.log(companies, "data");
  const [showCompany, setShowCompany] = React.useState<number | null>(null);

  return (
    <SafeAreaView className="bg-white">
      <View className="h-full w-full p-4">
        <View>
          <Text>Stockies</Text>
        </View>
        <View className="py-2">
          {showCompany ? (
            <Text className="text-white">
              <Text className="font-semibold">Selected post:</Text>
              {showCompany}
            </Text>
          ) : (
            <Text className="font-semibold italic text-white">
              Press on a post
            </Text>
          )}
        </View>

        {companies && (
          <View className="flex flex-grow">
            <FlashList
              horizontal={true}
              data={companies}
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={20}
              ItemSeparatorComponent={() => <View className="w-[8px]" />}
              renderItem={(company) => (
                <TouchableOpacity
                  onPress={() => setShowCompany(company.item.id)}
                >
                  <CompanyCard company={company.item} />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        {/* Section Header */}
        <View>
          <Text>Section Header</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

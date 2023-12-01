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
import CompanyCard from "../components/CompanyCard";
import { CompanyStackParamList } from "../navigation/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type CompanyScreenNavigationProp = StackNavigationProp<
  CompanyStackParamList,
  "CompanyHome"
>;

type CompanyScreenRouteProp = RouteProp<CompanyStackParamList, "CompanyHome">;

type Props = {
  navigation: CompanyScreenNavigationProp;
  route: CompanyScreenRouteProp;
};

export const CompanyScreen = ({ navigation }: Props) => {
  const companyQuery = trpc.company.all.useQuery();
  const companies = get(companyQuery, "data", []);
  const [searchedCompanies, setSearchedCompanies] = useState(companies);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = React.createRef<TextInput>();

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    setSearchedCompanies(
      companies?.filter(
        (company) =>
          company.name.toLowerCase().includes(search) ||
          company.ticker.toLowerCase().includes(search),
      ),
    );
  }, [searchTerm, companies]);

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
            Companies
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
      <View className="mb-5 flex flex-grow flex-row px-4 pt-4">
        <FlatList
          data={searchedCompanies}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 100 }} />}
          renderItem={(company) => (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                margin: 1,
              }}
            >
              <View className="h-100 flex items-center justify-center">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CompanyDetails", {
                      companyId: company.item.id,
                    })
                  }
                >
                  <CompanyCard company={company.item} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

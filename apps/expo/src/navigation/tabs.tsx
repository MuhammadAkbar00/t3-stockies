import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// add createStackNavigator
import { HomeScreen } from "../screens/home";
import { SignInSignUpScreen } from "../screens/signin";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { CompanyScreen } from "../screens/company";
import {
  ArticleStackParamList,
  BottomTabParamList,
  CompanyStackParamList,
  HomeStackParamList,
} from "./types";
import { CompanyDetailsScreen } from "../screens/company/CompanyDetails";
import { ArticleScreen } from "../screens/article";
import { ArticleDetailsScreen } from "../screens/article/ArticleDetails";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const Tabs = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#412586",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <Feather name="home" size={24} color={color} />;
          },
        }}
        name="Home"
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{
          title: "Company",
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="building-o" size={24} color={color} />;
          },
        }}
        name="Company"
        component={CompanyNavigator}
      />
      <Tab.Screen
        options={{
          title: "Articles",
          tabBarIcon: ({ color }) => {
            return <Entypo name="news" size={24} color={color} />;
          },
        }}
        name="Article"
        component={ArticleNavigator}
      />
      {/* <Tab.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => {
            return <AntDesign name="user" size={24} color={color} />;
          },
        }}
        name="Profile"
        component={SignInSignUpScreen}
      /> */}
    </Tab.Navigator>
  );
};

const HomeStack = createStackNavigator<HomeStackParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="Menu"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="Menu" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const CompanyStack = createStackNavigator<CompanyStackParamList>();

function CompanyNavigator() {
  return (
    <CompanyStack.Navigator
      initialRouteName="CompanyHome"
      screenOptions={{ headerShown: false }}
    >
      <CompanyStack.Screen name="CompanyHome" component={CompanyScreen} />
      <CompanyStack.Screen
        name="CompanyDetails"
        component={CompanyDetailsScreen}
        initialParams={{ companyId: undefined }}
      />
    </CompanyStack.Navigator>
  );
}

const ArticleStack = createStackNavigator<ArticleStackParamList>();

function ArticleNavigator() {
  return (
    <ArticleStack.Navigator
      initialRouteName="ArticleHome"
      screenOptions={{ headerShown: false }}
    >
      <ArticleStack.Screen name="ArticleHome" component={ArticleScreen} />
      <ArticleStack.Screen
        name="ArticleDetails"
        component={ArticleDetailsScreen}
        initialParams={{ articleId: undefined }}
      />
    </ArticleStack.Navigator>
  );
}

export default Tabs;

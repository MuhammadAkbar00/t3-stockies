import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home";
import { SignInSignUpScreen } from "../screens/signin";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_xVyQmNWWJYOWyuZclW4-HpZQD1NHHIqoWx9SW0GBr26cIZ95kjVC0T1H5FMVnu_nR0&usqp=CAU",
                }}
              />
            );
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen name="Company" component={SignInSignUpScreen} />
      <Tab.Screen name="Article" component={SignInSignUpScreen} />
      <Tab.Screen name="Profile" component={SignInSignUpScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;

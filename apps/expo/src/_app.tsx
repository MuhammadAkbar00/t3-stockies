import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./screens/home";
import { SignInSignUpScreen } from "./screens/signin";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import Tabs from "./navigation/tabs";

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <NavigationContainer>
        <TRPCProvider>
          <SafeAreaProvider>
            <Tabs />
          </SafeAreaProvider>
        </TRPCProvider>
        {/* </SignedIn> */}
        {/* <SignedOut>
        <SignInSignUpScreen />
      </SignedOut> */}
      </NavigationContainer>
      {/* <SignedIn> */}
    </ClerkProvider>
  );
};

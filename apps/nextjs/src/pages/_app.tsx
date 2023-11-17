// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../context/authContext";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const router = useRouter();
  const showHeader =
    router.pathname.includes("/sign-up") || router.pathname.includes("/sign-in")
      ? false
      : true;

  return (
    <ClerkProvider {...pageProps}>
      <AuthContextProvider>
        {showHeader && <Header />}
        <Component {...pageProps} />
      </AuthContextProvider>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);

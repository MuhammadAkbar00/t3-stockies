import React, { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { get } from "lodash";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContext = {
  user: object;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await supabase.auth.getUser();
        const user = get(data, "user", null);
        console.log(user, "userererere");
      } catch (error) {
        console.log(error);
      }
    }

    getUser(); // Call the async function inside useEffect
  }, []);

  const [user, setUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContext {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}

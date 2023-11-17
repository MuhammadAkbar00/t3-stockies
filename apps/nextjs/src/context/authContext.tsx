import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Session,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

type UserDB = {
  createdAt: string;
  email: string;
  first_name?: string;
  id: string;
  last_name?: string;
  updatedAt: string;
};

export const AuthContext = createContext<{
  user: UserDB | null;
  supabaseUser: User | null;
  session: Session | null;
  handleLogout: () => void;
}>({
  user: null,
  supabaseUser: null,
  session: null,
  handleLogout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const supabase = createClientComponentClient();
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserDB | null>(null);

  function handleLogout() {
    return supabase.auth.signOut();
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
      setSupabaseUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && user?.id !== session.user.id) {
          console.log("RUNNING FETCHING USER");
          const { data: user } = await supabase
            .from("User")
            .select("*")
            .eq("id", session?.user?.id)
            .single();
          setUser(user);
        }

        if (event === "SIGNED_OUT") {
          setUser(null);
        }
        console.log(`Supabase auth event: ${event}`);
        setUserSession(session);
        setSupabaseUser(session?.user ?? null);
      },
    );

    return () => {
      authListener.subscription;
    };
  }, []);

  const value = {
    userSession,
    supabaseUser,
    user,
    handleLogout,
  };
  return <AuthContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a AuthContextProvider.");
  }
  return context;
};

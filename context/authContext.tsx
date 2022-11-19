import { User } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "../services/user/login";

type authContext = {
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => void;
};

const AuthContext = createContext<authContext>({} as authContext);

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const asyncFunc = async () => {
      const res = await loginRequest({
        email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL as string,
        password: process.env.NEXT_PUBLIC_TEST_USER_PASSWORD as string,
      });
      setUser(res.user);
    };

    asyncFunc();
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await loginRequest({
      email: email as string,
      password: password as string,
    });
    setUser(res.user);
  };

  const provider = {
    user,
    login,
  };

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

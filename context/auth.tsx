import { useTimeout } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, signupRequest } from "../services/user/login";

type authContext = {
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => void;
  initialFetchDone: boolean;
  isAuthenticated: () => boolean;
  signup: ({ email, password }: { email: string; password: string }) => void;
  isFetching: boolean;
};

const AuthContext = createContext<authContext>({} as authContext);

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const asyncFunc = async () => {
      //const res = await loginRequest({
      //  email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL as string,
      //  password: process.env.NEXT_PUBLIC_TEST_USER_PASSWORD as string,
      //});
      //if (res.user) {
      //  setUser(res.user);
      //}

      setInitialFetchDone(true);
    };

    asyncFunc();
  }, []);

  const isAuthenticated = () => {
    if (user?.ID) {
      return true;
    }
    return false;
  };

  const signup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsFetching(true);

    const res = await signupRequest({
      email: email as string,
      password: password as string,
    });

    if (res.user) {
      setUser(res.user);
      router.push("/");
      setTimeout(() => {
        setIsFetching(false);
      }, 500);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsFetching(true);
    const res = await loginRequest({
      email: email as string,
      password: password as string,
    });

    if (res.user) {
      setUser(res.user);
      router.push("/");
    } else {
      setIsFetching(false);
      return;
    }

    useTimeout(() => {
      setIsFetching(false);
    }, 500);
  };

  const provider = {
    user,
    login,
    initialFetchDone,
    isAuthenticated,
    signup,
    isFetching,
  };

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

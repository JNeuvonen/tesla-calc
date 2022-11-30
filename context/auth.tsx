import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, signupRequest } from "../services/user/login";
import { postRequest } from "../services/util";
import { UserType } from "../types/prisma";
import { customErrorToast, successToast } from "../utils/toasts";

type authContext = {
  user: UserType | null;
  login: ({ email, password }: { email: string; password: string }) => void;
  initialFetchDone: boolean;
  isAuthenticated: () => boolean;
  signup: ({
    email,
    password,
    role,
    address,
  }: {
    email: string;
    password: string;
    role: string;
    address: string;
  }) => void;
  isFetching: boolean;
  position: GeolocationPosition | null;
};

const AuthContext = createContext<authContext>({} as authContext);

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position);
    });
    const asyncFunc = async () => {
      const res = await postRequest({ endpoint: "user/authenticate-cookie" });

      if (res && res.message === "OK") {
        setInitialFetchDone(true);
        setIsFetching(false);
        setUser(res.user);
      } else {
        setInitialFetchDone(true);
        setIsFetching(false);
      }
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
    role,
    address,
  }: {
    email: string;
    password: string;
    role: string;
    address: string;
  }) => {
    setIsFetching(true);

    const res = await signupRequest({
      email: email,
      password: password,
      role: role,
      address: address,
    });

    const data = await res.json();

    if (data.user) {
      setUser(data.user);
      router.push("/");
    }

    if (res.status === 200) {
      toast(successToast as UseToastOptions);
    } else {
      toast(customErrorToast("Email already exists") as UseToastOptions);
    }
    setIsFetching(false);
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
      email: email,
      password: password,
    });

    const data = await res.json();

    if (res.status === 200) {
      setUser(data.user);
    } else {
      toast(customErrorToast("Invalid Credentials") as UseToastOptions);
    }

    if (data.user) {
      setUser(data.user);
      router.push("/");
    }

    setIsFetching(false);
  };

  const provider = {
    user,
    login,
    initialFetchDone,
    isAuthenticated,
    signup,
    isFetching,
    position,
  };

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/auth";
import LoadingSpinner from "../Util/LoadingSpinner";
type Props = {
  children: React.ReactNode;
};
const AuthGuard = ({ children }: Props) => {
  const user = useAuth();
  const initialFetchDone = useAuth().initialFetchDone;
  const router = useRouter();

  useEffect(() => {
    const URL = window.location.href;

    if (initialFetchDone) {
      if (!user.user) {
        if (!URL.includes("/login")) {
          router.push("/login");
        }
      }
    }
  }, [initialFetchDone]);

  if (!initialFetchDone) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};
export default AuthGuard;

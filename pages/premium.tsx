import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";

export default function Premium() {
  const router = useRouter();
  const auth = useAuth();
  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  return <Box></Box>;
}

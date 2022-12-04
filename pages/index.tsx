import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../context/auth";

export default function Home() {
  const isAuthenticated = useAuth().isAuthenticated();

  if (isAuthenticated) {
    return <AuthenticatedLandingPage />;
  }

  return <UnauthenticatedLandingPage />;
}

const AuthenticatedLandingPage = () => {
  return (
    <Box>
      <Box>Welcome</Box>

      <Box>Authenticated landing page TODO</Box>
    </Box>
  );
};

const UnauthenticatedLandingPage = () => {
  return (
    <Box padding={"24px"}>
      <Box>
        <Link href={"/login"}>
          <Button>Kirjaudu</Button>
        </Link>
      </Box>
      Landing page TODO
    </Box>
  );
};

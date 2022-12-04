import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import ClientLandingPage from "../components/LandingPage/Client";
import DriverLandingPage from "../components/LandingPage/Driver";
import { useAuth } from "../context/auth";

export type Roles = "driver" | "client";

export default function Home() {
  const isAuthenticated = useAuth().isAuthenticated();
  const userRole = useAuth().user?.type;

  if (isAuthenticated) {
    return <AuthenticatedLandingPage userRole={userRole as Roles} />;
  }

  return <UnauthenticatedLandingPage />;
}

type AuthenticatedProps = {
  userRole: Roles;
};
const AuthenticatedLandingPage = ({ userRole }: AuthenticatedProps) => {
  return (
    <Box>
      {userRole === "driver" ? <DriverLandingPage /> : <ClientLandingPage />}
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

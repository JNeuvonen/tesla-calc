import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
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
}

import { Box } from "@chakra-ui/react";
import PageTabs from "../components/PageTabs";

export default function Kuljetukset() {
  return (
    <Box>
      <PageTabs
        headers={["Luo ilmoitus", "Tehdyt ilmoitukset"]}
        disableAllLinks={true}
      />
    </Box>
  );
}

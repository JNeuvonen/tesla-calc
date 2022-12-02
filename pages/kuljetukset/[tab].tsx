import { Box } from "@chakra-ui/react";
import { useState } from "react";
import CreateListing from "../../components/Kuljetukset/CreateListing";
import PageTabs from "../../components/PageTabs";
import { getPathLastItem } from "../../utils/functions/general";

export default function Kuljetukset() {
  //UTIL
  const pathLastItem = getPathLastItem(window.location.href);
  //PAGE CONTENT
  const [pathToComponentDict] = useState({
    "luo-ilmoitus": <CreateListing />,
    "tehdyt-ilmoitukset": <CreateListing />,
  });

  return (
    <Box>
      <PageTabs headers={["Luo ilmoitus", "Tehdyt ilmoitukset"]} />

      {pathToComponentDict[pathLastItem as keyof typeof pathToComponentDict]}
    </Box>
  );
}

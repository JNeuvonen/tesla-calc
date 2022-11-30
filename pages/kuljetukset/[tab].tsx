import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import LuoIlmoitus from "../../components/Kuljetukset/luoIlmoitus";
import DefaultMap from "../../components/Maps/default-map";
import PageTabs from "../../components/PageTabs";
import { getPathLastItem } from "../../utils/functions/general";

export default function Kuljetukset() {
  //UTIL
  const pathLastItem = getPathLastItem(window.location.href);
  //PAGE CONTENT
  const [pathToComponentDict] = useState({
    "luo-ilmoitus": <LuoIlmoitus />,
    "tehdyt-ilmoitukset": <LuoIlmoitus />,
  });
  const [value, setValue] = useState("");

  return (
    <Box>
      <PageTabs headers={["Luo ilmoitus", "Tehdyt ilmoitukset"]} />

      {pathToComponentDict[pathLastItem as keyof typeof pathToComponentDict]}
    </Box>
  );
}

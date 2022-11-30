import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useAuth } from "../../context/auth";
import {
  destructureLngLtFromGeoloc,
  langlatToAddress,
} from "../../utils/functions/general";
import DefaultMap from "../Maps/default-map";
import PageContentHeading from "../StyleWrappers/PageContentHeading";

export default function LuoIlmoitus() {
  //STATE
  const [originAddress, setOriginAddress] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [userProfileAddress, setUserProfileAddress] = useState("");

  //UI STATE
  const [askUserIfAddressIsCorrect, setAskUserIfAddressIsCorrect] =
    useState(false);

  //CONTEXT
  const user = useAuth();

  useEffect(() => {
    const asyncHelper = async () => {
      const position = user.position;
      if (position) {
        const { lng, lat } = destructureLngLtFromGeoloc(position);
        const res = await langlatToAddress({ lng, lat });
        const address = res ? await res.json() : null;

        console.log(address);

        setUserProfileAddress(address);
      }
    };

    asyncHelper();
  }, []);

  return (
    <Box>
      <PageContentHeading>Tee uusi kuljetusilmoitus</PageContentHeading>

      <Box>Lähtösijainti</Box>

      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        apiOptions={{ language: "Finnish" }}
        selectProps={{
          onChange: setOriginAddress,
        }}
      />
    </Box>
  );
}

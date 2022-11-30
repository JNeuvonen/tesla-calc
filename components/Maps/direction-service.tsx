import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useState } from "react";

export default function DrawRouteComponent() {
  const [result, setResult] = useState(null);
  const dirServiceCallback = (response: any) => {
    if (response !== null) {
      if (response.status === "OK") {
        setResult(response);
      } else {
        console.log("response: ", response);
      }
    }
  };
  return (
    <>
      <DirectionsService
        options={{
          //@ts-ignore
          travelMode: "DRIVING",
          destination: "Piritanaukio 2",
          origin: "Koskelantie 30 C 26, Helsinki",
        }}
        callback={dirServiceCallback}
      />

      <DirectionsRenderer
        options={{
          directions: result,
        }}
      />
    </>
  );
}

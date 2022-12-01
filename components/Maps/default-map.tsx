import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useAuth } from "../../context/auth";
import { destructureLngLtFromGeoloc } from "../../utils/functions/general";
import { boxesUrl, destinationUrl } from "../../utils/map/constants";
import LoadingSpinner from "../Util/LoadingSpinner";
import DrawRouteComponent from "./direction-service";

export default function DefaultMap() {
  const user = useAuth();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  const handleOnDragEnd = async (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (lat && lng) {
      //const address = await langlatToAddress({ lat, lng });
      //const _json: GoogleLngLatToAddress = await address?.json();
    }
  };

  const getUserDefaultPositionMarker = () => {
    const { lng, lat } = destructureLngLtFromGeoloc(user.position);

    return (
      <MarkerF
        position={{ lat: lat, lng: lng }}
        visible={true}
        zIndex={5}
        draggable={true}
        onDragEnd={handleOnDragEnd}
        icon={{
          url: boxesUrl,
        }}
      />
    );
  };

  return (
    <GoogleMap
      options={{
        disableDefaultUI: true,
      }}
      zoom={13}
      center={{ lat: 60.192059, lng: 24.945831 }}
      mapContainerStyle={{ width: 600, height: 600 }}
    >
      <MarkerF
        position={{ lat: 60.192059, lng: 24.945831 }}
        visible={true}
        zIndex={5}
        draggable={true}
        onDragEnd={handleOnDragEnd}
        icon={{
          url: destinationUrl,
        }}
      />

      {getUserDefaultPositionMarker()}

      <DrawRouteComponent />
    </GoogleMap>
  );
}

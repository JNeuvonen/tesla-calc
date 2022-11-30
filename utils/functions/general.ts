import { getRequest } from "../../services/util";

export const getInputFieldValById = (id: string) => {
  const input = document.getElementById(id) as HTMLInputElement | null;
  if (!input) {
    return null;
  }

  return input.value;
};

export const stringIncludes = (a: string, b: string) => {
  if (a.toLowerCase().includes(b.toLowerCase())) {
    return true;
  }
  return b.toLowerCase().includes(a.toLowerCase());
};

export const generateNewHref = (
  oldPath: string,
  replacement: string,
  replaceIndex: number
) => {
  const splittedStr = oldPath.split("/");

  splittedStr[replaceIndex] = replacement;

  let ret = "";

  splittedStr.forEach((item) => {
    ret += item + "/";
  });

  return ret.toLowerCase().replace(" ", "-");
};

export const stringCapitalizeFirst = (str: string) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
};

export const getPathLastItem = (str: string) => {
  const splittedStr = str.split("/");
  return splittedStr[splittedStr.length - 1];
};

export const langlatToAddress = async ({
  lng,
  lat,
}: {
  lng: String | number;
  lat: String | number;
}) => {
  const res = await getRequest(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
    }`
  );

  return res;
};

export const destructureLngLtFromGeoloc = (pos: GeolocationPosition | null) => {
  if (!pos) {
    return {
      lng: 60.171865,
      lat: 24.942613,
    };
  }
  return {
    lng: pos.coords.longitude,
    lat: pos.coords.latitude,
  };
};

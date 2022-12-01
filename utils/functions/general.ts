import { WeightCategory } from "../../components/Kuljetukset/createListing";
import { getRequest } from "../../services/util";

export const getInputFieldValById = (id: string, useDefaultvalue = false) => {
  const input = document.getElementById(id) as HTMLInputElement | null;
  if (!input) {
    return null;
  }

  if (useDefaultvalue) {
    if (input.value) {
      return input.value;
    }

    if (input.defaultValue) {
      return input.defaultValue;
    }
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

export const removeSpecialCharachters = (a: string) => {
  return a.replace(/[^A-Z0-9]/gi, "");
};

export const stringIncludesDeepComparison = (a: string, b: string) => {
  const formattedA = removeSpecialCharachters(a).toLowerCase();
  const formattedB = removeSpecialCharachters(b).toLowerCase();

  return formattedA.includes(formattedB) || formattedB.includes(formattedA);
};

export const addressComparison = (a: string, b: string) => {
  try {
    const aStreet = a.split(" ")[0];
    const bStreet = b.split(" ")[0];

    return stringIncludesDeepComparison(aStreet, bStreet);
  } catch (err) {
    return false;
  }
};

export const weightCategoryFormatted = (weightCategory: WeightCategory) => {
  if (weightCategory === "LIGHT") {
    return "Alle 50 kg";
  }

  if (weightCategory === "MEDIUM") {
    return "50-100 kg";
  }

  if (weightCategory === "HEAVY") {
    return "100-300 kg";
  }
  if (weightCategory === "HEAVY-XL") {
    return "Enemmän kuin 300 kg";
  }

  return "";
};

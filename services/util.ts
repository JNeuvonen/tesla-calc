import axios from "axios";

export const getRequest = async (
  endpoint: string,
  urlSearchParams?: URLSearchParams | null
) => {
  try {
    console.log(endpoint);

    const res = await fetch(
      endpoint + urlSearchParams ? "?" + urlSearchParams : ""
    );

    return res;
  } catch (err) {
    return null;
  }
};

export const putRequest = async (
  endpoint: string,
  payload?: Record<string | number, unknown>
) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

  try {
    const res = await fetch(
      BASE_URL + endpoint,

      {
        method: "PUT",
        body: payload
          ? JSON.stringify({
              payload: payload,
            })
          : null,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const parsedRes = await res.json();
    return parsedRes;
  } catch (err) {
    return null;
  }
};

export const delRequest = (_endpoint: string) => {};

export const postRequest = async ({
  endpoint,
  payload,
}: {
  endpoint: string;
  payload?: Record<string | number, unknown>;
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

  try {
    const res = await fetch(
      BASE_URL + endpoint,

      {
        method: "POST",
        body: payload
          ? JSON.stringify({
              payload: payload,
            })
          : null,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const parsedRes = await res.json();
    return parsedRes;
  } catch (err) {
    return null;
  }
};

export const bulkUploadFiles = async (
  attachments: File[],
  selectedMainAttachment: number
) => {
  const fileLocations = [];
  let mainPicture = "";
  for (let i = 0; i < attachments.length; i++) {
    const formData = new FormData();
    formData.append("file", attachments[i], attachments[i].name);
    const res = await axios.post(
      (process.env.NEXT_PUBLIC_BACKEND_HOST as string) + "aws/upload-file",
      formData
    );
    const imagePath = res.data.message;
    fileLocations.push(imagePath);

    if (i === selectedMainAttachment) {
      mainPicture = imagePath;
    }
  }

  return { fileLocations, mainPicture };
};

export const requestHeaders = {
  "Content-Type": "application/json",
};

export const multipartFormHeaders = {
  "Content-type": "multipart/form-data",
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CreateListingSubmitForm } from "../../../components/Kuljetukset/CreateListing/types";
import { prisma } from "../../../lib/prisma";
import crypto from "crypto";
type Data = {
  message?: string;
  listingUUID?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const generateDataForImageRelation = (data: string[]) => {
    const ret = [] as { source: string }[];

    data.forEach((item) => {
      ret.push({
        source: item,
      });
    });

    return ret;
  };
  try {
    const payload: CreateListingSubmitForm = req.body.payload;

    const {
      originAddress,
      targetAddress,
      textDescription,
      estimatedWeight,
      isListingTimeSensitive,
      dateType,
      selectedDate,
      isCargoPrecious,
      distance,
      duration,
      fileLocations,
      mainImage,
    } = payload;

    let startDate = selectedDate;
    let endDate = selectedDate;

    if (Array.isArray(selectedDate)) {
      startDate = selectedDate[0];
      endDate = selectedDate[1];
    }

    const UUID = await crypto.randomUUID();
    const shortUUID = UUID.split("-")[0];

    await prisma.listing.create({
      data: {
        originAddress,
        targetAddress: targetAddress.label,
        textDescription,
        estimatedWeight,
        listingTimeSensitivity: isListingTimeSensitive,
        dateType,
        dateStart: startDate,
        dateEnd: endDate,
        driversRisk: isCargoPrecious,
        distance: distance,
        duration: duration,
        mainImage: mainImage,
        UUID: shortUUID,
        Image: {
          create: generateDataForImageRelation(fileLocations),
        },
      },
    });

    res.status(200).json({ message: "OK", listingUUID: shortUUID });
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "Bad request" });
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: Response | null;
  message?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "GET") {
      const { origin, target } = req.query;

      const googleRes = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${target}&key=AIzaSyDNwHvRWfngk1AVz1qDjKyRUjFDh6TjS-8`
      );

      const googleResParsed = await googleRes.json();

      if (googleResParsed) {
        res.status(200).json({ data: googleResParsed });
        return;
      }
    }
  } catch (err) {
    res.status(400).json({ message: "Error" });
  }

  res.status(400).json({ message: "Bad" });
}

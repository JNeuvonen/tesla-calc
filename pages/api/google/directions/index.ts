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
      console.log(origin, target);

      res.status(200).json({ data: null });
    }
  } catch (err) {
    res.status(400).json({ message: "Error" });
  }
}

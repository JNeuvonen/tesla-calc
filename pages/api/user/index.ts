// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {
  user?: User | null;
  message?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  _res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const user = await prisma.user.findMany({});
    return {
      user: user,
    };
  }
}

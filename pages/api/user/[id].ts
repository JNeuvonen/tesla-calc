// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UserType } from "../../../types/prisma";
import prisma from "../../../lib/prisma";

type Data = {
  user: UserType | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const ID = Number(req.query.id);
      const users = await prisma.user.findFirst({
        where: {
          ID,
        },
      });
      res.status(200).json({ user: users });
    } catch (err) {
      res.status(400);
    }
  }
  res.status(400);
}

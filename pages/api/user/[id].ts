// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UserType } from "../../../types/prisma";
import prisma from "../../../lib/prisma";
import { hasToken } from "../../../lib/auth";

type Data = {
  user?: UserType | null;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = hasToken(req);

  if (!token) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }

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

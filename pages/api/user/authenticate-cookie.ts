// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseJWTData } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

type Data = {
  user?: User | null;
  message?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const parsedJWTData: any = parseJWTData(req);
      if (parsedJWTData) {
        const { email } = parsedJWTData;
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
          include: {
            Address: true,
          },
        });

        if (user) {
          res.status(200).send({ user: user, message: "OK" });
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  res.status(400).send({ message: "Incorrect Credentials" });
}

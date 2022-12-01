// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";

type Data = {
  user?: User | null;
  message?: string | unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { UUID } = req.query;

  try {
    if (UUID) {
      const passwordRecoveryLink = await prisma.forgotPasswordLink.findFirst({
        where: {
          UUID: UUID as string,
        },
        include: {
          User: true,
        },
      });
      if (passwordRecoveryLink) {
        res.status(200).send({
          user: passwordRecoveryLink?.User,
        });
        return;
      }
    }
  } catch (err) {
    res.status(400).send({
      message: err,
    });
    return;
  }

  res.status(400).send({
    message: "Bad request",
  });
}

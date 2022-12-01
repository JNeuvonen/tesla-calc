// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
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
      const { email } = req.body.payload;

      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        include: {
          ForgotPasswordLink: true,
        },
      });

      if (user) {
        const passwordRecoveryLink = user.ForgotPasswordLink;

        const datePlus15Min = new Date(new Date().getTime() + 1000 * 60 * 5);

        if (passwordRecoveryLink) {
          if (datePlus15Min > passwordRecoveryLink.createdAt) {
            res.status(400).send({
              message:
                "5 minutes has not passed since asking for last password recovery link",
            });
            return;
          }
        }

        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            ForgotPasswordLink: {
              create: generatePasswordRecoveryLink(),
            },
          },
        });

        res.status(200).send({
          message: "OK",
        });
      } else {
        res.status(400).send({
          message: `Username with email ${email} was not found`,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err as string });
    }
  }
}

const generatePasswordRecoveryLink = () => {
  const UUID = crypto.randomUUID();
  return {
    UUID: UUID,
  };
};

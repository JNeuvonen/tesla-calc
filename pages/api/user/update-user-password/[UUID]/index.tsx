// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { UserType } from "../../../../../types/prisma";
import bcrypt from "bcrypt";

type Data = {
  user?: UserType | null;
  message?: string | unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { UUID } = req.query;

  const { newPassword } = req.body.payload;
  try {
    if (UUID) {
      const hashedPw = await bcrypt.hash(newPassword, 5);

      const user = await prisma.user.update({
        where: {
          UUID: UUID as string,
        },
        include: {
          ForgotPasswordLink: true,
        },
        data: {
          password: hashedPw,
        },
      });

      await prisma.forgotPasswordLink.delete({
        where: {
          ID: user.ForgotPasswordLink?.ID,
        },
      });

      res.status(200).send({
        message: "OK",
      });

      return;
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

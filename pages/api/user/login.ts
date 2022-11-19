// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cookies from "cookies";

type Data = {
  token?: string;
  message?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body.payload;
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        res.status(400);
        return;
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign(
          {
            email,
            ID: user.ID,
          },
          process.env.JWT_TOKEN as string,
          {
            expiresIn: "168h",
          }
        );
        const cookies = new Cookies(req, res);

        cookies.set("token", token, {
          httpOnly: true,
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
        });

        res.status(200).json({ message: "Success" });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }
  res.status(400).send({ message: "Bad Credentials" });
}

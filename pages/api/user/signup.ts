// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcrypt";
import Cookies from "cookies";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { CookieSerializeOptions } from "next/dist/server/web/spec-extension/cookies/types";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { authCookieSettings } from "../../../lib/authCookieSettings";
import prisma from "../../../lib/prisma";

type Data = {
  user?: any;
  message?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { email, password, role, address } = req.body.payload;

      const validEmail = isEmail(email);
      const validPassword =
        isStrongPassword(password, {
          returnScore: true,
        }) > 20;

      if (!validEmail) {
        res.status(400).send({ message: "Invalid email" });
        return;
      }

      if (!validPassword) {
        res.status(400).send({ message: "Not secure password" });
        return;
      }

      const UUID = crypto.randomUUID();

      const hashedPw = await bcrypt.hash(password, 5);

      const user = await prisma.user.create({
        data: {
          UUID: UUID,
          email: email,
          password: hashedPw,
          type: role,
          address: address,
        },
      });

      if (user) {
        if (user.ID) {
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

          cookies.set(
            "token",
            token,
            authCookieSettings as CookieSerializeOptions
          );

          res.status(200).json({ user: user });
          return;
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: err as string });
    }
  }
}

import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";

export const parseJWTData = (req: NextApiRequest) => {
  try {
    const token = req.cookies?.token;

    if (token) {
      const parsedJWTData = jwt.verify(token, process.env.JWT_TOKEN as string);

      return parsedJWTData;
    }

    return false;
  } catch (err) {
    return false;
  }
};

export const hasToken = (req: NextApiRequest) => {
  try {
    const token = req.cookies?.token;

    if (token) {
      const parsedJWTData: any = jwt.verify(
        token,
        process.env.JWT_TOKEN as string
      );

      if (parsedJWTData.email) {
        return parsedJWTData;
      }
    }

    return false;
  } catch (err) {
    return false;
  }
};

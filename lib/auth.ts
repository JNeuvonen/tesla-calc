import { NextApiRequest } from "next";

export const hasToken = (req: NextApiRequest) => {
  try {
    const token = req.cookies?.token;

    if (token) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

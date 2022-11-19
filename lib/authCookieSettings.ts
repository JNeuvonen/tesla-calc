export const authCookieSettings = {
  httpOnly: true,
  expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
  sameSite: "strict",
};

import React from "react";
type Props = {
  children: React.ReactNode;
};
const AuthGuard = ({ children }: Props) => {
  return <div>{children}</div>;
};
export default AuthGuard;

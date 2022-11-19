import React from "react";

type Props = {
  defaultRender: React.ReactNode;
  unauthorizedRender: React.ReactNode;
  isAuthenticated: boolean;
};

export default function ConditionalRendering({
  defaultRender,
  unauthorizedRender,
  isAuthenticated,
}: Props) {
  if (isAuthenticated) {
    return defaultRender;
  }

  return unauthorizedRender;
}

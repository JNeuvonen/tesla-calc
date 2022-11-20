import React, { createContext, useState } from "react";
import { initState } from "./utils";

export type sidemenuItem = {
  href: string;
  link: string;
  icon: (fill?: string) => JSX.Element;
};

type sidemenuContext = {
  menuitems: sidemenuItem[];
  updateMenuItems: (newMenuitems: sidemenuItem[]) => void;
};

const SidemenuContext = createContext<sidemenuContext>({} as sidemenuContext);

export const SidemenuProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [menuitems, setMenuitems] = useState(initState);

  const updateMenuItems = (newMenuitems: sidemenuItem[]) => {
    setMenuitems(newMenuitems);
  };

  const provider = {
    menuitems,
    updateMenuItems,
  };

  return (
    <SidemenuContext.Provider value={provider}>
      {children}
    </SidemenuContext.Provider>
  );
};

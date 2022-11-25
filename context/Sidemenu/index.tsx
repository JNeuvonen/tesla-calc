import React, { createContext, useState } from "react";
import { BrandLogo } from "../../utils/icons";
import { initState } from "./utils";

export type sidemenuItem = {
  href: string;
  link: string;
  icon: (fill?: string) => JSX.Element;
};

export type upperIcon = {
  sidemenuLogoIcon: (fill?: string) => JSX.Element;
  sidemenuLogoText?: string;
  sidemenuLogoHref: string;
};

type sidemenuContext = {
  menuitems: sidemenuItem[];
  updateMenuItems: (newMenuitems: sidemenuItem[]) => void;
  upperIcon: upperIcon;
  updateLogo: (newUpperIcon: upperIcon) => void;
};

export const SidemenuContext = createContext<sidemenuContext>(
  {} as sidemenuContext
);

export const SidemenuProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [menuitems, setMenuitems] = useState(initState);
  const [upperIcon, setUpperIcon] = useState({
    sidemenuLogoIcon: () => <BrandLogo />,
    sidemenuLogoHref: "/",
  });

  const updateMenuItems = (newMenuitems: sidemenuItem[]) => {
    setMenuitems(newMenuitems);
  };

  const updateLogo = (newUpperIcon: upperIcon) => {
    setUpperIcon(newUpperIcon);
  };

  const provider = {
    menuitems,
    updateMenuItems,
    upperIcon,
    updateLogo,
  };

  return (
    <SidemenuContext.Provider value={provider}>
      {children}
    </SidemenuContext.Provider>
  );
};

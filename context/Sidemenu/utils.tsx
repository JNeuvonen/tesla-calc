import { CalculatorIcon } from "../../utils/icons";
import { sidemenuItem } from ".";

const sideMenuIconSize = "24px";

export const initStateClient = [
  {
    icon: (fill?: string) => (
      <CalculatorIcon
        fill={fill}
        width={sideMenuIconSize}
        height={sideMenuIconSize}
      />
    ),
    href: "/kuljetukset",
    link: "Kuljetukset",
  },
  {
    icon: (fill?: string) => (
      <CalculatorIcon
        fill={fill}
        width={sideMenuIconSize}
        height={sideMenuIconSize}
      />
    ),
    href: "/frequently-asked-questions",
    link: "FAQ",
  },

  {
    icon: (fill?: string) => (
      <CalculatorIcon
        fill={fill}
        width={sideMenuIconSize}
        height={sideMenuIconSize}
      />
    ),
    href: "/tuki",
    link: "Tuki",
  },
] as sidemenuItem[];

export const initStateDriver = [
  {
    icon: (fill?: string) => (
      <CalculatorIcon
        fill={fill}
        width={sideMenuIconSize}
        height={sideMenuIconSize}
      />
    ),
    href: "/kartta",
    link: "Kartta",
  },
  {
    icon: (fill?: string) => (
      <CalculatorIcon
        fill={fill}
        width={sideMenuIconSize}
        height={sideMenuIconSize}
      />
    ),
    href: "/test",
    link: "Chat",
  },

  {
    icon: (fill?: string) => (
      <CalculatorIcon
        fill={fill}
        width={sideMenuIconSize}
        height={sideMenuIconSize}
      />
    ),
    href: "/build",
    link: "Tuki",
  },
] as sidemenuItem[];

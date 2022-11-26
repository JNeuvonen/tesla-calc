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
    link: "Etsi Kuljettaja",
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
    link: "test",
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
    link: "build",
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
    href: "/kuljetukset",
    link: "kuljetukset",
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
    link: "test",
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
    link: "build",
  },
] as sidemenuItem[];

import { CalculatorIcon } from "../../utils/icons";
import { sidemenuItem } from ".";

const sideMenuIconSize = "24px";

export const initState = [
  {
    icon: (fill?: string) => (
      <CalculatorIcon
        fill={fill}
        width={sideMenuIconSize}
        height={sideMenuIconSize}
      />
    ),
    href: "/calculate/quarterly",
    link: "calculate",
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

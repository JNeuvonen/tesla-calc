import { CalculatorIcon } from "../../utils/icons";
import { sidemenuItem } from "./sidemenu";

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
    href: "calculate",
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
    href: "calculate",
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
    href: "calculate",
    link: "calculate",
  },
] as sidemenuItem[];

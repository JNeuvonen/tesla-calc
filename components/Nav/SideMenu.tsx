import { Box, ChakraProps, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BLUE_100, RED_100 } from "../../chakra/colors";
import { SIDE_MENU_WIDTH } from "../../chakra/constants";
import { SidemenuContext, sidemenuItem } from "../../context/Sidemenu/sidemenu";
import useWindowDimensions from "../../utils/hooks/windowDimensions";
const SideMenu = () => {
  const { width } = useWindowDimensions();
  const useSidemenu = useContext(SidemenuContext);
  const sidemenuItems = useSidemenu.menuitems;
  const sidemenuButton = useSidemenu.upperIcon;

  return (
    <SidemenuWrapper>
      <LogoSection
        icon={sidemenuButton.sidemenuLogoIcon}
        href={sidemenuButton.sidemenuLogoHref}
      ></LogoSection>
      <MenuItems menuItems={sidemenuItems} />
    </SidemenuWrapper>
  );
};
export default SideMenu;

//STYLE WRAPPERS

const SidemenuWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      height={"100vh"}
      position={"fixed"}
      width={SIDE_MENU_WIDTH}
      padding={"28px"}
      bg={BLUE_100}
      zIndex={3}
    >
      {children}
    </Box>
  );
};

const MenuItems = ({ menuItems }: { menuItems: sidemenuItem[] }) => {
  return (
    <Flex flexDir={"column"} rowGap={"24px"} marginTop={"34px"}>
      {menuItems.map((item, i) => {
        return <MenuItem menuItem={item} key={i} />;
      })}
    </Flex>
  );
};

const MenuItem = ({ menuItem }: { menuItem: sidemenuItem }) => {
  const [hover, setHover] = useState(false);
  const isMenuitemHighlighted = () => {
    if (typeof window !== "undefined") {
      const path = window.location.href;
      return path.includes(menuItem.href);
    }
    return false;
  };
  return (
    <Link href={menuItem.href}>
      <Flex
        opacity={isMenuitemHighlighted() ? "1" : "0.8"}
        {...textStyles}
        columnGap={"16px"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        color={hover ? RED_100 : "white"}
      >
        <Box>{menuItem.icon(hover ? RED_100 : "white")}</Box>
        <Box>{menuItem.link}</Box>
      </Flex>
    </Link>
  );
};

const LogoSection = ({
  icon,
  text,
  href,
}: {
  icon: (fill?: string) => JSX.Element;
  text?: string;
  href: string;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Link href={href}>
      <Flex
        opacity={hover ? "1" : "0.8"}
        columnGap={"24px"}
        alignItems={"center"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box>{icon(RED_100)}</Box>
        <Box>{text}</Box>
      </Flex>
    </Link>
  );
};

const textStyles: ChakraProps = {
  fontWeight: "400",
  textTransform: "capitalize",
};

const highlightedStyles = {
  textTransform: "capitalize",
};

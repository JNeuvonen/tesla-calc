import { Box, Button, ChakraProps, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { BLUE_100, RED_100 } from "../../../chakra/colors";
import { SIDE_MENU_BP, SIDE_MENU_WIDTH } from "../../../chakra/constants";
import { SidemenuContext, sidemenuItem } from "../../../context/Sidemenu";
import useWindowDimensions from "../../../utils/hooks/windowDimensions";
import { closeSideMenu, openSideMenu } from "./funcs";
const SideMenu = () => {
  const { width } = useWindowDimensions();
  const useSidemenu = useContext(SidemenuContext);
  const sidemenuItems = useSidemenu.menuitems;
  const sidemenuButton = useSidemenu.upperIcon;
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const menuOnClick = () => {
    openSideMenu(true);
    setShowMenu(true);
  };

  useEffect(() => {
    setMounted(true);
  });

  useEffect(() => {
    if (width < SIDE_MENU_BP) {
      setShowMenu(false);
      closeSideMenu(false);
    } else {
      setShowMenu(true);
      openSideMenu(false);
    }
  }, [width]);

  useEffect(() => {
    const blur = document.getElementById("blur") as HTMLElement;

    blur.addEventListener("click", () => {
      if (showMenu) {
        setShowMenu(false);
        closeSideMenu(true);
      }
    });
    setMounted(true);
  }, [showMenu]);

  const linkOnClickFunc = () => {
    if (width < SIDE_MENU_BP) {
      closeSideMenu(true);
    }
  };

  return (
    <>
      {width < SIDE_MENU_BP && mounted && (
        <MenuButton menuOnClick={menuOnClick} />
      )}
      <SidemenuWrapper>
        <LogoSection
          icon={sidemenuButton.sidemenuLogoIcon}
          href={sidemenuButton.sidemenuLogoHref}
        ></LogoSection>
        {mounted && (
          <MenuItems
            menuItems={sidemenuItems}
            linkOnClickFunc={linkOnClickFunc}
          />
        )}
      </SidemenuWrapper>
      <BlurDiv />
    </>
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
      top={0}
      id={"nav"}
      overflow={"hidden"}
    >
      {children}
    </Box>
  );
};

const MenuItems = ({
  menuItems,
  linkOnClickFunc,
}: {
  menuItems: sidemenuItem[];
  linkOnClickFunc: () => void;
}) => {
  return (
    <Flex flexDir={"column"} rowGap={"24px"} marginTop={"34px"}>
      {menuItems.map((item, i) => {
        return (
          <MenuItem menuItem={item} key={i} linkOnClickFunc={linkOnClickFunc} />
        );
      })}
    </Flex>
  );
};

const MenuItem = ({
  menuItem,
  linkOnClickFunc,
}: {
  menuItem: sidemenuItem;
  linkOnClickFunc: () => void;
}) => {
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
        alignItems={"center"}
        marginLeft={"-8px"}
        onClick={linkOnClickFunc}
      >
        <Box
          backgroundColor={
            isMenuitemHighlighted() || hover
              ? "rgba(255, 255, 255, 0.2)"
              : "inherit"
          }
          fontWeight={isMenuitemHighlighted() ? "bold" : "400"}
          padding={"8px"}
          borderRadius={"10px"}
        >
          {menuItem.icon(hover ? RED_100 : "white")}
        </Box>
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

const BlurDiv = () => {
  return (
    <Box
      id={"blur"}
      position={"fixed"}
      left={"0"}
      right={"0"}
      bottom={"0"}
      top={"0"}
      zIndex={"2"}
      display={"none"}
      backgroundColor={"rgba(0, 0, 0, 0.5)"}
    />
  );
};

const MenuButton = ({ menuOnClick }: { menuOnClick: () => void }) => {
  return (
    <Button
      display={"flex"}
      alignItems={"center"}
      columnGap={"10px"}
      backgroundColor={BLUE_100}
      width={"max-content"}
      borderRadius={"50px"}
      position={"fixed"}
      marginLeft={"30px"}
      marginTop={"10px"}
      height={"30px"}
      zIndex={3}
      onClick={menuOnClick}
      left={0}
      top={0}
      variant={"secondary"}
    >
      <Box color={"white"}>Menu</Box>
    </Button>
  );
};

const textStyles: ChakraProps = {
  fontWeight: "400",
  textTransform: "capitalize",
};

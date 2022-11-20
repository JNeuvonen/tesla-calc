import { SIDE_MENU_WIDTH } from "../../../chakra/constants";

export const closeSideMenu = (byClick: boolean) => {
  const sidemenu: HTMLElement = document.getElementById("nav") as HTMLElement;
  const contentSection = document.getElementById(
    "content-section"
  ) as HTMLElement;
  const headerSection: HTMLElement = document.getElementById(
    "header"
  ) as HTMLElement;

  if (byClick) {
    sidemenu.style.transition = "1s";
  } else {
    sidemenu.style.transition = "0s";

    if (contentSection) {
      contentSection.style.marginLeft = "0px";
    }

    if (headerSection) {
      headerSection.style.marginLeft = "0px";
    }
  }
  sidemenu.style.width = "0px";
  sidemenu.style.padding = "0px";
  removeBlur();
};

export const openSideMenu = (byClick: boolean) => {
  const sidemenu = document.getElementById("nav") as HTMLElement;
  const contentSection = document.getElementById(
    "content-section"
  ) as HTMLElement;

  const headerSection: HTMLElement = document.getElementById(
    "header"
  ) as HTMLElement;

  if (byClick) {
    sidemenu.style.transition = "1s";
  } else {
    sidemenu.style.transition = "0s";

    if (contentSection) {
      contentSection.style.marginLeft = SIDE_MENU_WIDTH;
    }
  }
  sidemenu.style.width = SIDE_MENU_WIDTH;
  sidemenu.style.padding = "24px";

  if (byClick) {
    blurScreen();
  }
};

const blurScreen = () => {
  const blur = document.getElementById("blur") as HTMLElement;
  blur.style.display = "flex";
};

const removeBlur = () => {
  const blur = document.getElementById("blur") as HTMLElement;
  blur.style.display = "none";
};

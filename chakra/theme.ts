import { extendTheme } from "@chakra-ui/react";
import {
  primaryInverseButton,
  secondaryButton,
  secondaryInverseButton,
  solidButton,
} from "./buttons";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: () => solidButton(),
        secondary: () => secondaryButton(),
        primaryInverse: () => primaryInverseButton(),
        secondaryInverse: () => secondaryInverseButton(),
      },
    },
  },
});

export default theme;

import { extendTheme } from "@chakra-ui/react";
import { secondaryButton, solidButton } from "./buttons";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: () => solidButton(),
        secondary: () => secondaryButton(),
      },
    },
  },
});

export default theme;

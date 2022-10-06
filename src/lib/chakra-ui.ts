// theme.ts
import { extendTheme } from "@chakra-ui/react";

export * from "@chakra-ui/react";
export * from "@chakra-ui/icons";

export const theme = extendTheme({
  components: {
    Drawer: {
      variants: {
        permanent: {
          dialog: {
            pointerEvents: "auto",
          },
          dialogContainer: {
            pointerEvents: "none",
          },
        },
      },
    },
  },
});

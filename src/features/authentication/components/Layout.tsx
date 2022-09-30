// import { ColorModeToggle } from "@/components/ColorModeButton/ColorModeButton";
// import { useColorModeValue } from "@/lib/chakra-ui";
// import { Stack, Flex, Image } from "@chakra-ui/react";

// export function Layout({ children }: LayoutProps) {
//   return (
//     <Flex
//       minH="100vh"
//       direction={{ base: "column", md: "row" }}
//       as="main"
//       justify="center"
//       bg={useColorModeValue("gray.50", "gray.800")}
//     >
//       <ColorModeToggle />
//       <Flex p={8} flex={1} align="center" justify="center">
//         {children}
//       </Flex>
//       <Flex flex={1}>
//         <Image
//           alt="Login Image"
//           objectFit="cover"
//           src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
//         />
//       </Flex>
//     </Flex>
//   );
// }

import Box from "@mui/material/Box";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Box
      display="flex"
      component="main"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        display="flex"
        p={8}
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>
      <Box display="flex" flex={1}>
        <img src="url(https://source.unsplash.com/random)" alt="callout" />
      </Box>
    </Box>
  );
}

import { ProfileContext } from "@/context/profileContextProvider";
import { useQueriesMutation } from "@/hooks/useQueriesMutation";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import {
  IoChevronDownOutline,
  IoLogOutOutline
} from "react-icons/io5";

export default function Layout({ children, isUserLogin }) {
  const isMobile = window.screen.width <= 425;
  const width = isMobile ? "100vw" : "480px";
  const router = useRouter();
  const profileUser = useContext(ProfileContext);
  const { useMutate } = useQueriesMutation();

  const HandleLogout = async () => {
    const response = await useMutate({ prefixUrl: "/logout" });
    if (response?.success) {
      Cookies.remove("sb_token");
      router.reload();
    }
  };

  return (
    <Container width="full" centerContent>
      <Flex direction="column" bg="whiteAlpha.900" width={width} height="100vh">
        <Box height="5vh">
          <Flex
            height="full"
            alignItems="center"
            justifyContent="space-between"
            padding="2"
            borderBottom="1px"
            borderBottomColor="gray.200"
          >
            <Heading as={Link} size="md" href="/">
              Sanber Daily
            </Heading>
            {isUserLogin && (
              <Menu placement="bottom-end">
                <MenuButton
                  as={Button}
                  size="sm"
                  leftIcon={<Avatar name={profileUser?.name || ""} size="xs" />}
                  rightIcon={<Icon as={IoChevronDownOutline} boxSize="5" />}
                />
                <MenuList zIndex="2">
                  <MenuItem
                    onClick={HandleLogout}
                    icon={<Icon as={IoLogOutOutline} boxSize="5" />}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Box>
        <Box height="95vh" overflow="scroll" padding="2" position="relative">
          {children}
        </Box>
      </Flex>
    </Container>
  );
}

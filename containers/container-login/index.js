import { useQueriesMutation } from "@/hooks/useQueriesMutation";
import {
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link as LinkCU,
    Stack,
    Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ContainerLogin() {
  const router = useRouter();
  const { useMutate, isLoadingSubmit } = useQueriesMutation();
  const [show, setShow] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleClick = () => setShow(!show);

  const HandleSubmit = async () => {
    const response = await useMutate({ prefixUrl: "/login", payload });
    if (response?.success) {
      Cookies.set("sb_token", response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: "/",
      });
      router.reload();
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Stack direction="column">
        <Heading as="h4" size="md" textAlign="center" mb="3">
          LOGIN
        </Heading>
        <FormControl isRequired>
          <Input
            placeholder="Email ..."
            value={payload.email}
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Password ..."
              value={payload.password}
              onChange={(e) =>
                setPayload({ ...payload, password: e.target.value })
              }
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <Button
            width="full"
            colorScheme="messenger"
            isLoading={isLoadingSubmit}
            onClick={HandleSubmit}
          >
            Login
          </Button>
        </FormControl>
        <FormControl>
          <Text>
            Do you have account ?{" "}
            <LinkCU as={Link} fontWeight="medium" href="/register">
              Register Now
            </LinkCU>
          </Text>
        </FormControl>
      </Stack>
    </Flex>
  );
}

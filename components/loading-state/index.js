import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingState() {
  return (
    <Flex justify="center">
      <Spinner
        thickness="6px"
        speed="0.5s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}

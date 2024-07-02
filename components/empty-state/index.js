import { Flex, Text, Icon } from "@chakra-ui/react";
import { IoFileTrayOutline } from "react-icons/io5";

export default function EmptyState({ message, icon }) {
  return (
    <Flex flexDirection="column" align="center">
      <Text fontWeight="medium">{message}</Text>
      <Icon as={icon} boxSize="6" />
    </Flex>
  );
}

EmptyState.defaultProps = {
  message: "No Posts",
  icon: IoFileTrayOutline,
};

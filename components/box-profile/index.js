import {
  Avatar,
  Card,
  Flex,
  Box,
  Stat,
  StatLabel,
  StatHelpText,
  Text,
} from "@chakra-ui/react";

export default function BoxProfile({ ...props }) {
  return (
    <Card padding="4">
      <Flex justify="center" align="center" flexFlow="column" mb="2">
        <Avatar name={props?.name || "X"} />
        <Text>{props?.name || "-"}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Box>
          <Stat>
            <StatLabel>Email</StatLabel>
            <StatHelpText>{props?.email || "-"}</StatHelpText>
          </Stat>
        </Box>
        <Box>
          <Stat>
            <StatLabel>Hobby</StatLabel>
            <StatHelpText>{props?.hobby || "-"}</StatHelpText>
          </Stat>
        </Box>
        <Box>
          <Stat>
            <StatLabel>Date of birth</StatLabel>
            <StatHelpText>{props?.dob || "-"}</StatHelpText>
          </Stat>
        </Box>
        <Box>
          <Stat>
            <StatLabel>Phone</StatLabel>
            <StatHelpText>{props?.phone || "-"}</StatHelpText>
          </Stat>
        </Box>
      </Flex>
    </Card>
  );
}

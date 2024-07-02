import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default function CardReply({ ...props }) {
  return (
    <Card marginBottom="3">
      <CardHeader padding="3">
        <Flex
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDirection="column"
        >
          <Tag
            size="lg"
            borderRadius="full"
            as={Link}
            href={`profile/${!props?.is_own_reply ? props?.user?.id : ""}`}
          >
            <Avatar size="xs" name={props?.user?.name || "X"} ml={-1} mr={2} />
            <TagLabel>
              {props?.user?.name || ""}
              {props?.is_own_reply && " (You)"}
            </TagLabel>
          </Tag>
          <Text fontSize="xs">
            {new Date(props?.created_at).toDateString() || ""}
          </Text>
          <Text>{props?.description || ""}</Text>
        </Flex>
      </CardHeader>
    </Card>
  );
}

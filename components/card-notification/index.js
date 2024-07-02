import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Text,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import Link from "next/link";
import { formatDistance } from "date-fns";

export default function CardNotification({ ...props }) {
  return (
    <Card marginBottom="3">
      <CardHeader padding="3">
        <Flex spacing="4">
          <Flex flex="1" gap="1" alignItems="center" flexWrap="wrap">
            <Tag
              size="lg"
              borderRadius="full"
              as={Link}
              href={`profile/${props?.user?.id || ""}`}
            >
              <Avatar
                size="xs"
                name={props?.user?.name || "X"}
                ml={-1}
                mr={2}
              />
              <TagLabel>{props?.user?.name || ""}</TagLabel>
            </Tag>
            <Text>
              {props?.remark || ""} your post,{" "}
              <span style={{ fontStyle: "italic", fontSize: "11pt" }}>
                {`"${formatDistance(new Date(props?.created_at), new Date(), {
                  addSuffix: true,
                })}"`}
              </span>
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
}

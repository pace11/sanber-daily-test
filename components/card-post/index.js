import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  CardBody,
  Icon,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  IoEllipsisVertical,
} from "react-icons/io5";
import Link from "next/link";

export default function CardPost({ ...props }) {
  return (
    <Card marginBottom="3">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={props?.user?.name || "X"} />
            <Box>
              <Heading
                size="sm"
                as={Link}
                href={`/profile/${!props?.is_own_post ? props?.user?.id : ""}`}
              >
                {props?.user?.name || ""}
                {props?.is_own_post ? ` (You)` : ""}
              </Heading>
              <Text>{props?.user?.email || ""}</Text>
              <Text fontSize="xs">
                {new Date(props?.created_at).toDateString() || ""}{" "}
                {props.created_at !== props.updated_at && <Badge>Edited</Badge>}
              </Text>
            </Box>
          </Flex>
          {props?.is_own_post && (
            <Menu placement="bottom-end">
              <MenuButton
                as={IconButton}
                size="sm"
                icon={<Icon as={IoEllipsisVertical} boxSize="4" />}
                variant="ghost"
              />
              <MenuList zIndex="2" minWidth="0">
                <MenuItem onClick={() => props.onClickEdit()}>Edit</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </CardHeader>
      <CardBody paddingTop="0" paddingBottom="0">
        <Text>{props?.description ?? ""}</Text>
      </CardBody>
    </Card>
  );
}

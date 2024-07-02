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
  CardFooter,
  Button,
  Icon,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  IoEllipsisVertical,
  IoHeartOutline,
  IoHeart,
  IoChatbubbleOutline,
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
                <MenuItem onClick={() => props.onClickDelete()} color="red">
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </CardHeader>
      <CardBody paddingTop="0" paddingBottom="0">
        <Text>{props?.description ?? ""}</Text>
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap" overflow="hidden">
        <Button
          size="sm"
          flex="1"
          variant="ghost"
          onClick={() => props.onClickLikes(props?.is_like_post)}
          leftIcon={
            <Icon
              as={props?.is_like_post ? IoHeart : IoHeartOutline}
              boxSize="5"
              color={props?.is_like_post && "red"}
            />
          }
        >
          {props?.likes_count || 0} {props?.likes_count > 1 ? "Likes" : "Like"}
        </Button>
        <Button
          size="sm"
          flex="1"
          variant="ghost"
          leftIcon={<Icon as={IoChatbubbleOutline} boxSize="5" />}
          onClick={() => props.onClickReplies()}
        >
          {props?.replies_count || 0} Replies
        </Button>
      </CardFooter>
    </Card>
  );
}

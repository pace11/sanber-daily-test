import ModalDeletePost from "@/common/modal-delete-post";
import ModalEditPost from "@/common/modal-edit-post";
import ModalReplies from "@/common/modal-replies";
import SectionPost from "@/common/section-posts";
import BoxCreatePost from "@/components/box-create-post";
import { useQueriesMutation } from "@/hooks/useQueriesMutation";
import { Box, Container, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export default function ContainerHome() {
  const {
    isOpen: isOpenModalEditPost,
    onOpen: onOpenModalEditPost,
    onClose: onCloseModalEditPost,
  } = useDisclosure();

  const {
    data: allPosts,
    isLoading,
    useMutate,
    fetchingData,
    isLoadingSubmit,
  } = useQueriesMutation({
    prefixUrl: "/posts?type=all",
    isShowPopupSuccess: true,
  });

  const [postId, setPostId] = useState();
  const [payload, setPayload] = useState({
    description: "",
  });
  const [replies, setReplies] = useState({
    description: "",
  });
  const [editPost, setEditPost] = useState({
    description: "",
  });

  const clearValue = () => {
    setPayload({ ...payload, description: "" });
    setReplies({ ...replies, description: "" });
  };

  const HandleSubmitPost = async () => {
    const response = await useMutate({ prefixUrl: "/post", payload });
    if (response?.success) {
      clearValue();
      fetchingData({ prefixUrl: "/posts?type=all" });
    }
  };

  const HandleEditPost = async ({ posts_id, description }) => {
    onOpenModalEditPost();
    setPostId(posts_id);
    setEditPost({ ...editPost, description: description });
  };

  const HandleSubmitEditPost = async () => {
    const response = await useMutate({
      prefixUrl: `/post/update/${postId}`,
      method: "PATCH",
      payload: editPost,
    });
    if (response?.success) {
      onCloseModalEditPost();
      fetchingData({ prefixUrl: "/posts?type=all" });
    }
  };

  return (
    <Container padding="0">
      <Box position="sticky" top="0" zIndex="1" mb="3">
        <BoxCreatePost
          onChangeValue={(value) =>
            setPayload({ ...payload, description: value })
          }
          value={payload.description}
          onClickPost={HandleSubmitPost}
          isLoading={isLoadingSubmit}
        />
      </Box>
      <SectionPost
        data={allPosts?.data}
        loading={isLoading}
        onClickReplies={({ posts_id }) => {
          onOpenModalReplies();
          setPostId(posts_id);
          fetchingReplies({
            prefixUrl: posts_id ? `/replies/post/${posts_id}` : "",
          });
        }}
        onClickEdit={HandleEditPost}
      />
      <ModalEditPost
        isOpen={isOpenModalEditPost}
        onClose={() => {
          onCloseModalEditPost();
          fetchingData({ prefixUrl: "/posts?type=all" });
        }}
        value={editPost?.description}
        onChangeValue={(value) =>
          setEditPost({ ...editPost, description: value })
        }
        onSubmitEditPost={HandleSubmitEditPost}
        isLoadingSubmit={isLoadingSubmit}
      />
    </Container>
  );
}

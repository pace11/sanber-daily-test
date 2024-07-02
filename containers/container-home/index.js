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
    isOpen: isOpenModalReplies,
    onOpen: onOpenModalReplies,
    onClose: onCloseModalReplies,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEditPost,
    onOpen: onOpenModalEditPost,
    onClose: onCloseModalEditPost,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDeletePost,
    onOpen: onOpenModalDeletePost,
    onClose: onCloseModalDeletePost,
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
  
  const {
    data: repliesById,
    isLoading: isLoadingReplies,
    fetchingData: fetchingReplies,
    isLoadingSubmit: isLoadingSubmitReplies,
    useMutate: useMutateReply,
  } = useQueriesMutation();

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

  const HandleSubmitReply = async () => {
    const response = await useMutateReply({
      prefixUrl: `/replies/post/${postId}`,
      payload: replies,
    });
    if (response?.success) {
      clearValue();
      fetchingReplies({
        prefixUrl: `/replies/post/${postId}`,
      });
      Router.reload()
    }
  };

  const HandleLikesPost = async ({ posts_id, type }) => {
    const response = await useMutate({ prefixUrl: `${type}/post/${posts_id}` });
    if (response?.success) {
      fetchingData({ prefixUrl: "/posts?type=all" });
    }
  };

  const HandleEditPost = async ({ posts_id, description }) => {
    onOpenModalEditPost();
    setPostId(posts_id);
    // const response = await useMutate({
    //   prefixUrl: `/post/${posts_id}`,
    //   method: "GET",
    // });
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

  const HandleConfirmDelete = async () => {
    const response = await useMutate({
      prefixUrl: `/post/delete/${postId}`,
      method: "DELETE",
    });
    if (response?.success) {
      onCloseModalDeletePost();
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
        onClickLikes={HandleLikesPost}
        onClickEdit={HandleEditPost}
        onClickDelete={({ posts_id }) => {
          setPostId(posts_id);
          onOpenModalDeletePost();
        }}
      />
      <ModalReplies
        isOpen={isOpenModalReplies}
        onClose={() => {
          onCloseModalReplies();
          fetchingData({ prefixUrl: "/posts?type=all" });
        }}
        value={replies.description}
        onChangeValue={(value) =>
          setReplies({ ...replies, description: value })
        }
        onSubmitReply={HandleSubmitReply}
        replies={repliesById?.data}
        isLoadingSubmit={isLoadingSubmitReplies}
        loading={isLoadingReplies}
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
      <ModalDeletePost
        isOpen={isOpenModalDeletePost}
        onClose={onCloseModalDeletePost}
        onConfirmDelete={HandleConfirmDelete}
      />
    </Container>
  );
}

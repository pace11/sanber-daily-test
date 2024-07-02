import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import BoxCreatePost from "@/components/box-create-post";
import SectionReplies from "../section-replies";

export default function ModalReplies({
  onClose,
  isOpen,
  value,
  onChangeValue,
  onSubmitReply,
  replies,
  loading,
  isLoadingSubmit,
}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Replies Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody position="relative" maxHeight="500px" overflow="scroll">
          <Box position="sticky" top="0" zIndex="1" mb="3">
            <BoxCreatePost
              variant="unstyled"
              padding="0"
              placeholder="reply post ..."
              textButton="Reply"
              value={value}
              onChangeValue={onChangeValue}
              onClickPost={onSubmitReply}
              isLoading={isLoadingSubmit}
            />
          </Box>
          <SectionReplies data={replies} loading={loading} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

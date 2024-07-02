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

export default function ModalEditPost({
  onClose,
  isOpen,
  value,
  onChangeValue,
  onSubmitEditPost,
  isLoadingSubmit,
}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody position="relative" maxHeight="500px" overflow="scroll">
          <Box position="sticky" top="0" zIndex="1" mb="3">
            <BoxCreatePost
              variant="unstyled"
              padding="0"
              placeholder="description ..."
              textButton="Submit"
              value={value}
              onChangeValue={onChangeValue}
              onClickPost={onSubmitEditPost}
              isLoading={isLoadingSubmit}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";

export default function ModalDeletePost({ onClose, isOpen, onConfirmDelete }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure delete this post ?</Text>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" onClick={onConfirmDelete}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

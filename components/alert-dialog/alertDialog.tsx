import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

function AlertDialogDelete({ onClick }) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <IconButton
          color="blue.300"
          icon={<DeleteIcon />}
          aria-label="delete-article"
        />
      </Button>
      <AlertDialog
        // motionPreset='slideInBottom'
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        // isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete article
            </AlertDialogHeader>

            <AlertDialogBody>Delete this article?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AlertDialogDelete;

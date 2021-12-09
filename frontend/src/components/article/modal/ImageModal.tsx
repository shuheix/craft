import React, { VFC } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Image,
  Center,
} from "@chakra-ui/react";
import { useSingleArticle } from "../../../hooks/fetch/useSingleArticle";

const ImageModal: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useSingleArticle();

  return (
    <>
      {data?.article.image.url && (
        <>
          <Image
            src={data?.article.image.url}
            boxSize="200px"
            onClick={onOpen}
            _hover={{ cursor: "pointer" }}
          />
          <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalBody>
                <Center>
                  <Image src={data?.article.image.url} />
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default ImageModal;

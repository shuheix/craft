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
import { ArticleApiType } from "../../../types/apiType";

type ModalProps = {
  data: ArticleApiType | null | undefined;
};

const ImageModal: VFC<ModalProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = props;

  return (
    <>
      <Image src={data?.articles.image.url} boxSize="200px" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <Image src={data?.articles.image.url} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;

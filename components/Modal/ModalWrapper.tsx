import {
  Box,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from "@chakra-ui/react";
import useWindowDimensions from "../../utils/hooks/windowDimensions";

type Props = {
  modalTitle?: string | React.ReactNode;
  modalContent?: string | React.ReactNode;
  footerContent?: string | React.ReactNode;
  footerEnabled: boolean;
  disclosure: UseDisclosureProps;
  modalWidth: string;
};

export default function ModalWrapper(props: Props) {
  const { footerEnabled, footerContent, modalContent, modalTitle, modalWidth } =
    props;
  const { isOpen, onClose } = props.disclosure;
  const { width } = useWindowDimensions();
  return (
    <Modal
      isOpen={isOpen as boolean}
      onClose={onClose as () => void}
      size={width > 1000 ? modalWidth : "95%"}
    >
      <ModalOverlay />
      <ModalContent width={width > 1000 ? "60vw" : "95%"}>
        <ModalHeader textAlign={"center"}>
          <Heading fontSize={"30px"}>{modalTitle}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Divider marginBottom={"25px"} />

          <Box position={"relative"}>{modalContent}</Box>
        </ModalBody>

        {footerEnabled && <ModalFooter>{footerContent}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
}

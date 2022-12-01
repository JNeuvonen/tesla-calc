import {
  Box,
  Button,
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
import DividerWrapper from "../StyleWrappers/DividerWrapper";

type Props = {
  modalTitle?: string | React.ReactNode;
  modalContent?: string | React.ReactNode;
  footerContent?: string | React.ReactNode;
  footerEnabled: boolean;
  disclosure: UseDisclosureProps;
};

export default function ModalWrapper(props: Props) {
  const { footerEnabled, footerContent, modalContent, modalTitle } = props;
  const { isOpen, onClose } = props.disclosure;
  const { width } = useWindowDimensions();
  return (
    <Modal
      isOpen={isOpen as boolean}
      onClose={onClose as () => void}
      size={width > 1000 ? "60vw" : "95%"}
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

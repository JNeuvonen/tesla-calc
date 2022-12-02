import {
  Box,
  Button,
  Flex,
  useDisclosure,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../../../context/auth";
import { scrollIdIntoView } from "../../../utils/functions/general";
import { customErrorToast } from "../../../utils/toasts";
import ModalWrapper from "../../Modal/ModalWrapper";
import DividerWrapper from "../../StyleWrappers/DividerWrapper";
import PageContentHeading from "../../StyleWrappers/PageContentHeading";
import CargoDetails from "./CargoDetails";
import IsCargoPrecious from "./CargoRisk";
import ListingTimeSensitivity from "./ListingTimeSensitivity";
import SubmitModalContent from "./SubmitModalContent";
import TargetAddress from "./TargetAddress";
import UserAddress from "./UserAddress";

export type WeightCategory = "NONE" | "LIGHT" | "MEDIUM" | "HEAVY" | "HEAVY-XL";
export type ListingTimeSensitivityQuery = "NOT_ANSWERED" | "YES" | "NO";
export type PreciousCargo = "NOT_ANSWERED" | "IS_PRECIOUS" | "NOT_PRECIOUS";
export type DateOptions = "RANGE" | "AFTER_DATE" | "SINGULAR_DATE";
export type ErroredFieldOptions =
  | "NONE"
  | "target-address"
  | "cargo-details"
  | "drivers-risk"
  | "listing-time-sensitivity";

export default function CreateListing() {
  //STATE
  const submitModalDisclosure = useDisclosure();
  const [originAddress, setOriginAddress] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [attachments, setAttachments] = useState<null | FileList>(null);
  const [selectedMainAttachment, setSelectedMainAttachment] = useState(0);
  const [textDescription, setTextDescription] = useState("");
  const [estimatedWeight, setEstimatedWeight] =
    useState<WeightCategory>("NONE");
  const [isListingTimeSensitive, setIsListingTimeSensitive] =
    useState<ListingTimeSensitivityQuery>("NOT_ANSWERED");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateType, setDateType] = useState<DateOptions>("AFTER_DATE");
  const [isCargoPrecious, setIsCargoPrecious] =
    useState<PreciousCargo>("NOT_ANSWERED");
  const [_distanceOfDrive, _setDistanceOfDrive] = useState(null);

  const [erroredField, setErroredField] = useState<ErroredFieldOptions>("NONE");

  //CONTEXT
  const user = useAuth();

  //UTIL
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setOriginAddress(user.user?.address as string);
    }
  }, [user]);

  const submitForm = async () => {
    let formIsValid = true;
    let formErrorToast = "";

    if (!originAddress) {
      scrollIdIntoView("origin-address");
      formIsValid = false;
      formErrorToast = "Tavaran lähtösijainti puuttuu lomakkeesta";
    } else if (!targetAddress) {
      scrollIdIntoView("target-address");
      formIsValid = false;
      formErrorToast = "Tavaran määränpää puuttuu lomakkeesta";
      setErroredField("target-address");
    } else if (!attachments) {
      formIsValid = false;
      formErrorToast = "Kuvat tavarasta puuttuvat lomakkeesta";
      scrollIdIntoView("cargo-details");
      setErroredField("cargo-details");
    } else if (estimatedWeight === "NONE") {
      formIsValid = false;
      formErrorToast = "Arvio tavaran painosta puuttuu";
      scrollIdIntoView("cargo-details");
    } else if (isListingTimeSensitive === "NOT_ANSWERED") {
      formIsValid = false;
      formErrorToast =
        "Kuljetuksen ajankohdasta ei ole annettu riittävästi tietoa";
      scrollIdIntoView("listing-time-sensitivity");
      setErroredField("listing-time-sensitivity");
    } else if (isCargoPrecious === "NOT_ANSWERED") {
      formIsValid = false;
      formErrorToast = "Kuljettajan vastuu -kohtaan ei ole vastattu";
      scrollIdIntoView("drivers-risk");
      setErroredField("drivers-risk");
    }

    //const _payload = {
    //  originAddress,
    //  targetAddress,
    //  attachments,
    //  selectedMainAttachmentIndex: selectedMainAttachment,
    //  textDescription,
    //  estimatedWeight,
    //  isListingTimeSensitive,
    //  selectedDate,
    //  dateType,
    //  isCargoPrecious,
    //};

    if (formIsValid) {
      submitModalDisclosure.onOpen();

      //const urlSearchParams = new URLSearchParams({
      //  origin: originAddress,
      //  //@ts-ignore
      //  target: targetAddress.label,
      //});

      //const endpoint =
      process.env.NEXT_PUBLIC_BACKEND_HOST + "google/directions?";

      //const res = await fetch(endpoint + urlSearchParams);
      //const _parsedRes = await res.json();
    } else {
      toast(customErrorToast(formErrorToast) as UseToastOptions);
    }
  };

  return (
    <Box>
      <PageContentHeading>Uusi kuljetusilmoitus</PageContentHeading>
      <UserAddress
        address={originAddress}
        setOriginAddress={setOriginAddress}
      />
      <DividerWrapper verticalMargin={"32px"} />
      <TargetAddress
        setTargetAddress={setTargetAddress}
        erroredField={erroredField}
      />
      <DividerWrapper verticalMargin={"32px"} />
      <CargoDetails
        setAttachments={setAttachments}
        attachments={attachments}
        setSelectedMainAttachment={setSelectedMainAttachment}
        selectedMainAttachment={selectedMainAttachment}
        textDescription={textDescription}
        setTextDescription={setTextDescription}
        estimatedWeight={estimatedWeight}
        setEstimatedWeight={setEstimatedWeight}
        erroredField={erroredField}
      />
      <DividerWrapper verticalMargin={"32px"} />

      <ListingTimeSensitivity
        isListingTimeSensitive={isListingTimeSensitive}
        setIsListingTimeSensitive={setIsListingTimeSensitive}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dateType={dateType}
        setDateType={setDateType}
        erroredField={erroredField}
      />

      <DividerWrapper verticalMargin={"32px"} />

      <IsCargoPrecious
        isCargoPrecious={isCargoPrecious}
        setIsCargoPrecious={setIsCargoPrecious}
        erroredField={erroredField}
      />

      <DividerWrapper verticalMargin={"32px"} />

      <SubmitFooter submit={submitForm} />

      <ModalWrapper
        disclosure={submitModalDisclosure}
        footerEnabled={false}
        modalTitle={"Tarkista tiedot"}
        modalContent={<SubmitModalContent />}
        modalWidth={"sm"}
      />
    </Box>
  );
}

const SubmitFooter = ({ submit }: { submit: () => void }) => {
  return (
    <Flex
      flexDirection={"row-reverse"}
      width={"100%"}
      justifyContent={"space-between"}
      flexWrap={"wrap"}
      rowGap={"16px"}
    >
      <Button width={"120px"} onClick={submit}>
        Lähetä
      </Button>
      <Button width={"120px"} variant={"primaryInverse"}>
        Peruuta
      </Button>
    </Flex>
  );
};

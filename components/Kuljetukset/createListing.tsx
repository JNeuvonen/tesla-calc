import {
  Box,
  Button,
  Checkbox,
  Flex,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GREY_100 } from "../../chakra/colors";
import { BOX_SHADOW_100, SMALL_BUTTON_HEIGHT } from "../../chakra/constants";
import { useAuth } from "../../context/auth";
import {
  getDateFormatted,
  getInputFieldValById,
  weightCategoryFormatted,
} from "../../utils/functions/general";
import useWindowDimensions from "../../utils/hooks/windowDimensions";
import {
  LightCargoIcon,
  LightWeightIcon,
  MediumCargoIcon,
  TrolleyIcon,
  WarningIcon,
} from "../../utils/icons";
import ModalFooterWrapper from "../Modal/ModalFooter";
import ModalWrapper from "../Modal/ModalWrapper";
import BorderDiv from "../StyleWrappers/BorderDiv";
import DividerWrapper from "../StyleWrappers/DividerWrapper";
import GreyText from "../StyleWrappers/GreyText";
import PageContentHeading from "../StyleWrappers/PageContentHeading";
import FileHandler from "../Util/FileHandler";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export type WeightCategory = "NONE" | "LIGHT" | "MEDIUM" | "HEAVY" | "HEAVY-XL";
export type ListingTimeSensitivityQuery = "NOT_ANSWERED" | "YES" | "NO";

export default function CreateListing() {
  //STATE
  const [originAddress, setOriginAddress] = useState("");
  const [_targetAddress, setTargetAddress] = useState("");
  const [attachments, setAttachments] = useState<null | FileList>(null);
  const [selectedMainAttachment, setSelectedMainAttachment] = useState(0);
  const [textDescription, setTextDescription] = useState("");
  const [estimatedWeight, setEstimatedWeight] =
    useState<WeightCategory>("NONE");
  const [isListingTimeSensitive, setIsListingTimeSensitive] =
    useState<ListingTimeSensitivityQuery>("NOT_ANSWERED");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateType, setDateType] = useState<
    "RANGE" | "SINGULAR_DATE" | "AFTER_DATE"
  >("AFTER_DATE");

  //CONTEXT
  const user = useAuth();

  useEffect(() => {
    if (user) {
      setOriginAddress(user.user?.address as string);
    }
  }, [user]);

  return (
    <Box>
      <PageContentHeading>Uusi kuljetusilmoitus</PageContentHeading>
      <UserAddress
        address={originAddress}
        setOriginAddress={setOriginAddress}
      />
      <DividerWrapper verticalMargin={"32px"} />
      <TargetAddress setTargetAddress={setTargetAddress} />
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
      />
      <DividerWrapper verticalMargin={"32px"} />

      <ListingTimeSensitivity
        isListingTimeSensitive={isListingTimeSensitive}
        setIsListingTimeSensitive={setIsListingTimeSensitive}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dateType={dateType}
        setDateType={setDateType}
      />

      <DividerWrapper verticalMargin={"32px"} />

      <IsCargoPrecious />

      <DividerWrapper verticalMargin={"32px"} />

      <SubmitFooter />
    </Box>
  );
}

const IsCargoPrecious = () => {
  return (
    <Box>
      <Text fontSize={"19px"} fontWeight={"bold"}>
        Ajankohta
      </Text>
      <BorderDiv maxW={"800px"} width={"100%"} marginTop={"5px"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontWeight={"500"}>
            Vaatiiko tavaran kuljettaminen erityistä huolellisuutta?
          </Text>

          <Flex columnGap={"16px"}>
            <Button
              variant={"secondary"}
              minWidth={"75px"}
              maxWidth={"max-content"}
              height={SMALL_BUTTON_HEIGHT}
            >
              Kyllä
            </Button>
            <Button
              variant={"secondaryInverse"}
              minWidth={"75px"}
              maxWidth={"max-content"}
              height={SMALL_BUTTON_HEIGHT}
            >
              Ei
            </Button>
          </Flex>
        </Flex>
      </BorderDiv>
    </Box>
  );
};

const ListingTimeSensitivity = ({
  isListingTimeSensitive,
  setIsListingTimeSensitive,
  selectedDate,
  setSelectedDate,
  dateType,
  setDateType,
}: {
  isListingTimeSensitive: ListingTimeSensitivityQuery;
  setIsListingTimeSensitive: React.Dispatch<
    React.SetStateAction<ListingTimeSensitivityQuery>
  >;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  dateType: "RANGE" | "SINGULAR_DATE" | "AFTER_DATE";
  setDateType: React.Dispatch<
    React.SetStateAction<"RANGE" | "SINGULAR_DATE" | "AFTER_DATE">
  >;
}) => {
  const renderQuestion = () => {
    if (isListingTimeSensitive === "NOT_ANSWERED") {
      return (
        <BorderDiv maxW={"800px"} width={"100%"} marginTop={"5px"}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontWeight={"500"}>
              Onko kuljetuksen ajankohdalla merkitystä?
            </Text>

            <Flex columnGap={"16px"}>
              <Button
                variant={"secondary"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => setIsListingTimeSensitive("YES")}
              >
                Kyllä
              </Button>
              <Button
                variant={"secondaryInverse"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => setIsListingTimeSensitive("NO")}
              >
                Ei
              </Button>
            </Flex>
          </Flex>
        </BorderDiv>
      );
    }

    if (isListingTimeSensitive === "YES") {
      return (
        <Box marginTop={"16px"}>
          <Flex columnGap={"16px"} flexWrap={"wrap"} rowGap={"16px"}>
            <Flex columnGap={"10px"}>
              <Checkbox
                isChecked={dateType === "SINGULAR_DATE" ? true : false}
                onChange={() => setDateType("SINGULAR_DATE")}
              />
              <GreyText>Yksittäinen ajankohta</GreyText>
            </Flex>

            <Flex columnGap={"10px"}>
              <Checkbox
                isChecked={dateType === "RANGE" ? true : false}
                onChange={() => setDateType("RANGE")}
              />
              <GreyText>Useampi päivä</GreyText>
            </Flex>

            <Flex columnGap={"10px"}>
              <Checkbox
                isChecked={dateType === "AFTER_DATE" ? true : false}
                onChange={() => setDateType("AFTER_DATE")}
              />
              <GreyText>Haluan kuljetuksen jonkin ajankohdan jälkeen</GreyText>
            </Flex>
          </Flex>

          <Flex
            marginTop={"16px"}
            flexWrap={"wrap"}
            columnGap={"16px"}
            rowGap={"16px"}
          >
            <GreyText>{getDateFormatted(selectedDate, dateType)}</GreyText>
            <Button
              padding={"4px 16px"}
              width={"max-content"}
              borderRadius={"10px"}
              height={"25px"}
              variant={"primaryInverse"}
              textTransform={"none"}
              onClick={() => setIsListingTimeSensitive("NO")}
            >
              <Text cursor={"pointer"} fontSize={"12px"}>
                Ajanhetkellä ei ole väliä
              </Text>
            </Button>
          </Flex>

          <Box maxWidth={"400px"} width={"100%"} marginTop={"16px"}>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              selectRange={dateType === "RANGE" ? true : false}
            />
          </Box>
        </Box>
      );
    }

    if (isListingTimeSensitive === "NO") {
      return (
        <Box>
          <Flex
            maxWidth={""}
            width={"100%"}
            flexWrap={"wrap"}
            columnGap={"16px"}
            fontSize={"19px"}
            flexDir={"row"}
            alignItems={"center"}
          >
            <GreyText>
              Kuljetus tapahtuu mahdollisimman pian, mutta ajankohdalla ei ole
              merkitystä
            </GreyText>
            <Button
              padding={"4px 16px"}
              width={"max-content"}
              borderRadius={"10px"}
              height={"25px"}
              variant={"primaryInverse"}
              onClick={() => setIsListingTimeSensitive("YES")}
            >
              <Text cursor={"pointer"} fontSize={"12px"}>
                Muuta
              </Text>
            </Button>
          </Flex>
        </Box>
      );
    }

    return null;
  };
  return (
    <Box>
      <Text fontSize={"19px"} fontWeight={"bold"}>
        Ajankohta
      </Text>
      {renderQuestion()}
    </Box>
  );
};

const SubmitFooter = () => {
  return (
    <Flex flexDirection={"row-reverse"} width={"100%"}>
      <Button width={"120px"}>Lähetä</Button>
    </Flex>
  );
};

const TargetAddress = ({
  setTargetAddress,
}: {
  setTargetAddress: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [askForTargetAddress, setAskForTargetAddress] = useState("INIT");

  const getTargetAddress = () => {
    if (askForTargetAddress === "INIT") {
      return (
        <BorderDiv maxW={"800px"} width={"100%"} marginTop={"5px"}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            columnGap={"32px"}
            rowGap={"32px"}
            flexWrap={"wrap"}
          >
            <Text fontWeight={"500"}>
              Onko tavaroiden määränpää kaatopaikka tai kierrätyskeskus?
            </Text>
            <Flex columnGap={"16px"}>
              <Button
                variant={"secondary"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => {
                  setTargetAddress("Kaatopaikka tai kierrätys");
                  setAskForTargetAddress("RECYCLING");
                }}
              >
                Kyllä
              </Button>
              <Button
                variant={"secondaryInverse"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => {
                  setAskForTargetAddress("QUERY");
                }}
              >
                Ei
              </Button>
            </Flex>
          </Flex>
        </BorderDiv>
      );
    }

    if (askForTargetAddress === "RECYCLING") {
      return (
        <Box>
          <Flex
            maxWidth={"800px"}
            width={"100%"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            rowGap={"5px"}
            fontSize={"19px"}
          >
            <GreyText>
              Kaatopaikan, kierrätyspisteen tai sortausaseman osoite
            </GreyText>
          </Flex>
          <Box maxWidth={"800px"} width={"100%"} marginTop={"5px"}>
            <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              apiOptions={{ language: "Finnish" }}
              selectProps={{
                onChange: setTargetAddress,
              }}
            />
          </Box>
        </Box>
      );
    }

    return (
      <Box maxWidth={"800px"} width={"100%"} marginTop={"5px"}>
        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          apiOptions={{ language: "fi" }}
          selectProps={{
            onChange: setTargetAddress,
          }}
        />
      </Box>
    );
  };
  return (
    <Box>
      <Text fontSize={"19px"} fontWeight={"bold"}>
        Määränpää
      </Text>
      {getTargetAddress()}
    </Box>
  );
};

const UserAddress = ({
  address,
  setOriginAddress,
}: {
  address: string;
  setOriginAddress: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [askIfAddressIsCorrect, setAskIfAddressIsCorrect] = useState(false);
  const [isAddressCorrect, setIsAddressCorrect] = useState(false);

  const returnInputField = () => {
    if (isAddressCorrect) {
      return (
        <Flex columnGap={"32px"} maxWidth={"800px"}>
          <Flex
            maxWidth={""}
            width={"100%"}
            flexWrap={"wrap"}
            columnGap={"16px"}
            fontSize={"19px"}
            flexDir={"row"}
            alignItems={"center"}
          >
            <GreyText>{address}</GreyText>
            <Button
              padding={"4px 16px"}
              width={"max-content"}
              borderRadius={"10px"}
              height={"25px"}
              variant={"primaryInverse"}
            >
              <Text
                cursor={"pointer"}
                fontSize={"12px"}
                onClick={() => setIsAddressCorrect(false)}
              >
                Muuta
              </Text>
            </Button>
          </Flex>
        </Flex>
      );
    }

    return (
      <Box maxWidth={"800px"} width={"100%"}>
        <Box marginTop={"5px"}>
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            apiOptions={{ language: "fi" }}
            selectProps={{
              onChange: setOriginAddress,
            }}
          />
        </Box>
      </Box>
    );
  };

  const getAddressInputField = () => {
    return askIfAddressIsCorrect ? (
      returnInputField()
    ) : (
      <Box>
        <BorderDiv maxW={"800px"} width={"100%"} marginTop={"5px"}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            columnGap={"32px"}
            rowGap={"32px"}
            flexWrap={"wrap"}
          >
            <Text fontWeight={"500"}>Onko {address} lähtösijainti?</Text>
            <Flex columnGap={"16px"}>
              <Button
                variant={"secondary"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => {
                  setAskIfAddressIsCorrect(true);
                  setIsAddressCorrect(true);
                }}
              >
                Kyllä
              </Button>
              <Button
                variant={"secondaryInverse"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => {
                  setAskIfAddressIsCorrect(true);
                  setIsAddressCorrect(false);
                }}
              >
                Ei
              </Button>
            </Flex>
          </Flex>
        </BorderDiv>
      </Box>
    );
  };
  return (
    <Box>
      <Box marginTop={"32px"}>
        <Text fontSize={"19px"} fontWeight={"bold"}>
          Sijanti
        </Text>
        {getAddressInputField()}
      </Box>
    </Box>
  );
};

const CargoDetails = ({
  attachments,
  setAttachments,
  setSelectedMainAttachment,
  selectedMainAttachment,
  textDescription,
  setTextDescription,
  estimatedWeight,
  setEstimatedWeight,
}: {
  attachments: FileList | null;
  setAttachments: React.Dispatch<React.SetStateAction<FileList | null>>;
  setSelectedMainAttachment: React.Dispatch<React.SetStateAction<number>>;
  selectedMainAttachment: number;
  textDescription: string;
  setTextDescription: React.Dispatch<React.SetStateAction<string>>;
  estimatedWeight: WeightCategory;
  setEstimatedWeight: React.Dispatch<React.SetStateAction<WeightCategory>>;
}) => {
  const modalDisclosure = useDisclosure();
  const [modalInEditMode, setModalInEditMode] = useState(false);

  const addedAttchments = useRef<FileList | null>(attachments);
  const selectedWeightCategory = useRef<WeightCategory>(estimatedWeight);
  const selectedMainPicture = useRef(selectedMainAttachment);
  const freeDescription = useRef(textDescription);

  const [, updateState] = useState(0);
  const forceUpdate = React.useCallback(
    () => updateState(Math.random() * Number.MAX_SAFE_INTEGER),
    []
  );

  const WeightCategoryBox = ({
    title,
    icon,
    cargoWeight,
  }: {
    title: string;
    icon: React.ReactNode;
    cargoWeight: WeightCategory;
  }) => {
    const active = selectedWeightCategory.current === cargoWeight;
    return (
      <BorderDiv
        width={"100%"}
        cursor={"pointer"}
        bg={active ? GREY_100 : undefined}
        boxShadow={active ? BOX_SHADOW_100 : undefined}
        onClick={() => {
          selectedWeightCategory.current = cargoWeight;
          forceUpdate();
        }}
      >
        <GreyText textAlign={"center"} fontWeight={"bold"}>
          {title}
        </GreyText>
        <Box margin={"0 auto"} width={"max-content"}>
          {icon}
        </Box>
      </BorderDiv>
    );
  };

  const savelModalInformation = () => {
    const textDescription = getInputFieldValById(
      "cargo-free-text-descrp",
      true
    );
    if (textDescription) {
      setTextDescription(freeDescription.current);
    }
    setAttachments(addedAttchments.current);
    setEstimatedWeight(selectedWeightCategory.current);
    setSelectedMainAttachment(selectedMainPicture.current);
    setModalInEditMode(true);
    modalDisclosure.onClose();
  };

  const ModalFooter = () => {
    return (
      <>
        <ModalFooterWrapper
          leftButton={
            <Button
              variant={"secondaryInverse"}
              height={SMALL_BUTTON_HEIGHT}
              onClick={modalDisclosure.onClose}
            >
              Peruuta
            </Button>
          }
          rightButton={
            <Button
              variant={"secondary"}
              height={SMALL_BUTTON_HEIGHT}
              onClick={savelModalInformation}
            >
              Tallenna
            </Button>
          }
        />
      </>
    );
  };

  const renderFileList = (insideModal: boolean) => {
    const arr = Array.from(
      (insideModal ? addedAttchments.current : attachments) || []
    );

    return (
      <>
        <Flex columnGap={"16px"} marginTop={"16px"}>
          <Tooltip
            label={
              <span>
                Hyvin valittu pääkuva antaa nopeammin parempia tarjousehdotuksia
              </span>
            }
          >
            <span>
              <GreyText textDecoration={"underline"}>
                Valitse ilmoituksen pääkuva
              </GreyText>
            </span>
          </Tooltip>
        </Flex>
        {arr.map((item, i) => {
          return (
            <Flex columnGap={"16px"} marginTop={"10px"}>
              <Checkbox
                isChecked={
                  insideModal
                    ? i === selectedMainPicture.current
                    : i === selectedMainAttachment
                }
                onChange={() => {
                  selectedMainPicture.current = i;
                  forceUpdate();
                }}
              />
              {item.name}
            </Flex>
          );
        })}
      </>
    );
  };

  const ModalContent = () => {
    const handleFileAddFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
      addedAttchments.current = e.target.files;
      forceUpdate();
    };

    const { width } = useWindowDimensions();
    return (
      <Box>
        <Box maxWidth={"500px"} width={"100%"} marginTop={"32px"}>
          <GreyText>Vapaa kuvaus</GreyText>
          <Textarea
            marginTop={"7px"}
            id={"cargo-free-text-descrp"}
            defaultValue={freeDescription.current}
            onChange={(e) => (freeDescription.current = e.target.value)}
          ></Textarea>
        </Box>

        <Box marginTop={"32px"}>
          <GreyText>Arvioi paino</GreyText>

          <Flex
            marginTop={"12px"}
            columnGap={"32px"}
            rowGap={"16px"}
            flexWrap={width < 1000 ? "wrap" : undefined}
          >
            <WeightCategoryBox
              title="Alle 50 kg"
              icon={<LightWeightIcon width="42px" height="42px" />}
              cargoWeight={"LIGHT"}
            />

            <WeightCategoryBox
              title="50-100 kg"
              icon={<LightCargoIcon width="42px" height="42px" />}
              cargoWeight={"MEDIUM"}
            />

            <WeightCategoryBox
              title="100-300 kg"
              icon={<MediumCargoIcon width="42px" height="42px" />}
              cargoWeight={"HEAVY"}
            />

            <WeightCategoryBox
              title="Enemmän kuin 300 kg"
              icon={<TrolleyIcon width="42px" height="42px" />}
              cargoWeight={"HEAVY-XL"}
            />
          </Flex>
        </Box>

        <Box marginTop={"32px"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"end"}
            flexWrap={"wrap"}
            rowGap={"16px"}
          >
            <GreyText>Kuvia tai videoita {attachments && <>✓</>}</GreyText>

            {attachments === null ? (
              <GreyText
                as={"i"}
                fontSize={"12px"}
                fontWeight={"bold"}
                marginTop={"6px"}
              >
                * Kuvat tai videot ovat pakollinen tieto
              </GreyText>
            ) : null}
          </Flex>
        </Box>

        <Flex flexDir={"column"} marginTop={"10px"}>
          <Box>
            <FileHandler handleFile={handleFileAddFunc} />
          </Box>

          {addedAttchments.current && <Box>{renderFileList(true)}</Box>}
        </Flex>
      </Box>
    );
  };

  return (
    <Box>
      <Box marginTop={"32px"}>
        <Flex columnGap={"32px"} rowGap={"32px"} alignItems={"center"}>
          <Text fontSize={"19px"} fontWeight={"bold"}>
            Tietoja kuormasta
          </Text>

          <Button
            height={SMALL_BUTTON_HEIGHT}
            variant={"primaryInverse"}
            width={"85px"}
            onClick={() => {
              modalDisclosure.onOpen();
            }}
          >
            {modalInEditMode ? "Muuta" : "Lisää"}
          </Button>
        </Flex>
      </Box>

      {modalInEditMode && (
        <Box marginTop={"32px"}>
          <GreyText fontSize={"19px"} fontWeight={"bold"}>
            Vapaa tekstikuvaus
          </GreyText>

          <GreyText>
            {textDescription ? textDescription : "Ei kuvausta"}
          </GreyText>
        </Box>
      )}

      {estimatedWeight !== "NONE" && (
        <Box marginTop={"32px"}>
          <GreyText fontSize={"19px"} fontWeight={"bold"}>
            Kuorman arvioitu paino
          </GreyText>
          <GreyText>{weightCategoryFormatted(estimatedWeight)}</GreyText>
        </Box>
      )}

      {modalInEditMode ? (
        attachments ? (
          <Box marginTop={"32px"}>{renderFileList(false)}</Box>
        ) : (
          <Box marginTop={"32px"}>
            <Flex columnGap={"16px"} alignItems={"center"}>
              <Tooltip
                label={
                  "Liitetiedot ovat tärkeitä jotta kuljettajat osaavat antaa reilun tarjouksen"
                }
              >
                <span>
                  <WarningIcon width="25px" height="25px" />
                </span>
              </Tooltip>
              <GreyText fontSize={"19px"} fontWeight={"bold"}>
                Liitetiedostot puuttuvat
              </GreyText>

              <Button
                height={"24px"}
                fontSize={"14px"}
                onClick={modalDisclosure.onOpen}
              >
                Lisää
              </Button>
            </Flex>
          </Box>
        )
      ) : null}

      <ModalWrapper
        disclosure={modalDisclosure}
        footerEnabled={true}
        modalTitle={"Kuorman tiedot"}
        modalContent={<ModalContent />}
        footerContent={<ModalFooter />}
      />
    </Box>
  );
};

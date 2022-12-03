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
import React, { useRef, useState } from "react";
import { GREY_100, RED_100 } from "../../../chakra/colors";
import { BOX_SHADOW_100, SMALL_BUTTON_HEIGHT } from "../../../chakra/constants";
import {
  getInputFieldValById,
  weightCategoryFormatted,
} from "../../../utils/functions/general";
import useWindowDimensions from "../../../utils/hooks/windowDimensions";
import {
  LightCargoIcon,
  LightWeightIcon,
  MediumCargoIcon,
  TrolleyIcon,
  WarningIcon,
} from "../../../utils/icons";
import ModalFooterWrapper from "../../Modal/ModalFooter";
import ModalWrapper from "../../Modal/ModalWrapper";
import BorderDiv from "../../StyleWrappers/BorderDiv";
import GreyText from "../../StyleWrappers/GreyText";
import FileHandler from "../../Util/FileHandler";
import { ErroredFieldOptions, WeightCategory } from "./types";

export default function CargoDetails({
  attachments,
  setAttachments,
  setSelectedMainAttachment,
  selectedMainAttachment,
  textDescription,
  setTextDescription,
  estimatedWeight,
  setEstimatedWeight,
  erroredField,
}: {
  attachments: FileList | null;
  setAttachments: React.Dispatch<React.SetStateAction<FileList | null>>;
  setSelectedMainAttachment: React.Dispatch<React.SetStateAction<number>>;
  selectedMainAttachment: number;
  textDescription: string;
  setTextDescription: React.Dispatch<React.SetStateAction<string>>;
  estimatedWeight: WeightCategory;
  setEstimatedWeight: React.Dispatch<React.SetStateAction<WeightCategory>>;
  erroredField: ErroredFieldOptions;
}) {
  const cargoModalDisclosure = useDisclosure();

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
    cargoModalDisclosure.onClose();
  };

  const ModalFooter = () => {
    return (
      <>
        <ModalFooterWrapper
          leftButton={
            <Button
              variant={"secondaryInverse"}
              height={SMALL_BUTTON_HEIGHT}
              onClick={cargoModalDisclosure.onClose}
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
            <Flex columnGap={"16px"} marginTop={"10px"} key={i}>
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
    <Box id={"cargo-details"}>
      <BorderDiv
        maxW={"800px"}
        width={"100%"}
        marginTop={"32px"}
        isErrored={erroredField === "cargo-details"}
      >
        <Flex>
          <Flex columnGap={"32px"} rowGap={"32px"} alignItems={"center"}>
            <Text
              fontSize={"19px"}
              fontWeight={"bold"}
              color={erroredField === "cargo-details" ? RED_100 : "black"}
            >
              Tietoja kuormasta
            </Text>

            <Button
              height={SMALL_BUTTON_HEIGHT}
              width={"85px"}
              onClick={() => {
                cargoModalDisclosure.onOpen();
              }}
            >
              {modalInEditMode ? "Muuta" : "Lisää"}
            </Button>
          </Flex>
        </Flex>
      </BorderDiv>
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
                onClick={cargoModalDisclosure.onOpen}
              >
                Lisää
              </Button>
            </Flex>
          </Box>
        )
      ) : null}

      <ModalWrapper
        disclosure={cargoModalDisclosure}
        footerEnabled={true}
        modalTitle={"Kuorman tiedot"}
        modalContent={<ModalContent />}
        footerContent={<ModalFooter />}
        modalWidth={"60vw"}
      />
    </Box>
  );
}

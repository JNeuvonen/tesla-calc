import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
} from "@chakra-ui/react";
import { useState } from "react";
type Props = {
  label: string;
  helpText: string;
  name: string;
  id: string;
  type: string;
  validateFunction: (input: string) => boolean;
  autocomplete: string;
  errorText?: string;
};
const TextInputLifeFeedback = ({
  label,
  helpText,
  id,
  type,
  autocomplete,
  validateFunction,
  errorText,
}: Props) => {
  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const validateInput = (input: string) => {
    setValid(validateFunction(input));
  };

  const getType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }

    return type;
  };

  return (
    <FormControl isInvalid={!touched ? false : valid ? false : true}>
      <FormLabel
        textTransform={"capitalize"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        {label}
        {valid && <Box>✓</Box>}
      </FormLabel>
      <InputGroup>
        <Input
          type={getType()}
          autoComplete={autocomplete}
          onChange={(e) => validateInput(e.target.value)}
          onFocus={() => setTouched(true)}
          id={id}
        />
        {type === "password" && (
          <InputRightElement width="4.5rem">
            <Tag
              h="1.75rem"
              width={"max-content"}
              onClick={() => setShowPassword(!showPassword)}
            >
              <Flex columnGap={"10px"}>{showPassword ? "Hide" : "Show"}</Flex>
            </Tag>
          </InputRightElement>
        )}
      </InputGroup>
      {valid ? (
        <FormHelperText>{helpText}</FormHelperText>
      ) : touched ? (
        <FormErrorMessage>{errorText}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
export default TextInputLifeFeedback;

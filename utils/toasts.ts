export const successToast = {
  title: "Saved",
  position: "top-right",
  status: "success",
  duration: 9000,
  isClosable: true,
};

export const errorToast = {
  title: "Failed to save",
  position: "top-right",
  status: "error",
  duration: 9000,
  isClosable: true,
};

export const customWarningToast = (content: string) => {
  return {
    title: content,
    position: "top-right",
    status: "warning",
    duration: 9000,
    isClosable: true,
  };
};

export const customErrorToast = (content: string) => {
  return {
    title: content,
    position: "top-right",
    status: "error",
    duration: 9000,
    isClosable: true,
  };
};

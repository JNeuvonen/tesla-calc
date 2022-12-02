import { Button } from "@chakra-ui/react";
import React, { useRef } from "react";
import { SMALL_BUTTON_HEIGHT } from "../../chakra/constants";

export default function FileHandler(props: any) {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    //@ts-ignore
    hiddenFileInput.current.click();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleFile(event);
  };
  return (
    <>
      <Button onClick={handleClick} height={SMALL_BUTTON_HEIGHT}>
        Lisää tiedostoja
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
        multiple
        accept="image/*"
      />
    </>
  );
}

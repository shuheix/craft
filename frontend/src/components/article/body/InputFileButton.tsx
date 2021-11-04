import React, { useRef, useState, VFC } from "react";
import { IconButton } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

const InputFileButton: VFC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputImage = event.target.files;
    if (inputImage != null) {
      const inputArray = Array.from(inputImage);
      setImages(inputArray);
    }
  };

  return (
    <>
      <input
        id="image"
        type="file"
        ref={inputRef}
        accept="image/*"
        hidden
        onChange={onChangeImage}
        multiple
      />
      <IconButton
        aria-label="Input-image"
        icon={<AttachmentIcon />}
        onClick={onButtonClick}
      />
      {images?.map((image) => (
        <p>{image.name}</p>
      ))}
    </>
  );
};

export default InputFileButton;

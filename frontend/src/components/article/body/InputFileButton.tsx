import React, { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";

const InputFileButton = () => {
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
        type="file"
        ref={inputRef}
        accept="image/*"
        hidden
        onChange={onChangeImage}
        multiple
      />
      <Button onClick={onButtonClick}>ボタン</Button>
      {images?.map((image) => (
        <p>{image.name}</p>
      ))}
    </>
  );
};

export default InputFileButton;

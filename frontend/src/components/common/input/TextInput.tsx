import { Input } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  placeholder: string;
  value: string;
  fullWidth?: string;
};

const TextInput: VFC<Props> = (props) => {
  const { placeholder, value, fullWidth } = props;
  return (
    <Input
      size="md"
      placeholder={placeholder}
      value={value}
      fullWidth={fullWidth}
    />
  );
};

export default TextInput;

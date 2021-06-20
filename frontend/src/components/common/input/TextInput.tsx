import { Input } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  placeholder: string;
  value: string;
  mb?: number;
  onChange: (event: any) => void;
};

const TextInput: VFC<Props> = (props) => {
  const { placeholder, value, onChange, mb } = props;
  return (
    <Input
      size="md"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      mb={mb}
    />
  );
};

export default TextInput;

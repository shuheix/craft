import { Input } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  placeholder: string;
  value: string;
  onChange: (event: any) => void;
};

const TextInput: VFC<Props> = (props) => {
  const { placeholder, value, onChange } = props;
  return (
    <Input
      size="md"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;

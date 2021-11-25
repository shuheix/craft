import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useSearch } from "../../hooks/useSerach";
import { useResponsiveStyle } from "../../hooks/useResponsiveStyle";

const SearchGroup = () => {
  const { searchArticle, pressEnterKey, inputData, inputValue } = useSearch();
  const { isLargerThan768 } = useResponsiveStyle();
  return (
    <>
      <InputGroup>
        {isLargerThan768 && <InputLeftAddon children={<SearchIcon />} />}
        <Input
          placeholder="検索"
          value={inputValue}
          onChange={inputData}
          onKeyPress={pressEnterKey}
        />
        <InputRightElement>
          <Button size="md" onClick={searchArticle}>
            検索
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default SearchGroup;

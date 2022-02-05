import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  is_answerd: boolean | undefined;
};
const EditAnswerdStateTag: VFC<Props> = (props) => {
  const { is_answerd } = props;
  if (is_answerd === null) return null;
  return (
    <div>
      <Menu>
        <MenuButton
          px={4}
          py={2}
          mb={5}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}
        >
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>回答受付中</MenuItem>
          <MenuItem>解決済</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default EditAnswerdStateTag;

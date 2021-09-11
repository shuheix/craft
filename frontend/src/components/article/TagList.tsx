import { Tag, TagLabel, Wrap, WrapItem } from "@chakra-ui/react";
import React, { VFC } from "react";

const TagList: VFC = () => {
  return (
    <Wrap ml={5} mb={5} bgColor="white" borderRadius="2xl" p={5}>
      <WrapItem>
        <Tag>
          <TagLabel>#tag_</TagLabel>
        </Tag>
      </WrapItem>
      <WrapItem>
        <Tag>
          <TagLabel>#apple</TagLabel>
        </Tag>
      </WrapItem>
      <WrapItem>
        <Tag>
          <TagLabel>#el</TagLabel>
        </Tag>
      </WrapItem>
      <WrapItem>
        <Tag>
          <TagLabel>#hello</TagLabel>
        </Tag>
      </WrapItem>
      <WrapItem>
        <Tag>
          <TagLabel>#tag_name</TagLabel>
        </Tag>
      </WrapItem>
    </Wrap>
  );
};

export default TagList;

import { Tag, TagLabel, TagProps } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = TagProps & {
  is_answerd: boolean | undefined;
};
const AnswerdStateTag: VFC<Props> = (props) => {
  const { is_answerd } = props;

  if (is_answerd === null) return null;
  return (
    <>
      {is_answerd ? (
        <Tag variant="solid" colorScheme="gray" {...props}>
          <TagLabel>解決済</TagLabel>
        </Tag>
      ) : (
        <Tag variant="solid" colorScheme="red" {...props}>
          <TagLabel>回答受付中</TagLabel>
        </Tag>
      )}
    </>
  );
};

export default AnswerdStateTag;

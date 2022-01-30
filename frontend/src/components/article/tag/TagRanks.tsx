import React, { VFC } from "react";

import {
  Box,
  Divider,
  Heading,
  HStack,
  Spinner,
  Tag,
  TagLabel,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import useTagRanks from "../../../hooks/fetch/useTagRanks";
import { useHistory } from "react-router-dom";
import { SEARCH_URL } from "../../../constant/appHistory";
import { useResponsiveStyle } from "../../../hooks/useResponsiveStyle";

const TagRanks: VFC = () => {
  const { data, isError, isLoading } = useTagRanks();
  const { isLargerThan1024 } = useResponsiveStyle();
  const history = useHistory();

  if (isLoading) return <Spinner />;
  if (isError) return <p>error!</p>;
  if (isLargerThan1024 === false) return null;
  return (
    <Box
      w="400px"
      bgColor="white"
      alignSelf="flex-start"
      borderRadius="xl"
      boxShadow="md"
      h="400px"
    >
      <Heading fontSize="md" textAlign="center" py={5}>
        人気のタグ
      </Heading>
      <Divider colorScheme="teal" />
      <VStack py={5} h="100%" justifySelf="start" justifyContent="flex-start">
        {data?.tags.map((tag) => (
          <HStack w="100%" justifyContent="space-between" px={5} key={tag.id}>
            <Tag
              size="lg"
              borderRadius="full"
              colorScheme="teal"
              variant="solid"
              _hover={{ cursor: "pointer", boxShadow: "xl" }}
            >
              <TagLabel
                px={1}
                onClick={() => history.push(SEARCH_URL(tag.name))}
              >
                {tag.name}
              </TagLabel>
            </Tag>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default TagRanks;

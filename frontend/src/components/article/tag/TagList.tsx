import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, VFC } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { TAGMAPS_API } from "../../../constant/railsRoute";
import { auth } from "../../../firebase";
import { useSingleArticle } from "../../../hooks/fetch/useSingleArticle";
import { AuthContext } from "../../../providers/AuthProvider";

const TagList: VFC = () => {
  const { data, mutate } = useSingleArticle();
  const tagRef = useRef<HTMLInputElement>(null);
  const { articleId } = useParams<{ articleId: string }>();
  const { currentUser } = useContext(AuthContext);

  const addTag = () => {
    if (tagRef.current?.value === undefined) return;
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        method: "POST",
        headers: { Authorization: token },
        url: TAGMAPS_API(articleId),
        data: { name: tagRef.current?.value, article_id: articleId },
      })
        .then(() => {
          mutate();
        })
        .catch((error) => {});
    });
  };

  const removeTag = (tagId: number) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        method: "DELETE",
        headers: { Authorization: token },
        url: TAGMAPS_API(articleId),
        data: { tag_id: tagId, article_id: articleId },
      })
        .then(() => {
          mutate();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Box mb={5} bgColor="white" borderRadius="2xl" px={5} py={2}>
        <Text py={2} w="100%" justifySelf="center" textAlign="center">
          Tag
        </Text>
        <Divider colorScheme="teal" />
        <VStack py={5} w="100%" align="flex-start">
          {data?.article.tags?.map((tag) => (
            <Tag
              variant="solid"
              size="md"
              borderRadius="full"
              colorScheme="teal"
              key={tag.id}
            >
              <TagLabel>{tag.name}</TagLabel>
              {data.article.user.uid === currentUser?.uid && (
                <TagCloseButton onClick={() => removeTag(tag.id)} />
              )}
            </Tag>
          ))}
        </VStack>
        {data?.article.user.uid === currentUser?.uid && (
          <InputGroup>
            <Input
              variant="flushed"
              placeholder="タグ(10文字まで)"
              ref={tagRef}
            />
            <InputRightElement>
              <Button variant="link" size="sm" onClick={addTag}>
                +
              </Button>
            </InputRightElement>
          </InputGroup>
        )}
      </Box>
    </>
  );
};

export default TagList;

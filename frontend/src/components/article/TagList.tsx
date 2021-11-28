import {
  Button,
  ButtonGroup,
  CloseButton,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, VFC } from "react";
import { useParams } from "react-router-dom";
import { TAGMAPS_API } from "../../constant/railsRoute";
import { auth } from "../../firebase";
import { useSingleArticle } from "../../hooks/fetch/useSingleArticle";

const TagList: VFC = () => {
  const { data, mutate } = useSingleArticle();
  const tagRef = useRef<HTMLInputElement>(null);
  const { articleId } = useParams<{ articleId: string }>();

  const addTag = () => {
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
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const log = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  const removeTag = (tagId: number) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        method: "POST",
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
      <Wrap mb={5} bgColor="white" borderRadius="2xl" p={5}>
        {data?.articles.tags?.map((tag) => (
          <Tag
            variant="solid"
            size="md"
            borderRadius="full"
            colorScheme="teal"
            key={tag.id}
          >
            <TagLabel>{tag.name}</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}
        <InputGroup>
          <Input
            variant="flushed"
            placeholder="タグ(15文字まで)"
            ref={tagRef}
          />
          <InputRightElement>
            <Button variant="link" size="sm" onClick={addTag}>
              +
            </Button>
          </InputRightElement>
        </InputGroup>
      </Wrap>
    </>
  );
};

export default TagList;

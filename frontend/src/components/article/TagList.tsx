import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
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

  const onClick = () => {
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

  return (
    <>
      <Wrap mb={5} bgColor="white" borderRadius="2xl" p={5}>
        {data?.articles.tags?.map((tag) => (
          <WrapItem key={tag.id}>
            <Tag>
              <Button size="xs" variant="link" colorScheme="black">
                {tag.name}
              </Button>
            </Tag>
          </WrapItem>
        ))}
        <InputGroup>
          <Input variant="flushed" placeholder="タグ" ref={tagRef} />
          <InputRightElement>
            <Button variant="link" size="sm" onClick={onClick}>
              +
            </Button>
          </InputRightElement>
        </InputGroup>
      </Wrap>
    </>
  );
};

export default TagList;

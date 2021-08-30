import { Box, Textarea, Button, Spacer, HStack } from "@chakra-ui/react";
import axios from "axios";
import React, { VFC } from "react";
import { useForm } from "react-hook-form";
import { SINGLE_ARTICLE_API } from "../../../constant/railsRoute";
import { auth } from "../../../firebase";
import { useFetchSingleArticle } from "../../../hooks/useFetchSingleArticle";
type Comment = {
  text: string;
};
type Props = {
  articleId: string;
};
const CommentForm: VFC<Props> = (props) => {
  const { articleId } = props;
  const { register, handleSubmit, formState } = useForm<Comment>();
  const { fetchSingleArticle } = useFetchSingleArticle();
  const onSubmit = (data: Comment) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios
        .post(`http://localhost:3000/api/v1/articles/${articleId}/comments`, {
          headers: { Authorization: token },
          text: data.text,
        })
        .then(() => {
          fetchSingleArticle(SINGLE_ARTICLE_API(articleId));
        });
    });
  };

  return (
    <Box mt={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          resize="none"
          bgColor="white"
          row={20}
          boxShadow="sm"
          id="text"
          borderRadius="2xl"
          pr={10}
          {...register("text", {
            required: "内容が記載されていません",
            maxLength: {
              value: 1000,
              message: "コメントは最大1000文字までです",
            },
          })}
        />
        <HStack>
          <Spacer />
          <Button type="submit" isLoading={formState.isSubmitting}>
            投稿
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default CommentForm;

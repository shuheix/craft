import { Container, Input, Textarea, Button } from "@chakra-ui/react";
import React, { VFC } from "react";

type ArticleBodyType = {
  title: string;
  text: string;
  handleTitleValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextareaValue: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  postArticle: () => void;
};
const NewArticleBody: VFC<ArticleBodyType> = (props) => {
  const {
    title,
    text,
    handleTitleValue,
    handleTextareaValue,
    postArticle,
  } = props;
  return (
    <Container px={0} py={20}>
      <Input value={title} onChange={handleTitleValue} minH="50px" mb={5} />
      <Textarea value={text} onChange={handleTextareaValue} rows={25} />
      <Button onClick={postArticle}>投稿</Button>
    </Container>
  );
};

export default NewArticleBody;

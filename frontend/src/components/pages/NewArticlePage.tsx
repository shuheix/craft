import { Button, Container, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { usePageTransition } from "../../hooks/usePageTransition";
import { ArticleApiType, ArticleType } from "../../types/articleType";

const NewArticlePage: VFC = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const { pageTransition } = usePageTransition();
  const handleTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const history = useHistory();

  const handleTextareaValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  const postArticle = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios
        .post<{ articles: ArticleType }>(
          "http://localhost:3000/api/v1/articles",
          {
            headers: { Authorization: token },
            title: title,
            text: text,
          }
        )
        .then((res) => {
          history.push(`/article/${res.data.articles.id}`);
          console.log(res.data.articles.id);
        });
    });
  };

  return (
    <Container>
      <Input value={title} onChange={handleTitleValue} minH="50px" mb={5} />
      <Textarea value={text} onChange={handleTextareaValue} rows={25} />
      <Button onClick={postArticle}>投稿</Button>
    </Container>
  );
};

export default NewArticlePage;

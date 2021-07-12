import { Button, Container, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, VFC } from "react";
import { auth } from "../../firebase";

const NewArticlePage: VFC = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTextareaValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  const postArticle = () => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios.post("http://localhost:3000/api/v1/articles", {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          title: title,
          text: text,
        },
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

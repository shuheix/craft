import React, { VFC } from "react";
import { useCreateArticle } from "../../hooks/useCreateArticle";
import NewArticleBody from "../article/body/NewArticleBody";

const NewArticlePage: VFC = () => {
  const {
    title,
    text,
    handleTitleValue,
    handleTextareaValue,
    postArticle,
  } = useCreateArticle();

  return (
    <NewArticleBody
      title={title}
      text={text}
      handleTitleValue={handleTitleValue}
      handleTextareaValue={handleTextareaValue}
      postArticle={postArticle}
    />
  );
};

export default NewArticlePage;

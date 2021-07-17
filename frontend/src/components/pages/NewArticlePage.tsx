import React, { VFC } from "react";
import { useHandleArticle } from "../../hooks/useHandleArticle";
import ArticleBody from "../article/body/ArticleBody";

const NewArticlePage: VFC = () => {
  const {
    title,
    text,
    handleTitleValue,
    handleTextareaValue,
    postArticle,
  } = useHandleArticle();

  return (
    <ArticleBody
      title={title}
      text={text}
      handleTitleValue={handleTitleValue}
      handleTextareaValue={handleTextareaValue}
      postArticle={postArticle}
    />
  );
};

export default NewArticlePage;

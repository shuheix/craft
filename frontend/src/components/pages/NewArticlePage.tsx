import React, { VFC } from "react";
import { useHandleArticle } from "../../hooks/useHandleArticle";
import NewArticleBody from "../article/body/NewArticleBody";

const NewArticlePage: VFC = () => {
  const {
    title,
    text,
    handleTitleValue,
    handleTextareaValue,
    postArticle,
  } = useHandleArticle();

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

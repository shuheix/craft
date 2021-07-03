import React from "react";
import { useParams } from "react-router-dom";

export const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  return (
    <div>
      <h1>{articleId}ArticlePage</h1>
    </div>
  );
};

export default ArticlePage;

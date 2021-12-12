import { EditIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";
import { VFC } from "react";
import { useHistory } from "react-router-dom";
import { EDIT_ARTICLE_URL } from "../../../constant/appHistory";

type Props = ButtonProps & { articleId: string };

const EditArticleButton: VFC<Props> = (props) => {
  const history = useHistory();
  const { articleId } = props;

  return (
    <>
      <Button
        size="md"
        borderRadius="md"
        p={0}
        bg="white"
        color="blue.500"
        onClick={() => history.push(EDIT_ARTICLE_URL(articleId))}
        {...props}
      >
        <EditIcon />
      </Button>
    </>
  );
};

export default EditArticleButton;

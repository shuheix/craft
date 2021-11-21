import { useState } from "react";
import { useHistory } from "react-router-dom";

export const useSearch = () => {
  const [inputValue, setInputvalue] = useState("");
  const history = useHistory();

  const searchArticle = () => {
    if (inputValue === "") return;
    history.push(`/articles/search?title=${inputValue}`);
  };

  const pressEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue !== "") {
      history.push(`/articles/search?title=${inputValue}`);
    }
  };

  const inputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputvalue(event.target.value);
  };
  return { searchArticle, pressEnterKey, inputData, inputValue };
};

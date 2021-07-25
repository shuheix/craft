import { Button } from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = {
  goHome: () => void;
};

const AppLogo: VFC<Props> = (props) => {
  const { goHome } = props;
  return (
    <div>
      <Button onClick={goHome}>ロゴ</Button>
    </div>
  );
};

export default AppLogo;

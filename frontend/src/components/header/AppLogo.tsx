import React, { VFC } from "react";
import { Image } from "@chakra-ui/react";

import logo from "../../asset/logo.png";

type Props = {
  goHome: () => void;
};

const AppLogo: VFC<Props> = (props) => {
  const { goHome } = props;
  return (
    <div>
      <Image
        src={logo}
        boxSize="50px"
        onClick={goHome}
        _hover={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default AppLogo;

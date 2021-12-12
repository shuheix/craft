import { Avatar, AvatarProps } from "@chakra-ui/react";
import React, { VFC } from "react";

const UserAvatar: VFC<AvatarProps> = (props) => {
  return (
    <>
      <Avatar {...props} />
    </>
  );
};

export default UserAvatar;

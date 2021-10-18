import { Image } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/fetchAPI/useUser";

const UserAvatar: VFC = () => {
  const { uid } = useParams<{ uid: string }>();
  const { data, isLoading, isError } = useUser(uid);

  return (
    <div>
      <Image src={data?.user.avatar.url} />
    </div>
  );
};

export default UserAvatar;

import { Avatar, AvatarProps, Spinner } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useUser } from "../../hooks/fetch/useUser";

const UserAvatar: VFC<AvatarProps> = (props) => {
  const { data, isLoading, isError } = useUser();

  if (isLoading) return <Spinner />;
  if (isError) return <p>error!</p>;

  return (
    <>
      {data?.user.avatar.url ? (
        <Avatar src={data?.user.avatar.url} {...props} />
      ) : (
        <Avatar {...props} />
      )}
    </>
  );
};

export default UserAvatar;

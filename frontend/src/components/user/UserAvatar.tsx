import { Avatar, Spinner } from "@chakra-ui/react";
import React, { VFC } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/fetch/useUser";

type AvatarSize = {
  size?:
    | (string & {})
    | "2xl"
    | "2xs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "full"
    | undefined;
};

const UserAvatar: VFC<AvatarSize> = (props) => {
  const { size } = props;
  const { uid } = useParams<{ uid: string }>();
  const { data, isLoading, isError } = useUser(uid);

  if (isLoading) return <Spinner />;
  if (isError) return <p>error!</p>;

  return (
    <>
      {data?.user.avatar.url ? (
        <Avatar src={data?.user.avatar.url} size={size} />
      ) : (
        <Avatar size={size} />
      )}
    </>
  );
};

export default UserAvatar;

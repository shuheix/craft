import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase";
import { useUser } from "../../hooks/fetchAPI/useUser";
import AvatarModal from "../user/AvatarModal";
import UserAvatar from "../user/UserAvatar";

const UserEditPage = () => {
  const [file, setFile] = useState<File>();
  const { uid } = useParams<{ uid: string }>();
  const { mutate } = useUser(uid);

  const post = () => {
    const avatar = new FormData();
    if (typeof file === "undefined") return;
    avatar.append("avatar", file);
    auth.currentUser?.getIdToken(true).then((token) => {
      axios({
        url: `http://localhost:3000/api/v1/users/${uid}/avatar`,
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
        data: avatar,
      }).then((res) => {
        mutate();
      });
    });
  };

  const getFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files && setFile(event.target.files[0]);
  };

  return (
    <div>
      <form action="">
        <input type="file" onChange={getFile} />
        <Button onClick={post}>ボタン</Button>
        <UserAvatar />
        <AvatarModal />
      </form>
    </div>
  );
};

export default UserEditPage;

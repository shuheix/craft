import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

type Inputs = {
  avatar: File;
};

const UserEditPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (avatar: File) => {
    auth.currentUser?.getIdToken(true).then((token) => {
      axios.post(
        `http://localhost:3000/api/v1/users/${currentUser?.uid}/avatar`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
          avatar,
        }
      );
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" id="avatar" {...register("avatar")} />
        <Button type="submit">Sbumit</Button>
      </form>
    </>
  );
};

export default UserEditPage;

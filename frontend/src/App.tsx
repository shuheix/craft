import { VFC } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";

const App: VFC = () => {
  type UserType = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };

  type UsersResponseType = {
    users: UserType[];
  };

  const url: string = "http://localhost:3000/api/v1/users";
  const [userList, setUserList] = useState<UserType[]>([]);
  const fetchAllUsers = () => {
    axios.get<UsersResponseType>(url).then((res) => {
      // console.log(res.data.users);
      setUserList(res.data.users);
    });
  };

  return (
    <div>
      <button onClick={fetchAllUsers}>データ取得</button>
      {userList.map((user) => (
        <p>{user.id}</p>
      ))}
    </div>
  );
};

export default App;

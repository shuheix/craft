import axios from 'axios';
import React, { useEffect, useState, VFC } from 'react';
import { ListType } from '../../types/list/listType';

import List from './List';

const Lists: VFC = () => {
  const [list, setList] = useState<ListType[]>([]);

  const fetchAllUsers = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        setList(res.data);
      })
      .catch(() => {
        //
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      {list.map((listdata) => (
        <List id={listdata.id} title={listdata.title} />
      ))}
    </div>
  );
};

export default Lists;

import React, { VFC } from 'react';

import { ListType } from 'types/List/listType';

const List: VFC<ListType> = ({ id, title }) => (
  <div>
    <p>{id}</p>
    <p>{title}</p>
  </div>
);

export default List;

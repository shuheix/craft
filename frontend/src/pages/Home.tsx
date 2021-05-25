import React, { VFC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

type HomeProps = unknown & RouteComponentProps<{ companyId: string }>;

const Home: VFC<HomeProps> = () => (
  <div>
    <h1>hello, Home</h1>
  </div>
);

export default Home;

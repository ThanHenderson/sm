import React from 'react';
import type { NextPage } from 'next';
import { Row } from 'react-bootstrap';
import Layout from '../layout/Layout';

const Home: NextPage = () => (
  <Layout>
    <Row>
      <h1>Welcome to my application</h1>
    </Row>
  </Layout>
);

export default Home;

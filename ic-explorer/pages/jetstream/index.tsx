import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import type { NextPage } from 'next';
import Link from 'next/link';
import SimpleLayout from '../../layout/Layout';
import serverSide, { DataProps } from '../../utils/serverside';
import { getTestLists } from '../../controller';

const JetStream: NextPage<DataProps<Return>> = ({ data, error }) => {
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <SimpleLayout active="JetStream">
      <Row>
        <h1>JetStream Test Statistics</h1>
      </Row>
      <Row>
        <h4>Tests</h4>
      </Row>
      <Row>
        <Col lg={4}>
          <ListGroup>
            {data.testNames.map((name) => (
              <Link href={`/jetstream/${name}`} key={name}>
                <ListGroup.Item action>
                  {name}
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </SimpleLayout>
  );
};

interface Return {
  testNames: string[];
}

const getServerSideProps = serverSide(async () => {
  const names = await getTestLists();
  return {
    testNames: names,
  };
});

export default JetStream;
export { getServerSideProps };

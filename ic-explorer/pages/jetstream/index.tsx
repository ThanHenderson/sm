import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import type { NextPage } from 'next';
import Link from 'next/link';
import SimpleLayout from '../../layout/Layout';
import clientPromise from '../../lib/mongodb';
import { SSRReturn, DataProps } from '../../lib/dataProps';

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

const getServerSideProps = async (): Promise<SSRReturn<Return>> => {
  try {
    const client = await clientPromise;
    const db = client.db('ir');
    const collections = await db.listCollections({ name: { $regex: '^jetstream' } }).toArray();
    // FIXME unsafe code
    const dupNames = collections.map(({ name }) => name.split('.')[1]);
    const names = [...new Set(dupNames)];

    return {
      props: {
        data: {
          testNames: names,
        },
        error: null,
      },
    };
  } catch (err: any) {
    return { props: { data: null, error: err } };
  }
};

export default JetStream;
export { getServerSideProps };

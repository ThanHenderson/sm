import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Row, Col } from 'react-bootstrap';
import clientPromise from '../lib/mongodb';
import { DataProps, SSRReturn } from '../lib/dataProps';
import ICCountChart from '../components/ICCountChart';
import SimpleLayout from '../layout/Layout';
import DetailTable from '../components/DetailTable';
import ICStateCharts from '../components/ICStateChart';

const Stat: NextPage<DataProps<Return>> = ({ data, error }) => {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <SimpleLayout active="Statistics">
      <Row>
        <h1>IC Statistics</h1>
      </Row>
      <Row>
        <Col lg>
          <h4>Element count</h4>
          {render && <ICCountChart data={data.operations} />}
          <DetailTable data={data.operations} />
        </Col>
        <Col lg>
          <h4>Cache count</h4>
          {render && <ICCountChart data={data.cacheIR.slice(0, 9)} />}
          <DetailTable data={data.cacheIR} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Cache states over time</h4>
          {render && <ICStateCharts data={data.cacheIRTimeseries} />}
        </Col>
      </Row>
    </SimpleLayout>
  );
};

interface CountOfOperations {
  _id: string;
  count: number;
}

interface CountOfCacheIR {
  _id: string;
  count: number;
}

interface CountOfCacheIRTimeseries {
  group: number;
  count0: number;
  count1: number;
  count2: number;
}

interface Return {
  operations: CountOfOperations[];
  cacheIR: CountOfCacheIR[];
  cacheIRTimeseries: CountOfCacheIRTimeseries[];
}

const getServerSideProps = async (): Promise<SSRReturn<Return>> => {
  try {
    const client = await clientPromise;
    const db = client.db('ir');
    const collection = db.collection<CountOfOperations>('countOfOperations');
    const operations = (await collection
      .find({})
      .toArray()) as CountOfOperations[];
    const cacheIR = (await db
      .collection<CountOfCacheIR>('countOfCacheIR')
      .find({})
      .toArray()) as CountOfCacheIR[];
    const cacheIRTimeseries = (await db
      .collection<CountOfCacheIRTimeseries>('220527-timeseries-using-when')
      .find({})
      .toArray()) as CountOfCacheIRTimeseries[];

    return {
      props: {
        data: {
          operations,
          cacheIR,
          cacheIRTimeseries,
        },
        error: null,
      },
    };
  } catch (err: any) {
    return { props: { data: null, error: err } };
  }
};

export default Stat;
export { getServerSideProps };

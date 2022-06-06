import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Row, Col } from 'react-bootstrap';
import ICCountChart from '../components/ICCountChart';
import SimpleLayout from '../layout/Layout';
import DetailTable from '../components/DetailTable';
import ICStateCharts from '../components/ICStateChart';
import serverSide, { DataProps } from '../utils/serverside';
import { getCountOfCacheIR, getCountOfCacheIRTimeseries, getCountOfOperations } from '../controller';
import { CountOfOperations, CountOfCacheIR, CountOfCacheIRTimeseries } from '../lib/shapes';

export const getServerSideProps = serverSide<Return>(async () => ({
  operations: await getCountOfOperations(),
  cacheIR: await getCountOfCacheIR(),
  cacheIRTimeseries: await getCountOfCacheIRTimeseries(),
}));

type Return = {
  operations: CountOfOperations[];
  cacheIR: CountOfCacheIR[];
  cacheIRTimeseries: CountOfCacheIRTimeseries[];
};

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
export default Stat;

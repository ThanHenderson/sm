import React from 'react';
import type { NextPage } from 'next';
import {
  Button, Col, ListGroup, Row, Spinner,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { BsArrowClockwise } from 'react-icons/bs';
import SimpleLayout from '../../layout/Layout';
import { trpc } from '../../utils/trpc';
import ICStateChart from '../../components/ICStateChart';
import { testNames } from '../../lib/shapes';
import RunTestModal from '../../components/RunTestModal';

const JetStreamTest: NextPage = () => {
  const router = useRouter();
  const test = router.query.test as z.infer<typeof testNames>;
  const [selected, setSelected] = React.useState<null | string>(null);
  const [showTestModal, setShowTestModal] = React.useState(false);

  if (!testNames.safeParse(test).success) return <p>Error: test name does not exist</p>;

  const isSelected = (name: string) => selected === name;

  const toggleSelected = (name: string) => {
    if (isSelected(name)) {
      setSelected(null);
    } else {
      setSelected(name);
    }
  };

  const { data, isLoading, isSuccess } = trpc.useQuery(['gettestruns', { jetstreamTest: test }]);

  const { data: dataGraph, isLoading: isLoadingGraph } = trpc.useQuery(['jetstreamstats',
    { name: test, timestamp: selected || 'latest' }], { staleTime: Infinity });

  return (
    <SimpleLayout active="JetStream">
      <Row>
        <Col>
          <h1>
            Test:
            {' '}
            {test}
          </h1>
        </Col>
        <Col lg={4}>
          <Button className="float-lg-end" onClick={() => setShowTestModal(true)}>
            <BsArrowClockwise />
            {' '}
            Run another test
          </Button>
        </Col>
      </Row>
      <Row>
        <h4>Runs</h4>
      </Row>
      <Row>
        <Col lg={4}>
          {isLoading && <Spinner animation="border" />}
          {isSuccess && data && (
          <ListGroup>
            {data.testRuns.map((name) => (
              <ListGroup.Item
                key={name}
                action
                active={isSelected(name)}
                onClick={() => toggleSelected(name)}
              >
                {name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          )}
        </Col>
        {(selected) && (
          <Col>
            <ICStateChart data={dataGraph} />
            {isLoadingGraph && <p>Loading...</p>}
          </Col>
        )}
      </Row>
      <RunTestModal testName={test} show={showTestModal} setShow={setShowTestModal} view={false} />
    </SimpleLayout>
  );
};

export default JetStreamTest;

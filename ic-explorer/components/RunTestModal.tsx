import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import {
  Button, Modal, Row, Spinner,
} from 'react-bootstrap';
import { BsPlay, BsX } from 'react-icons/bs';
import { z } from 'zod';
import { testNames } from '../lib/shapes';
import { trpc } from '../utils/trpc';

type TestNames = z.infer<typeof testNames>;

type Props = {
  testName: TestNames,
  show: boolean,
  setShow: (show: boolean) => void,
  view: boolean
};

interface SuccessOutput {
  output: string,
  error: string
}

const Success: NextPage<SuccessOutput> = ({ output, error }) => (
  <Row>
    <p>
      Success!:
    </p>
    <h4>
      stdout
    </h4>
    <pre>
      <code>
        {output}
      </code>
    </pre>
    <h4>
      stderr
    </h4>
    <pre>
      <code>
        {error}
      </code>
    </pre>
  </Row>
);

const RunTestModal: NextPage<Props> = ({
  testName, show, setShow, view,
}) => {
  const utils = trpc.useContext();

  const {
    mutate, isLoading, isIdle, isError, isSuccess, reset, data, variables,
  } = trpc.useMutation('runjetstream', {
    onSuccess: () => {
      utils.invalidateQueries(['gettestruns']);
    },
  });

  const onRun = () => {
    mutate({
      name: testName,
    });
  };

  const onHide = () => {
    setShow(false);
    reset();
  };

  return (
    <Modal show={show} onHide={onHide} backdrop={isLoading ? 'static' : undefined} centered size="xl">
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>Run test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          isIdle
        && (
        <p>
          Are you sure you want to run test
          {' '}
          <strong>{testName}</strong>
          ?
        </p>
        )
        }
        {isLoading && <Spinner animation="border" />}
        {isError && <p>Failed to run test</p>}
        {isSuccess && <Success output={data.output} error={data.error} />}
      </Modal.Body>
      <Modal.Footer>
        {
          isIdle && (
          <>
            <Button type="reset" onClick={() => setShow(false)} variant="secondary">
              <BsX />
              {' '}
              Cancel
            </Button>
            <Button type="submit" onClick={onRun}>
              <BsPlay />
              {' '}
              Run

            </Button>
          </>
          )
        }
        {isLoading && <Button disabled>Running...</Button>}
        {!isLoading && !isIdle && view
        && (
        <Link href={`/jetstream/${variables?.name}`}>
          <Button>View results</Button>
        </Link>
        )}
        {!isLoading && !isIdle
        && <Button onClick={() => setShow(false)}>Close</Button>}

      </Modal.Footer>
    </Modal>
  );
};

export default RunTestModal;

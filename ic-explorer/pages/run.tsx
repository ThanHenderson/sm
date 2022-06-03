/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Row, Form, Button } from 'react-bootstrap';
import { z } from 'zod';
import SimpleLayout from '../layout/Layout';
import { testNames } from '../lib/shapes';
import RunTestModal from '../components/RunTestModal';

const formShape = z.object({
  name: testNames,
});

type FormShape = z.infer<typeof formShape>;

interface FormProps {
  onRun: (data: FormShape) => void;
}

const FormItem: NextPage<FormProps> = ({ onRun }) => {
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<FormShape>({
    resolver: zodResolver(formShape),
  });

  const onSubmit : SubmitHandler<FormShape> = (data) => {
    onRun(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row lg={4}>

        <Form.Group>
          <Form.Label>Test name</Form.Label>
          <Form.Select {...register('name', { required: 'Type of test must be selected' })} isInvalid={!!errors.name} defaultValue="default">
            <option disabled value="default"> -- select an option -- </option>
            {testNames.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Form.Select>
          {errors.name && <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>}
        </Form.Group>
      </Row>

      <Row>

        <Form.Group>
          <Button variant="primary" type="submit">
            Run
          </Button>
          <Button variant="secondary" type="reset" onClick={() => reset()}>
            Reset
          </Button>
        </Form.Group>
      </Row>

    </Form>
  );
};

const Run: NextPage = () => {
  const [show, setShow] = React.useState(false);
  const [testName, setTestName] = React.useState<z.infer<typeof testNames>>();

  const onRun = (data: FormShape) => {
    setTestName(data.name);
    setShow(true);
  };

  return (
    <SimpleLayout active="Run">

      <Row>
        <h1>Run Test</h1>
      </Row>

      <FormItem onRun={onRun} />
      {testName
      && <RunTestModal show={show} setShow={setShow} view testName={testName} />}

    </SimpleLayout>
  );
};

export default Run;

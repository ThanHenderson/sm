import React from 'react';
import { Accordion, Table } from 'react-bootstrap';

type DetailTableProps = {
  data: { _id: string, count: number }[]
};

const DetailTable = ({ data } : DetailTableProps) => (
  <Accordion>
    <Accordion.Item eventKey="0">
      <Accordion.Header>Detailed Information</Accordion.Header>
      <Accordion.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ _id, count }) => (
              <tr key={_id.toString()}>
                <td>{_id.toString()}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
);

export default DetailTable;

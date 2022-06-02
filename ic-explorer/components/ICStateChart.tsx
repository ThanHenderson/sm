import React, { useState } from 'react';
import { NextPage } from 'next';
import { Nav } from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, Tooltip, YAxis, Legend, ResponsiveContainer,
} from 'recharts';

type Props = {
  data?: {
    group: number,
    count0: number,
    count1: number,
    count2: number,
  }[]
};

const ICStateChart: NextPage<Props> = ({ data }) => {
    type TabKey = 'raw' | 'normalized';

    const [normalize, setNormalize] = useState<TabKey>('raw');

    const getOffset = (key: TabKey) => {
      switch (key) {
        case 'normalized': return 'expand';
        case 'raw': return 'none';
        default: return 'none';
      }
    };

    return (
      <>
        <Nav activeKey={normalize} variant="tabs" fill>
          <Nav.Item onClick={() => setNormalize('raw')}>
            <Nav.Link eventKey="raw">
              Raw
            </Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => setNormalize('normalized')}>
            <Nav.Link eventKey="normalized">

              Normalized
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <ResponsiveContainer height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5, bottom: 5, left: 5, right: 5,
            }}
            stackOffset={getOffset(normalize)}
          >
            <XAxis dataKey="_id" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count0" stackId="a" fill="#8884d8" name="specialized" />
            <Bar dataKey="count1" stackId="a" fill="#4ec76e" name="megamorphic" />
            <Bar dataKey="count2" stackId="a" fill="#FF5733" name="general" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>

      </>
    );
};

export default ICStateChart;

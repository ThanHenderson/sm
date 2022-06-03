import React from 'react';
import { NextPage } from 'next';
import {
  BarChart, Bar, XAxis, Tooltip, YAxis, ResponsiveContainer,
} from 'recharts';

type Props = {
  data: {
    _id: string,
    count: number
  }[]
};

const ICCountChart: NextPage<Props> = ({ data }) => (
  <ResponsiveContainer height={400}>
    <BarChart
      data={data}
      margin={{
        top: 5, bottom: 5, left: 5, right: 5,
      }}
    >
      <XAxis dataKey="_id" hide />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default ICCountChart;

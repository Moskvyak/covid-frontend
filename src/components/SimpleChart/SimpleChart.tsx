import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

import { ResponsiveContainer } from '../ResponsiveContainer/ResponsiveContainer';
interface Props {
  data: object[];
  selectedCountries: any[];
}

const SimpleChart: React.FC<Props> = (props: Props) => {
  return (
    <ResponsiveContainer >

    <LineChart
      data={props.data}
      margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
      >
      {props.selectedCountries.map((selected: any) => {
        return (
          <Line
          key={selected.id}
          type="monotone"
          dataKey={selected.name}
          />
          );
        })}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="id" />
      <YAxis />
      <Tooltip />
    </LineChart>
    </ResponsiveContainer>
  );
};

export { SimpleChart };

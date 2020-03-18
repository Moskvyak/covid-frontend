import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

interface Props {
  data: object[];
  selectedCountries: any[];
}

const SimpleChart: React.FC<Props> = (props: Props) => {
  return (
    <LineChart
      width={300}
      height={300}
      data={props.data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      {props.selectedCountries.map((selected: any) => {
        return (
          <Line
            key={selected.c}
            type="monotone"
            dataKey={selected.c}
            stroke={selected.color}
          />
        );
      })}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export { SimpleChart };

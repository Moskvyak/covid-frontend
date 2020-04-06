import React from 'react';
import { colors } from '../../data';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

import { ResponsiveContainer } from '../ResponsiveContainer/ResponsiveContainer';
interface Props {
  data: object[];
  selectedCountries: any[];
}

const SimpleChart: React.FC<Props> = (props: Props) => {
  return (
    <ResponsiveContainer>
      <LineChart
        data={props.data}
        >
        {props.selectedCountries.map((selected: any, index: number) => {
          return (
            <Line key={selected.id} type="monotone" dataKey={selected.name} stroke={colors[index]} dot={false}/>
          );
        })}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="id" />
        <YAxis />
        <Legend verticalAlign="top" margin={{top: 40}}/>
        <Tooltip wrapperStyle={{zIndex: 1000}} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export { SimpleChart };

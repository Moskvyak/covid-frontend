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
class CustomizedXAxisTick extends React.PureComponent<any, any> {
  render() {
    const { x, y, payload } = this.props;
    return (
      <text
        x={x + 20}
        y={y}
        dy={16}
        textAnchor="end"
        fill="#666"
        fontSize="12px"
      >
        {payload.value}
      </text>
    );
  }
}

function getThousandsGroupRegex(thousandsGroupStyle: string) {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;

    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g;

    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}

function applyThousandSeparator(str: string, thousandSeparator: string, thousandsGroupStyle: string) {
  const thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  let index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return str.substring(0, index) + str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator);
}

class CustomizedYAxisTick extends React.PureComponent<any, any> {
  render() {
    const { x, y, payload } = this.props;
    return (
      <text
        x={x}
        y={y - 12}
        dy={16}
        textAnchor="end"
        fill="#666"
        fontSize="12px"
      >
        {applyThousandSeparator(payload.value.toString(), ',', 'thousand')}
      </text>
    );
  }
}
const SimpleChart: React.FC<Props> = (props: Props) => {
  return (
    <ResponsiveContainer>
      <LineChart data={props.data}>
        {props.selectedCountries.map((selected: any, index: number) => {
          return (
            <Line
              key={selected.id}
              type="monotone"
              dataKey={selected.name}
              stroke={colors[index]}
              strokeWidth={2}
              dot={false}
            />
          );
        })}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="id" tick={<CustomizedXAxisTick />}/>
        <YAxis tick={<CustomizedYAxisTick />} />
        <Legend verticalAlign="bottom" iconType="circle" iconSize={5} />
        <Tooltip wrapperStyle={{ zIndex: 1000 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export { SimpleChart };

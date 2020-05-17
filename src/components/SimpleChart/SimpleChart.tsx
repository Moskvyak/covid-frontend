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
import Paper from '@material-ui/core/Paper';
import { applyThousandSeparator } from '../../utils/formatter';
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
        x={x + 16}
        y={y}
        dy={16}
        textAnchor="end"
        fill="#666"
        fontSize="10px"
      >
        {payload.value}
      </text>
    );
  }
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <Paper
        style={{
          padding: 16,
          background: '#f5f5f5'
        }}
      >
        <h3 style={{ marginTop: 0 }}>{`${label}`}</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            alignItems: 'center',
            gap: '8px 8px'
          }}
        >
          {payload.map((item: any) => {
            return (
              <React.Fragment key={item.name}>
                <div
                  style={{
                    color: item.color,
                    fontSize: 12
                  }}
                >
                  <span>
                    {item.name}
                  </span>
                </div>

                <div
                  style={{
                    color: item.color,
                    fontSize: 12,
                    textAlign: 'right'
                  }}
                >
                  <span>
                    {applyThousandSeparator(
                      item.value.toString(),
                      ',',
                      'thousand'
                    )}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </Paper>
    );
  }

  return null;
};

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
        <XAxis dataKey="id" tick={<CustomizedXAxisTick />} />
        <YAxis tick={<CustomizedYAxisTick />} />
        <Legend verticalAlign="bottom" iconType="circle" iconSize={5} />
        <Tooltip wrapperStyle={{ zIndex: 1000 }} content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export { SimpleChart };

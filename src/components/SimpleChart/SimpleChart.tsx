import React, { useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
const data = [
  { day: 1, france: 10, italy: 3 },
  { day: 2, france: 12, italy: 20 },
  { day: 3, france: 12, italy: 62 },
  { day: 4, france: 12, italy: 155 },
  { day: 5, france: 12, italy: 229 },
  { day: 6, france: 14, italy: 322 },
  { day: 7, france: 18, italy: 453 },
  { day: 8, france: 38, italy: 655 },
  { day: 9, france: 57, italy: 888 },
  { day: 10, france: 100, italy: 1128 },
  { day: 11, france: 130, italy: 1694 },
  { day: 12, france: 191, italy: 2036 },
  { day: 13, france: 204, italy: 2502 },
  { day: 14, france: 285, italy: 3089 },
  { day: 15, france: 377, italy: 3858 },
  { day: 16, france: 653, italy: 4636 },
  { day: 17, france: 949, italy: 5883 },
  { day: 18, france: 1126, italy: 7375 },
  { day: 19, france: 1209, italy: 9172 },
  { day: 20, france: 1784, italy: 10149 },
  { day: 21, france: 2281, italy: 12462 },
  { day: 22, france: 2281, italy: 12462 },
  { day: 23, france: 3661, italy: 17660 },
  { day: 24, france: 4469, italy: 21157 },
  { day: 25, france: 4499, italy: 24747 },
  { day: 26, france: 6633, italy: 27980 }
];
const countries: any[] = [
  { c: 'italy', color: '#8884d8' },
  { c: 'france', color: '#ff4f4f' }
];
const SimpleChart: React.FC = () => {
  const [selectedContries, setSelectedContries] = useState([countries[0]]);
  const updateCountry = (country: any) => {
    console.log({ country });
    if (!selectedContries.find((selC: any) => selC.c === country.c)) {
      const updatedCountries = [...selectedContries, country];
      console.log(updatedCountries);
      setSelectedContries(updatedCountries);
    } else {
      const updatedCountries = selectedContries.filter(
        (selC: any) => selC.c !== country.c
      );
      setSelectedContries(updatedCountries);
    }
  };
  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        {selectedContries.map((selected: any, index: number) => {
          console.log({selected});
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
      <div>
        <div>
          {countries.map((country: any) => {
            return (
              <div key={country.c}>
                <div onClick={() => updateCountry(country)}>
                  Select {country.c}
                </div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { SimpleChart };

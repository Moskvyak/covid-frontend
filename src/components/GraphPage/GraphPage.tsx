import React, { useState } from 'react';
import { SimpleChart } from '../SimpleChart';
import Paper from '@material-ui/core/Paper';
import { confirmed, countries } from '../../data';

const GraphPage: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState([countries[0]]);
  const updateCountry = (country: any) => {
    console.log({ country });
    if (!selectedCountries.find((selC: any) => selC.c === country.c)) {
      const updatedCountries = [...selectedCountries, country];
      setSelectedCountries(updatedCountries);
    } else {
      const updatedCountries = selectedCountries.filter(
        (selC: any) => selC.c !== country.c
      );
      setSelectedCountries(updatedCountries);
    }
  };
  return (
    <Paper
      elevation={1}
      style={{
        width: 600,
        height: 300
      }}
    >
      <SimpleChart data={confirmed} selectedCountries={selectedCountries}/>
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
    </Paper>
  );
};

export { GraphPage };

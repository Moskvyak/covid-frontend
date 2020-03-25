import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { SimpleChart } from '../SimpleChart';
import Paper from '@material-ui/core/Paper';
import { confirmed, countries } from '../../data';

const GET_DAYS = gql`
  query Day($locationName: String) {
    Day(where: { Reports: { Location: { name: { _eq: $locationName } } } }) {
      date
      id
      Reports {
        confirmedNew
        confirmedTotal
        deathsNew
        deathsTotal
        recoveredNew
        recoveredTotal
      }
    }
  }
`;
const GraphPage: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState([countries[0]]);
  const [daysData, setDaysData] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_DAYS, {
    variables: {
      locationName: "Italy"
    }
  });
  if (loading) return <p>Loading ...</p>;

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
  console.log({ data });
  return (
    <Paper
      elevation={3}
      style={{
        width: 600,
        height: 300
      }}
    >
      <SimpleChart data={confirmed} selectedCountries={selectedCountries} />
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
      <button onClick={() => refetch({
        locationName: "Australia"
      })}>Get Data</button>
    </Paper>
  );
};

export { GraphPage };

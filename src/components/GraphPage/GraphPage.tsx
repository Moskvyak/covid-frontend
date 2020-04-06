import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CasesGraphs } from '../CasesGraphs';

import { confirmed } from '../../data';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      background: '#eee'
    },
    appBar: {
      width: '100%',
      padding: 20
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    }
  })
);

const GET_COUNTRIES = gql`
  query MyQuery {
    Location(
      where: { locationTypeId: { _eq: 1 } }
      order_by: { Reports_aggregate: { max: { confirmedTotal: desc } } }
    ) {
      id
      name
      Reports(limit: 1, order_by: { confirmedTotal: desc_nulls_last }) {
        confirmedTotal
        recoveredTotal
        deathsTotal
      }
    }
  }
`;

const GET_CONTRIES_REPORTS = gql`
  query MyQuery($locationName: [String!]) {
    Day {
      date
      id
      Reports(
        where: {
          Location: { name: { _in: $locationName }, locationTypeId: { _eq: 1 } }
        }
      ) {
        confirmedTotal
        recoveredTotal
        deathsTotal
        Location {
          name
        }
      }
    }
  }
`;
const GraphPage: React.FC = () => {
  let countries: any[] = [];
  const [selectedCountries, setSelectedCountries] = useState(countries);
  const classes = useStyles();
  const { loading: getCountriessLoading, data: getCountriesData } = useQuery(
    GET_COUNTRIES
  );

  const {
    loading: getCountriesReportsLoading,
    data: getCountriesReportsData,
    refetch: refetchCountriesReports
  } = useQuery(GET_CONTRIES_REPORTS, {
    variables: {
      locationName: ['Italy']
    }
  });

  if (getCountriessLoading) return <p>Loading ...</p>;

  const updateCountry = (country: any) => {
    if (!selectedCountries.find((selC: any) => selC.id === country.id)) {
      const updatedCountries = [...selectedCountries, country];
      setSelectedCountries(updatedCountries);
      refetchCountriesReports({
        locationName: updatedCountries.map((country: any) => country.name)
      });
    } else {
      const updatedCountries = selectedCountries.filter(
        (selC: any) => selC.id !== country.id
      );
      setSelectedCountries(updatedCountries);
      refetchCountriesReports({
        locationName: updatedCountries.map((country: any) => country.name)
      });
    }
  };
  console.log({ getCountriesReportsLoading, getCountriesReportsData });

  let mappedData = confirmed;
  if (getCountriesReportsData && getCountriesReportsData.Day) {
    mappedData = getCountriesReportsData.Day.map((dayItem: any) => {
      const reports: any = {};
      dayItem.Reports.forEach((report: any) => {
        const key = report.Location.name;
        const value = report.confirmedTotal;
        reports[key] = value;
      });
      const newItem = {
        id: `${new Date(dayItem.date).getDate()}/${new Date(
          dayItem.date
        ).getMonth()}`,
        ...reports
      };
      return newItem;
    });
  }
  if (getCountriesData && getCountriesData.Location) {
    countries = getCountriesData.Location.filter(
      (location: any) => location.Reports.length
    );
  }
  console.log({ mappedData, selectedCountries });
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        {countries.map((country: any) => {
          const isSelected = !!selectedCountries.find(
            (selC: any) => selC.id === country.id
          );
          return (
            <div key={country.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={() => updateCountry(country)}
                    value={country.id}
                    color="primary"
                  />
                }
                label={`${country.name} - ${country.Reports[0].confirmedTotal}`}
              />
            </div>
          );
        })}
      </Drawer>
      <div className={classes.appBar}>
        {getCountriesReportsData &&
          getCountriesReportsData.Day &&
          <CasesGraphs
            selectedCountries={selectedCountries}
            countriesData={getCountriesReportsData}
          />}
      </div>
    </div>
  );
};

export { GraphPage };

import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';

import { ReportsBlock } from '../ReportsBlock';
import { CountryListItem } from '../CountryListItem';
import { CountryListHeader } from '../CountryListHeader';
import { GET_COUNTRIES } from '../../graphql/queries';

const drawerWidth = 380;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullHeight: {
      height: '100%'
    },
    root: {
      display: 'flex',
      height: '100%'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      height: 'calc(100% - 40px)',
      overflowY: 'scroll',
      '&::-webkit-scrollbar':{
        width: '2px'
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1'
      },
       
      /* Handle */
      '&::-webkit-scrollbar-thumb': {
        background: '#888'
      },
      
      /* Handle on hover */
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555'
      }
      // '&::-webkit-scrollbar-track': {
      //   '-webkit-box-shadow': 'inset 0 0 1px rgba(0,0,0,0.3)'
      // },
    },
    listItem: {
      width: '100%',
      margin: 0
    },
    loading: {
      padding: 20
    },
    '@keyframes appear': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    fadeIn: {
      animationName: '$appear',
      animationDuration: '1s',
      animationTimingFunction: 'linear'
    },
    isEven: {
      background: 'rgba(227,242,253, 0.3)'
    }
  })
);

const GraphPage: React.FC = () => {
  let countries: any[] = [];
  const [selectedCountries, setSelectedCountries] = useState(countries);
  const classes = useStyles();
  const { data: getCountriesData } = useQuery(GET_COUNTRIES, {
    onCompleted: (data: any) => {
      setSelectedCountries(data.Location.slice(0, 3));
    }
  });

  const updateCountry = (country: any) => {
    if (!selectedCountries.find((selC: any) => selC.id === country.id)) {
      const updatedCountries = [...selectedCountries, country];
      setSelectedCountries(updatedCountries);
    } else {
      const updatedCountries = selectedCountries.filter(
        (selC: any) => selC.id !== country.id
      );
      setSelectedCountries(updatedCountries);
    }
  };

  if (getCountriesData && getCountriesData.Location) {
    countries = getCountriesData.Location.filter(
      (location: any) => location.Reports.length
    );
  }

  return (
    <Container maxWidth="lg" className={classes.fullHeight}>
      <div className={classes.root}>
        <Paper className={`${classes.fullHeight}`}>
          <CountryListHeader />
          <div className={`${classes.drawer}`}>
          {countries.length > 0 &&
            <div className={classes.fadeIn}>
              {countries.map((country: any, index: number) => {
                const isSelected = !!selectedCountries.find(
                  (selC: any) => selC.id === country.id
                );
                const isEven = index % 2 === 1;
                const rootClassName = isEven
                  ? `${classes.listItem} ${classes.isEven}`
                  : classes.listItem;
                return (
                  <div key={country.id}>
                    <FormControlLabel
                      className={rootClassName}
                      control={
                        <Checkbox
                          checked={isSelected}
                          onChange={() => updateCountry(country)}
                          value={country.id}
                          color="primary"
                        />
                      }
                      label={
                        <CountryListItem
                          name={country.name}
                          confirmed={country.Reports[0].confirmedTotal}
                          recovered={country.Reports[0].recoveredTotal}
                          deaths={country.Reports[0].deathsTotal}
                        />
                      }
                    />
                  </div>
                );
              })}
            </div>}
          {!countries.length &&
            <div className={classes.loading}>
              <p>Loading locations...</p>
              <LinearProgress />
            </div>}
            </div>
        </Paper>


        <ReportsBlock selectedCountries={selectedCountries} />

      </div>
    </Container>
  );
};

export { GraphPage };

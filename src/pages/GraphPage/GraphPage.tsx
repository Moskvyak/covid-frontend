import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GraphModeContext } from './GraphModeContext';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import { ReportsBlock } from '../../components/ReportsBlock';
import { ListOfCountries } from '../../components/ListOfCountries';
import { SelectedCountries } from '../../components/SelectedCountries';
import { WorldStatsBlock } from '../../components/WorldStatsBlock';
import { GET_COUNTRIES } from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      paddingLeft: 16,
      paddingRight: 16,
      height: '100%'
    },
    mainSection: {
      flex: 1,
      [theme.breakpoints.up('lg')]: {
        display: 'flex',
        paddingRight: 32,
        flexDirection: 'column',
        height: '100%',
      }
    },
    rightSection: {
      flex: '0 0 auto',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    totalWrapper: {
      width: '100%',
      flex: 1,
      marginBottom: 20,
      [theme.breakpoints.up('lg')]: {
        flex: '0 0 100px',
        width: '100%',
      }
    },
    countriesWrapper: {
      flex: '0 0 264px',
      width: '100%',
      marginBottom: 20
    },
    graphsWrapper: {
      flex: 1,
      width: '100%',
      height: 300
    },
    scroll: {
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
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
    }
  })
);

const GraphPage: React.FC = () => {
  let countries: any[] = [];
  const [selectedCountries, setSelectedCountries] = useState(countries);
  const [graphMode, setGraphMode] = useState('confirmed');
  const classes = useStyles();
  const { data: getCountriesData } = useQuery(GET_COUNTRIES, {
    onCompleted: (data: any) => {
      const selectedCountries = data.Day[0].Reports
        .slice(0, 3)
        .map((report: any) => {
          const country = {
            name: report.Location.name,
            id: report.Location.id,
            ...report
          };
          return country;
        });
      setSelectedCountries(selectedCountries);
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
  const updateMode = (mode: string) => {
    setGraphMode(mode);
  };

  if (getCountriesData && getCountriesData.Day) {
    countries = getCountriesData.Day[0].Reports.map((report: any) => {
      const country = {
        name: report.Location.name,
        id: report.Location.id,
        ...report
      };
      return country;
    });
  }

  return (
    <GraphModeContext.Provider value={{ mode: graphMode, updateMode }}>
      <div className={classes.root}>
        <div className={classes.mainSection}>
          <div className={classes.totalWrapper}>
            <WorldStatsBlock />
          </div>
          <div className={`${classes.graphsWrapper} ${classes.scroll}`}>
            <ReportsBlock selectedCountries={selectedCountries} />
          </div>
        </div>
        <Hidden xsDown>
          <div className={classes.rightSection}>
            <div className={`${classes.countriesWrapper}  ${classes.scroll}`}>
              <SelectedCountries
                countries={countries}
                selectedCountries={selectedCountries}
                updateCountry={updateCountry}
              />
            </div>
            <div className={`${classes.graphsWrapper} ${classes.scroll}`}>
              <ListOfCountries
                countries={countries}
                selectedCountries={selectedCountries}
                updateCountry={updateCountry}
              />
            </div>
          </div>
        </Hidden>
      </div>
    </GraphModeContext.Provider>
  );
};

export { GraphPage };

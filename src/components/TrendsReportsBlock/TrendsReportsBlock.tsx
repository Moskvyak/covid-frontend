import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { TrendsGraphs } from '../TrendsGraphs';

import { GET_COUNTRIES_ALL_REPORTS_BY_IDS } from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%'
    },
    container: {
      height: '100%',
      padding: 8,
      [theme.breakpoints.up('sm')]: {
        padding: 24,
        paddingBottom: 0
      }
    },
    '@keyframes appear': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    fadeIn: {
      height: '100%',
      animationName: '$appear',
      animationDuration: '1s',
      animationTimingFunction: 'linear'
    }
  })
);

interface Props {
  selectedCountries: any[];
  openFilters(): void;
}

const TrendsReportsBlock: React.FC<Props> = (props: Props) => {
  const { selectedCountries, openFilters } = props;

  const classes = useStyles();

  const { data: getCountriesReportsData } = useQuery(GET_COUNTRIES_ALL_REPORTS_BY_IDS, {
    variables: {
      locationIds: selectedCountries.map((country: any) => country.id)
    }
  });

  return (
    <div className={classes.root}>
      <Paper className={`${classes.container}`} elevation={1}>
        {getCountriesReportsData &&
          getCountriesReportsData.Location && getCountriesReportsData.Location.length > 0 &&
          <div className={classes.fadeIn}>
            <TrendsGraphs
              openFilters={openFilters}
              selectedCountries={selectedCountries}
              countriesData={getCountriesReportsData}
            />
          </div>}
      </Paper>
    </div>
  );
};

export { TrendsReportsBlock };

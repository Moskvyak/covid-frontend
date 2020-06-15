import React from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { DateRange } from '@material-ui/pickers';
import { ChartRaceGraphs } from '../ChartRaceGraphs';

import { GET_CONTRIES_REPORTS } from '../../graphql/queries';

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

const ChartRaceReportsBlock: React.FC<Props> = (props: Props) => {
  const { selectedCountries, openFilters } = props;

  const [selectedRange, handleDateChange] = React.useState<DateRange>([
    null,
    null
  ]);
  const classes = useStyles();

  const { data: getCountriesReportsData } = useQuery(GET_CONTRIES_REPORTS, {
    variables: {
      locationName: selectedCountries.map((country: any) => country.name),
      startDate: selectedRange[0],
      endDate: selectedRange[1]
    }
  });

  return (
    <div className={classes.root}>
      <Paper className={`${classes.container}`} elevation={1}>
        {getCountriesReportsData &&
          getCountriesReportsData.Day &&
          <div className={classes.fadeIn}>
            <ChartRaceGraphs
              openFilters={openFilters}
              handleDateChange={handleDateChange}
              selectedRange={selectedRange}
              selectedCountries={selectedCountries}
              countriesData={getCountriesReportsData}
            />
          </div>}
      </Paper>
    </div>
  );
};

export { ChartRaceReportsBlock };

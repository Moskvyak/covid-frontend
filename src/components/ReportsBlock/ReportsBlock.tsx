import React from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { DateRange } from '@material-ui/pickers';
import { CasesGraphs } from '../CasesGraphs';

import { GET_CONTRIES_REPORTS } from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100% - 2px)'
    },
    container: {
      height: '100%',
      padding: 24,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    },
    datePickerWrapper: {
      position: 'absolute',
      left: '50%',
      top: 24,
      transform: 'translate(-50%, 0)',
      zIndex: 100
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
}

const ReportsBlock: React.FC<Props> = (props: Props) => {
  const { selectedCountries } = props;
  const today = moment();
  const monthAgo = today.subtract(1, 'month');
  const [selectedRange, handleDateChange] = React.useState<DateRange>([
    monthAgo,
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
            <CasesGraphs
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

export { ReportsBlock };

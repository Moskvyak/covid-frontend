import React, { useState } from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import { DatePicker } from '@material-ui/pickers';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

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
      display: 'flex',
      flexDirection: 'column'
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
  console.log(moment().format());
  const weekBefore = today.subtract(7, 'days').format('YYYY-MM-DD');
  console.log({ weekBefore });
  const [startDate, setStartDate]: any = useState(weekBefore);
  const classes = useStyles();

  const { data: getCountriesReportsData } = useQuery(GET_CONTRIES_REPORTS, {
    variables: {
      locationName: selectedCountries.map((country: any) => country.name),
      startDate
    }
  });

  return (
    <div className={classes.root}>
      <Paper className={`${classes.container}`} elevation={1}>
        <DatePicker
          focused={true}
          label="Basic example"
          value={startDate}
          onChange={date => setStartDate(date)}
        />
        {getCountriesReportsData &&
          getCountriesReportsData.Day &&
          <div className={classes.fadeIn}>
            <CasesGraphs
              selectedCountries={selectedCountries}
              countriesData={getCountriesReportsData}
            />
          </div>}
      </Paper>
    </div>
  );
};

export { ReportsBlock };

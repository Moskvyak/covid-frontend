import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { SimpleChart } from '../SimpleChart';
import Paper from '@material-ui/core/Paper';

import {
  RECOVERED_COLOR,
  DEATH_COLOR,
  CONFIRMED_COLOR,
  ACTIVE_COLOR
} from '../../data';
interface Props {
  selectedCountries: any[];
  countriesData: any;
}

const fontSize = 12;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: 300,
      alignItems: 'center'
    },
    name: {
      flex: 1,
      fontSize,
      lineHeight: '12px'
    },
    stats: {
      flex: '0 0 200px',
      display: 'flex',
      marginLeft: 8
    },
    confirmed: {
      color: CONFIRMED_COLOR,
      fontSize,
      width: 48
    },
    active: {
      color: ACTIVE_COLOR,
      fontSize,
      width: 48
    },
    recovered: {
      color: RECOVERED_COLOR,
      fontSize,
      width: 48
    },
    deaths: {
      color: DEATH_COLOR,
      fontSize,
      width: 48
    }
  })
);

const CasesGraphs: React.FC<Props> = (props: Props) => {
  const { selectedCountries, countriesData } = props;
  const confirmedData: any[] = [];
  const recoveredData: any[] = [];
  const deathsData: any[] = [];
  const activeData: any[] = [];
  const classes = useStyles();

  countriesData.Day.forEach((dayItem: any) => {
    const confirmedReports: any = {};
    const recoveredReports: any = {};
    const deathsReports: any = {};
    const activeReports: any = {};

    dayItem.Reports.forEach((report: any) => {
      const key = report.Location.name;
      confirmedReports[key] = report.confirmedTotal;
      recoveredReports[key] = report.recoveredTotal;
      deathsReports[key] = report.deathsTotal;
      activeReports[key] =
        report.confirmedTotal - report.recoveredTotal - report.deathsTotal;
    });
    const id = moment(dayItem.date).format('MMM DD');
    const newConfirmedItem = {
      id,
      ...confirmedReports
    };
    const newRecoveredItem = {
      id,
      ...recoveredReports
    };
    const newDeathsItem = {
      id,
      ...deathsReports
    };
    const newActiveItem = {
      id,
      ...activeReports
    };
    confirmedData.push(newConfirmedItem);
    recoveredData.push(newRecoveredItem);
    deathsData.push(newDeathsItem);
    activeData.push(newActiveItem);
  });

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <span className={classes.confirmed}>Confirmed</span>
          <Paper
            elevation={3}
            style={{
              height: 300
            }}
          >
            <SimpleChart
              data={confirmedData}
              selectedCountries={selectedCountries}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <span className={classes.active}>Active</span>
          <Paper
            elevation={3}
            style={{
              height: 300
            }}
          >
            <SimpleChart
              data={activeData}
              selectedCountries={selectedCountries}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <span className={classes.recovered}>Recovered</span>

          <Paper
            elevation={3}
            style={{
              height: 300
            }}
          >
            <SimpleChart
              data={recoveredData}
              selectedCountries={selectedCountries}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <span className={classes.deaths}>Deaths</span>

          <Paper
            elevation={3}
            style={{
              height: 300
            }}
          >
            <SimpleChart
              data={deathsData}
              selectedCountries={selectedCountries}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export { CasesGraphs };

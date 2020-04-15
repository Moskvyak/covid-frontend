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

const fontSize = 16;
const leftCornerProps: any = {
  width: '100%',
  position: 'relative',
  marginBottom: 20,
  fontWeight: 600
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: 300,
      alignItems: 'center'
    },
    graphWrapper: {
      position: 'relative',

      [theme.breakpoints.down('xl')]: {
        height: 340,
        margin: 'auto'
      },
      [theme.breakpoints.down('lg')]: {
        height: 220,
        margin: 'auto'
      },
      [theme.breakpoints.down('md')]: {
        maxWidth: 600,
        height: 220
      },
      [theme.breakpoints.down('sm')]: {
        height: 220
      },
      padding: 20,
      paddingRight: 40,
      paddingBottom: 40
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
      fontSize,
      color: CONFIRMED_COLOR,
      ...leftCornerProps
    },
    active: {
      color: ACTIVE_COLOR,
      fontSize,
      ...leftCornerProps
    },
    recovered: {
      color: RECOVERED_COLOR,
      fontSize,
      ...leftCornerProps
    },
    deaths: {
      color: DEATH_COLOR,
      fontSize,
      ...leftCornerProps
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
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Paper className={classes.graphWrapper} elevation={3}>
            <div className={classes.confirmed}>Confirmed</div>
            {selectedCountries.length > 0 &&
              <SimpleChart
                data={confirmedData}
                selectedCountries={selectedCountries}
              />}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Paper className={classes.graphWrapper} elevation={3}>
            <div className={classes.active}>Active</div>
            {selectedCountries.length > 0 &&
              <SimpleChart
                data={activeData}
                selectedCountries={selectedCountries}
              />}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Paper className={classes.graphWrapper} elevation={3}>
            <div className={classes.recovered}>Recovered</div>
            {selectedCountries.length > 0 &&
              <SimpleChart
                data={recoveredData}
                selectedCountries={selectedCountries}
              />}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Paper className={classes.graphWrapper} elevation={3}>
            <div className={classes.deaths}>Deaths</div>
            {selectedCountries.length > 0 &&
              <SimpleChart
                data={deathsData}
                selectedCountries={selectedCountries}
              />}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export { CasesGraphs };

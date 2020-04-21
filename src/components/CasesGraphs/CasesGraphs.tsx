import React from 'react';
import moment from 'moment';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { SimpleChart } from '../SimpleChart';

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
     height: '100%',
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
    },
    
    graphWrapper: {
      position: 'relative',
      width: '100%',
      height: '100%',
      padding: 20,
      paddingRight: 40,
      paddingBottom: 40,
      margin:'auto'
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
      <div className={classes.root}>
         <div className={classes.graphWrapper}>
              <div className={classes.confirmed}>Confirmed</div>
              {selectedCountries.length > 0 &&
                <SimpleChart
                  data={confirmedData}
                  selectedCountries={selectedCountries}
                />}
            </div>
            <div className={classes.graphWrapper}>
              <div className={classes.active}>Active</div>
              {selectedCountries.length > 0 &&
                <SimpleChart
                  data={activeData}
                  selectedCountries={selectedCountries}
                />}
            </div>
            <div className={classes.graphWrapper}>
              <div className={classes.recovered}>Recovered</div>
              {selectedCountries.length > 0 &&
                <SimpleChart
                  data={recoveredData}
                  selectedCountries={selectedCountries}
                />}
            </div>
            <div className={classes.graphWrapper}>
              <div className={classes.deaths}>Deaths</div>
              {selectedCountries.length > 0 &&
                <SimpleChart
                  data={deathsData}
                  selectedCountries={selectedCountries}
                />}
            </div>
      </div>
  );
};

export { CasesGraphs };

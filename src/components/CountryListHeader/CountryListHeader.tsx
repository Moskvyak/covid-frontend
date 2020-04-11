import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import {
  RECOVERED_COLOR,
  DEATH_COLOR,
  CONFIRMED_COLOR,
  ACTIVE_COLOR
} from '../../data';

const fontSize = 11;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      display: 'flex',
      width: 360,
      alignItems: 'center'
    },
    name: {
      flex: 1,
      fontSize,
      textAlign: 'center'
    },
    stats: {
      flex: '0 0 220px',
      display: 'flex',
      marginLeft: 8
    },
    item: {
      fontSize,
      width: 56,
      marginLeft: 1,
      marginRight: 1,
      textAlign: 'center'
    },
    confirmed: {
      color: CONFIRMED_COLOR,
    },
    active: {
      color: ACTIVE_COLOR
    },
    recovered: {
      color: RECOVERED_COLOR
    },
    deaths: {
      color: DEATH_COLOR
    }
  })
);

const CountryListHeader: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.name}>Country</div>
      <div className={classes.stats}>
      <span className={`${classes.confirmed} ${classes.item}`}>Confirmed</span>
      <span className={`${classes.active} ${classes.item}`}>Active</span>
      <span className={`${classes.recovered} ${classes.item}`}>Recovered</span>
      <span className={`${classes.deaths} ${classes.item}`}>Deaths</span>
      </div>
    </div>
  );
};

export { CountryListHeader };

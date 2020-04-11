import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import {
  RECOVERED_COLOR,
  DEATH_COLOR,
  CONFIRMED_COLOR,
  ACTIVE_COLOR
} from '../../data';

interface Props {
  name: string;
  confirmed: number;
  recovered: number;
  deaths: number;
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

const CountryListItem: React.FC<Props> = ({
  name,
  confirmed,
  recovered,
  deaths
}: Props) => {
  const classes = useStyles();
  const active = confirmed - recovered - deaths;
  return (
    <div className={classes.root}>
      <div className={classes.name}>
        {name}
      </div>
      <div className={classes.stats}>
        <span className={classes.confirmed}>
          {confirmed}
        </span>
        <span className={classes.active}>
          {active}
        </span>
        <span className={classes.recovered}>
          {recovered}
        </span>
        <span className={classes.deaths}>
          {deaths}
        </span>
      </div>
    </div>
  );
};

export { CountryListItem };

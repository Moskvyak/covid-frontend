import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import {
  RECOVERED_COLOR,
  DEATH_COLOR,
  CONFIRMED_COLOR,
  ACTIVE_COLOR
} from '../../data';
import { applyThousandSeparator } from '../../utils/formatter';

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
      width: 310,
      alignItems: 'center'
    },
    name: {
      flex: 1,
      fontSize,
      lineHeight: '12px'
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
      textAlign: 'right'
    },
    confirmed: {
      color: CONFIRMED_COLOR
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
        <span className={`${classes.confirmed} ${classes.item}`}>
          {applyThousandSeparator(confirmed.toString(), ',', 'thousand')}
        </span>
        <span className={`${classes.active} ${classes.item}`}>
          {applyThousandSeparator(active.toString(), ',', 'thousand')}
        </span>
        <span className={`${classes.recovered} ${classes.item}`}>
          {applyThousandSeparator(recovered.toString(), ',', 'thousand')}
        </span>
        <span className={`${classes.deaths} ${classes.item}`}>
          {applyThousandSeparator(deaths.toString(), ',', 'thousand')}
        </span>
      </div>
    </div>
  );
};

export { CountryListItem };

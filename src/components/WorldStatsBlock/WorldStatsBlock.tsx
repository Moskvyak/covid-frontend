import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { WorldStatsBlockSection } from '../WorldStatsBlockSection';
import { GET_TOTAL_NUMBERS } from '../../graphql/queries';

import {
  RECOVERED_COLOR,
  DEATH_COLOR,
  CONFIRMED_COLOR,
  ACTIVE_COLOR
} from '../../data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'calc(100% - 2px)'
    },
    container: {
      height: '100%',
      padding: 24,
    },
    '@keyframes appear': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    fadeIn: {
      display: 'flex',
      height: '100%',
      animationName: '$appear',
      animationDuration: '1s',
      animationTimingFunction: 'linear'
    }
  })
);

const WorldStatsBlock: React.FC = React.memo(() => {
  const [totalNumbers, setTotalNumbers] = useState({
    confirmedTotal: 0,
    recoveredTotal: 0,
    deathsTotal: 0
  });

  const classes = useStyles();
  useQuery(GET_TOTAL_NUMBERS, {
    onCompleted: (data: any) => {
      const {
        confirmedTotal,
        recoveredTotal,
        deathsTotal
      } = data.Day[0].Reports_aggregate.aggregate.sum;
      setTotalNumbers({
        confirmedTotal,
        recoveredTotal,
        deathsTotal
      });
    }
  });

  const active =
    totalNumbers.confirmedTotal -
    totalNumbers.recoveredTotal -
    totalNumbers.deathsTotal;

  return (
    <div className={classes.root}>
      <Paper className={`${classes.container}`} elevation={1}>
        <div className={classes.fadeIn}>
          <WorldStatsBlockSection
            title="Confirmed"
            value={totalNumbers.confirmedTotal}
            color={CONFIRMED_COLOR}
          />
          <WorldStatsBlockSection
            title="Active"
            value={active}
            color={ACTIVE_COLOR}
          />
          <WorldStatsBlockSection
            title="Recovered"
            value={totalNumbers.recoveredTotal}
            color={RECOVERED_COLOR}
          />
          <WorldStatsBlockSection
            title="Deaths"
            value={totalNumbers.deathsTotal}
            noBorder
            color={DEATH_COLOR}
          />
        </div>
      </Paper>
    </div>
  );
});

export { WorldStatsBlock };

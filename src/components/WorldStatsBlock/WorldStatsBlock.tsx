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
      display: 'flex'
    }
  })
);

const WorldStatsBlock: React.FC = () => {
  const [totalNumbers, setTotalNumbers] = useState({
    confirmedTotal: 0,
    recoveredTotal: 0,
    deathsTotal: 0
  });
  const classes = useStyles();
  useQuery(GET_TOTAL_NUMBERS, {
    onCompleted: (data: any) => {
      setTotalNumbers({
        confirmedTotal: 2405104,
        recoveredTotal: 624477,
        deathsTotal: 164956
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
      </Paper>
    </div>
  );
};

export { WorldStatsBlock };

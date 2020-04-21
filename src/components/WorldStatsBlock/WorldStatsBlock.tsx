import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { GET_TOTAL_NUMBERS } from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: 24,
      height: '100%'
    },
    section: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #eee'
    },
    noBorder: {
        borderRight: 0
    },
    sectionTitle: {
      fontSize: 20,
      marginTop: 0,
      textAlign: 'center'
    },
    sectionBody: {
        fontSize: 18,
        textAlign: 'center'
      },
    scroll: {
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
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
  const { data: getCountriesData } = useQuery(GET_TOTAL_NUMBERS, {
    onCompleted: (data: any) => {
      setTotalNumbers({
        confirmedTotal: 2405104,
        recoveredTotal: 624477,
        deathsTotal: 164956
      });
    }
  });
  const active = totalNumbers.confirmedTotal - totalNumbers.recoveredTotal - totalNumbers.deathsTotal;

  return (
    <Paper className={classes.root}>
      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Confirmed</h3>
        <div className={classes.sectionBody}>{totalNumbers.confirmedTotal}</div>
      </div>
      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Active</h3>
        <div className={classes.sectionBody}>{active}</div>
      </div>
      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Recovered</h3>
        <div className={classes.sectionBody}>{totalNumbers.recoveredTotal}</div>
      </div>
      <div className={`${classes.section} ${classes.noBorder}`}>
        <h3 className={classes.sectionTitle}>Deaths</h3>
        <div className={classes.sectionBody}>{totalNumbers.deathsTotal}</div>
      </div>
    </Paper>
  );
};

export { WorldStatsBlock };

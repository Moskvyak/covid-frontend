import React from 'react';
import { useCountUp } from 'react-countup';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup';

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
interface Props {
  value: number;
  title: string;
  noBorder?: boolean
}

const WorldStatsBlockSection: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const rootClass = props.noBorder? `${classes.section} ${classes.noBorder}` : classes.section
  return (
    <div className={rootClass}>
      <h3 className={classes.sectionTitle}>
        {props.title}
      </h3>
      <div className={classes.sectionBody}>
        {props.value > 0 && <CountUp start={0} end={props.value} separator={','} decimals={0} />}
        {props.value <= 0 && <span>--</span>}
      </div>
    </div>
  );
};

export { WorldStatsBlockSection };
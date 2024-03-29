import React, { useContext } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { GraphModeContext } from '../../contexts/GraphModeContext';
import CountUp from 'react-countup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: (props: Props) => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      '&:hover': {
        color: `${props.color}`,
        fontWeight: 500
      },
      [theme.breakpoints.up('sm')]: {
        borderRight: '1px solid #eee',
      },
    }),
    noBorder: () => ({
      borderRight: 0
    }),
    sectionTitle: (props: Props) => ({
      fontSize: 20,
      marginTop: 16,
      marginBottom: 0,
      textAlign: 'center',
      color: props.color,
      [theme.breakpoints.up('lg')]: {
        fontSize: 20
      }
    }),
    sectionBody: {
      fontSize: 18,
      marginBottom: 16,
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
  mode: string;
  noBorder?: boolean;
  color: string;
}

const WorldStatsBlockSection: React.FC<Props> = (props: Props) => {
  const classes = useStyles(props);
  const { updateMode } = useContext(GraphModeContext);
  const rootClass = props.noBorder? `${classes.section} ${classes.noBorder}` : classes.section
  return (
    <div className={rootClass} onClick={() => updateMode(props.mode)}>
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

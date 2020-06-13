import React, { useContext } from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { GraphModeContext } from '../../contexts/GraphModeContext';

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
      display: 'flex',
      height: 30,
      marginLeft: 36,
      marginRight: 24,
      alignItems: 'center'
    },
    oneThird: {
      flex: '0 0 33%',
      fontSize
    },
    half: {
      flex: '0 0 50%',
      fontSize
    },
    twoThirds: {
      flex: '0 0 66%',
      display: 'flex',
      fontSize
    },
    alignLeft: {
      textAlign: 'left'
    },
    alignRight: {
      textAlign: 'right'
    },
    marginLeft: {
      marginLeft: 8
    },
    item: {
      fontSize,
      width: '25%',
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
interface Props {
  filteredView?: boolean;
}
const CountryListHeader: React.FC<Props> = (props: Props) => {
  const { filteredView } = props;
  const classes = useStyles();
  const { mode } = useContext(GraphModeContext);
  let keyToCompare = 'confirmedTotal';
  let columnTitle = 'Confirmed';
  let columnClass = classes.confirmed;

  switch (mode) {
    case 'confirmed': {
      keyToCompare = 'confirmedTotal';
      columnTitle = 'Confirmed';
      columnClass = classes.confirmed;
      break;
    }
    case 'active': {
      keyToCompare = 'activeTotal';
      columnTitle = 'Active';
      columnClass = classes.active;
      break;
    }
    case 'recovered': {
      keyToCompare = 'recoveredTotal';
      columnTitle = 'Recovered';
      columnClass = classes.recovered;
      break;
    }
    case 'deaths': {
      keyToCompare = 'deathsTotal';
      columnTitle = 'Deaths';
      columnClass = classes.deaths;
      break;
    }
  }
  return (
    <div className={classes.root}>
      {!filteredView &&
        <React.Fragment>
          <div className={`${classes.oneThird} ${classes.alignLeft}`}>Country</div>
          <div className={classes.twoThirds}>
            <span className={`${classes.confirmed} ${classes.item}`}>
              Confirmed
            </span>
            <span className={`${classes.active} ${classes.item}`}>Active</span>
            <span className={`${classes.recovered} ${classes.item}`}>
              Recovered
            </span>
            <span className={`${classes.deaths} ${classes.item}`}>Deaths</span>
          </div>
        </React.Fragment>}
      {filteredView &&
        <React.Fragment>
          <div className={`${classes.half} ${classes.alignLeft}`}>Country</div>
          <div className={`${classes.half} ${columnClass} ${classes.alignRight}`}>
            {columnTitle}
          </div>
        </React.Fragment>}
    </div>
  );
};

export { CountryListHeader };

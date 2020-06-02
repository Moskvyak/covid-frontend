import React, { useContext } from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { GraphModeContext } from '../../pages/GraphPage/GraphModeContext';

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
  filteredView?: boolean;
}
const fontSize = 12;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginRight: 24,
      width: '100%',
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

const CountryListItem: React.FC<Props> = ({
  name,
  confirmed,
  recovered,
  deaths,
  filteredView
}: Props) => {
  const classes = useStyles();
  const active = confirmed - recovered - deaths;
  const stats: any = {
    confirmedTotal: confirmed,
    recoveredTotal: recovered,
    deathsTotal: deaths,
    activeTotal: active
  };
  const { mode } = useContext(GraphModeContext);
  let keyToCompare = 'confirmedTotal';
  let columnClass = classes.confirmed;

  switch (mode) {
    case 'confirmed': {
      keyToCompare = 'confirmedTotal';
      columnClass = classes.confirmed;
      break;
    }
    case 'active': {
      keyToCompare = 'activeTotal';
      columnClass = classes.active;
      break;
    }
    case 'recovered': {
      keyToCompare = 'recoveredTotal';
      columnClass = classes.recovered;
      break;
    }
    case 'deaths': {
      keyToCompare = 'deathsTotal';
      columnClass = classes.deaths;
      break;
    }
  }
  return (
    <div className={classes.root}>
      {!filteredView &&
        <React.Fragment>
          <div className={classes.oneThird}>
            {name}
          </div>
          <div className={classes.twoThirds}>
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
        </React.Fragment>}
      {filteredView &&
        <React.Fragment>
           <div className={classes.half}>
            {name}
          </div>
          <div className={`${classes.half} ${columnClass} ${classes.alignRight}`}>
            {applyThousandSeparator(
              stats[keyToCompare].toString(),
              ',',
              'thousand'
            )}
          </div>
        </React.Fragment>}
    </div>
  );
};

export { CountryListItem };

import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { colors } from '../../data';

import { applyThousandSeparator } from '../../utils/formatter';

const drawerWidth = 380;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullHeight: {
      height: '100%'
    },
    root: {
      height: 'calc(100% - 2px)'
    },
    title: {
      marginTop: 0,
      marginBottom: 0,
      paddingLeft: 8
    },
    container: {
      height: '100%',
      padding: 24,
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      width: '100%',
      flex: '0 0 auto',
      display: 'flex'
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
    },
    drawer: {
      width: drawerWidth,
      flex: 1
    },
    name: {
      fontSize: 12,
      width: 100
    },
    control: {
      width: 12,
      height: 12,
      marginRight: 8,
      marginLeft: 8
    },
    item: {
      fontSize: 12,
      width: 100,
      textAlign: 'right'
    },
    listItem: {
      width: '100%',
      margin: 0,
      height: '40px',
      display: 'flex',
      alignItems: 'center'
    },
    loading: {
      padding: 20
    },
    '@keyframes appear': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    fadeIn: {
      animationName: '$appear',
      animationDuration: '1s',
      animationTimingFunction: 'linear'
    },
    isEven: {
      background: 'rgba(227,242,253, 0.3)'
    },
    titleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8,
      alignItems: 'center'
    },
    search: {
      margin: theme.spacing(1),
      marginTop: 0,
      marginBottom: 0
    }
  })
);

interface Props {
  countries: any[];
  selectedCountries: any[];
  updateCountry: (country: any) => void;
  graphMode: string;
}

function sortByConfirmed(
  keyToCompare: string,
  sort: 'asc' | 'desc',
  a: any,
  b: any
) {
  if (a[keyToCompare] > b[keyToCompare]) {
    return -1;
  }
  if (a[keyToCompare] < b[keyToCompare]) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

const applySort = (keyToCompare: string, sort: 'asc' | 'desc') => {
  return (a: any, b: any) => sortByConfirmed(keyToCompare, sort, a, b);
};
const SelectedCountries: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { selectedCountries, updateCountry, countries } = props;
  let keyToCompare = 'confirmedTotal';
  let columnTitle = 'Confirmed';
  switch (props.graphMode) {
    case 'confirmed': {
      keyToCompare = 'confirmedTotal';
      columnTitle = 'Confirmed';
      break;
    }
    case 'active': {
      keyToCompare = 'activeTotal';
      columnTitle = 'Active';
      break;
    }
    case 'recovered': {
      keyToCompare = 'recoveredTotal';
      columnTitle = 'Recovered';
      break;
    }
    case 'deaths': {
      keyToCompare = 'deathsTotal';
      columnTitle = 'Deaths';
      break;
    }
  }

  const filteredCountries = selectedCountries
    .map((country: any, index: number) => {
      return {
        ...country,
        activeTotal:
          country.confirmedTotal - country.recoveredTotal - country.deathsTotal,
        color: colors[index],
        onClick: () => updateCountry(country)
      };
    })
    .sort(applySort(keyToCompare, 'desc'));

  return (
    <div className={classes.root}>
      <Paper className={`${classes.container}`} elevation={1}>
        <div className={classes.titleHeader}>
          <h1 className={classes.title}>
            Selected countries: { filteredCountries.length > 0 && filteredCountries.length}
          </h1>
        </div>
        {filteredCountries.length > 0 && <div className={classes.header}>
          <div className={classes.control} />
          <div className={classes.name}>Country</div>
          <div className={classes.item}>
            {columnTitle}
          </div>
        </div>}
        <div className={`${classes.drawer} ${classes.scroll}`}>
          {filteredCountries.length > 0 &&
            <div className={classes.fadeIn}>
              {filteredCountries.map((country: any, index: number) => {
                const isEven = index % 2 === 1;
                const rootClassName = isEven
                  ? `${classes.listItem} ${classes.isEven}`
                  : classes.listItem;
                return (
                  <div key={country.id} className={rootClassName}>
                    <div
                      onClick={country.onClick}
                      className={classes.control}
                      style={{
                        backgroundColor: country.color,
                        width: 12,
                        height: 12,
                        marginRight: 8,
                        marginLeft: 8,
                        borderColor: country.color,
                        cursor: 'pointer',
                        borderRadius: '50%'
                      }}
                    />
                    <div className={classes.name}>
                      {country.name}
                    </div>
                    <div className={classes.item}>
                      {applyThousandSeparator(
                        country[keyToCompare].toString(),
                        ',',
                        'thousand'
                      )}
                    </div>
                  </div>
                );
              })}
            </div>}
          {!filteredCountries.length &&
            <div className={classes.loading}>
              <h3>Select the countries from the list below to compare</h3>
            </div>}
        </div>
      </Paper>
    </div>
  );
};

export { SelectedCountries };

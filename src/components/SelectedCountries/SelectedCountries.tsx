import React  from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { colors } from '../../data';
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
      flex: '0 0 auto'
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
}

const SelectedCountries: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { selectedCountries, updateCountry, countries } = props;
  const filteredCountries = selectedCountries;

  return (
    <div className={classes.root}>
      <Paper className={`${classes.container}`} elevation={1}>
        <div className={classes.titleHeader}>
          <h1 className={classes.title}>Selected countries</h1>
        </div>

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
                    <div onClick={() => updateCountry(country)} style={{backgroundColor:colors[index], width: 12, height: 12, marginRight: 8,marginLeft: 8,  borderColor: colors[index], cursor: 'pointer', borderRadius: '50%'}} />
                    <div>
                      {country.name}
                      </div>
                  </div>
                );
              })}
            </div>}
          {!countries.length &&
            <div className={classes.loading}>
              <p>Nothing selected</p>
            </div>}
        </div>
      </Paper>
    </div>
  );
};

export { SelectedCountries };

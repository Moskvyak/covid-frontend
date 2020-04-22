import React, { useState } from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { CountryListItem } from '../CountryListItem';
import { CountryListHeader } from '../CountryListHeader';

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
      margin: 0
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

const ListOfCountries: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { selectedCountries, updateCountry, countries } = props;
  const [filter, setFilter] = useState('');
  const filteredCountries = countries.filter((country: any) =>
    country.name.toLowerCase().includes(filter.toLowerCase().trim())
  );
  const onFilterChange = (e: any) => {
    setFilter(e.target.value);
  };
  return (
    <div className={classes.root}>
      <Paper className={`${classes.container}`} elevation={1}>
        <div className={classes.titleHeader}>
          <h1 className={classes.title}>Countries</h1>
          <TextField
            className={classes.search}
            id="filter-country-textfield"
            variant="outlined"
            margin="dense"
            value={filter}
            onChange={onFilterChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>

        <div className={classes.header}>
          <CountryListHeader />
        </div>
        <div className={`${classes.drawer} ${classes.scroll}`}>
          {countries.length > 0 &&
            <div className={classes.fadeIn}>
              {filteredCountries.map((country: any, index: number) => {
                const isSelected = !!selectedCountries.find(
                  (selC: any) => selC.id === country.id
                );
                const isEven = index % 2 === 1;
                const rootClassName = isEven
                  ? `${classes.listItem} ${classes.isEven}`
                  : classes.listItem;
                return (
                  <div key={country.id}>
                    <FormControlLabel
                      className={rootClassName}
                      control={
                        <Checkbox
                          checked={isSelected}
                          onChange={() => updateCountry(country)}
                          value={country.id}
                          color="primary"
                        />
                      }
                      label={
                        <CountryListItem
                          name={country.name}
                          confirmed={country.confirmedTotal}
                          recovered={country.recoveredTotal}
                          deaths={country.deathsTotal}
                        />
                      }
                    />
                  </div>
                );
              })}
            </div>}
          {!countries.length &&
            <div className={classes.loading}>
              <p>Loading locations...</p>
              <LinearProgress />
            </div>}
        </div>
      </Paper>
    </div>
  );
};

export { ListOfCountries };

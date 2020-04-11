import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { ReportsBlock } from '../ReportsBlock';
import { CountryListItem } from '../CountryListItem';
import { CountryListHeader } from '../CountryListHeader';
import { GET_COUNTRIES } from '../../graphql/queries';

const drawerWidth = 380;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      width: '100%',
      padding: 20
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      marginTop: 30,
      height: 'calc(100% - 30px)'
    },
    listItem: {
      width: '100%',
      margin: 0
    },
    loading: {
      padding: 20
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 30,
      height: 'calc(100% - 30px)'
    },
    closed: {
      width: 0
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
    extendedIcon: {
      marginRight: theme.spacing(0.5)
    }
  })
);

const GraphPage: React.FC = () => {
  let countries: any[] = [];
  const [selectedCountries, setSelectedCountries] = useState(countries);
  const [drawerOpened, setDrawerOpened] = useState(true);
  const classes = useStyles();
  const { data: getCountriesData } = useQuery(GET_COUNTRIES, {
    onCompleted: (data: any) => {
      setSelectedCountries(data.Location.slice(0, 3));
    }
  });

  const updateCountry = (country: any) => {
    if (!selectedCountries.find((selC: any) => selC.id === country.id)) {
      const updatedCountries = [...selectedCountries, country];
      setSelectedCountries(updatedCountries);
    } else {
      const updatedCountries = selectedCountries.filter(
        (selC: any) => selC.id !== country.id
      );
      setSelectedCountries(updatedCountries);
    }
  };

  if (getCountriesData && getCountriesData.Location) {
    countries = getCountriesData.Location.filter(
      (location: any) => location.Reports.length
    );
  }
  const drawerClass = drawerOpened
    ? classes.drawer
    : `${classes.drawer} ${classes.closed}`;
  return (
    <div className={classes.root}>
      <Drawer
        className={drawerClass}
        variant={'persistent'}
        open={drawerOpened}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        {countries.length > 0 &&
          <div className={classes.fadeIn}>
            {countries.map((country: any, index: number) => {
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
                        confirmed={country.Reports[0].confirmedTotal}
                        recovered={country.Reports[0].recoveredTotal}
                        deaths={country.Reports[0].deathsTotal}
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
      </Drawer>
      {drawerOpened && 
      <div  style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: drawerWidth,
        height: 30,
        background: '#FFF'
      }}>
       <CountryListHeader />
       </div>}
      {drawerOpened &&
        <IconButton
          style={{
            position: 'fixed',
            top: 0,
            left: drawerWidth,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            width: 30,
            height: 30,
            background: '#FFF',
            border: '1px solid #eee',
            borderTop: 0
          }}
          size="small"
          aria-label="close"
          onClick={() => setDrawerOpened(false)}
        >
          <ChevronLeftIcon className={classes.extendedIcon} />
        </IconButton>}
        {!drawerOpened &&
        <IconButton
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            width: 30,
            height: 30,
            background: '#FFF',
            border: '1px solid #eee',
            borderTop: 0
          }}
          size="small"
          aria-label="close"
          onClick={() => setDrawerOpened(true)}
        >
          <ChevronRightIcon className={classes.extendedIcon} />
        </IconButton>}
      <ReportsBlock selectedCountries={selectedCountries} />
    </div>
  );
};

export { GraphPage };

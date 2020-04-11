import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';

import { ReportsBlock } from '../ReportsBlock';
import { CountryListItem } from '../CountryListItem';
import { GET_COUNTRIES } from '../../graphql/queries';

const drawerWidth = 360;

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
      flexShrink: 0
    },
    listItem: {
      width: '100%',
      margin: 0
    },
    loading: {
      padding: 20
    },
    drawerPaper: {
      width: drawerWidth
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    }
  })
);

const GraphPage: React.FC = () => {
  let countries: any[] = [];
  const [selectedCountries, setSelectedCountries] = useState(countries);
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
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        {countries.length > 0 &&
          countries.map((country: any) => {
            const isSelected = !!selectedCountries.find(
              (selC: any) => selC.id === country.id
            );
            return (
              <div key={country.id}>
                <FormControlLabel
                className={classes.listItem}
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
        {!countries.length &&
          <div className={classes.loading}>
            <p>Loading locations...</p>
            <LinearProgress />
          </div>}
      </Drawer>
      <ReportsBlock selectedCountries={selectedCountries} />
    </div>
  );
};

export { GraphPage };

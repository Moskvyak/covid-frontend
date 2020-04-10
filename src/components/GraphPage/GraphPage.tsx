import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CasesGraphs } from '../CasesGraphs';
import { ReportsBlock } from '../ReportsBlock/ReportsBlock';
import { GET_COUNTRIES, GET_CONTRIES_REPORTS } from '../../graphql/queries';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      background: '#eee'
    },
    appBar: {
      width: '100%',
      padding: 20
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
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
  const { data: getCountriesData } = useQuery(
    GET_COUNTRIES, {
      onCompleted: (data: any) => {
        setSelectedCountries(data.Location.slice(0,3));
      }
    }
  );

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
        { countries.length > 0 && countries.map((country: any) => {
          const isSelected = !!selectedCountries.find(
            (selC: any) => selC.id === country.id
          );
          return (
            <div key={country.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={() => updateCountry(country)}
                    value={country.id}
                    color="primary"
                  />
                }
                label={`${country.name} - ${country.Reports[0].confirmedTotal}`}
              />
            </div>
          );
        })}
        {
           !countries.length && <p> Loading locations... </p>
        }
      </Drawer>
     <ReportsBlock selectedCountries={selectedCountries} />
    </div>
  );
};

export { GraphPage };

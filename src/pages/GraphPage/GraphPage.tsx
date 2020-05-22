import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GraphModeContext } from './GraphModeContext';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';

import { ReportsBlock } from '../../components/ReportsBlock';
import { ListOfCountries } from '../../components/ListOfCountries';
import { SelectedCountries } from '../../components/SelectedCountries';
import { WorldStatsBlock } from '../../components/WorldStatsBlock';
import { GET_COUNTRIES } from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 16,
      height: '100%'
    },
    rowFlex: {
      display: 'flex'
    },
    mainSection: {
      flex: 1,
      paddingRight: 16,
      [theme.breakpoints.up('lg')]: {
        paddingRight: 32
      }
    },
    rightSection: {
      flex: '0 0 auto'
    },
    totalWrapper: {
      width: '100%',
      flex: 1,
      marginBottom: 20,
      [theme.breakpoints.up('lg')]: {
        height: 130,
        width: '100%'
      }
    },
    listOfCountriesWrapper: {
      height: 400,
      width: '100%'
    },
    graphsWrapper: {
      flex: 1,
      width: '100%',
      height: 400
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

const GraphPage: React.FC = () => {
  let countries: any[] = [];
  const [selectedCountries, setSelectedCountries] = useState(countries);
  const [open, setOpen] = useState(false);
  const [graphMode, setGraphMode] = useState('confirmed');
  const classes = useStyles();
  const { data: getCountriesData } = useQuery(GET_COUNTRIES, {
    onCompleted: (data: any) => {
      const selectedCountries = data.Day[0].Reports
        .slice(0, 3)
        .map((report: any) => {
          const country = {
            name: report.Location.name,
            id: report.Location.id,
            ...report
          };
          return country;
        });
      setSelectedCountries(selectedCountries);
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
  const updateMode = (mode: string) => {
    setGraphMode(mode);
  };

  if (getCountriesData && getCountriesData.Day) {
    countries = getCountriesData.Day[0].Reports.map((report: any) => {
      const country = {
        name: report.Location.name,
        id: report.Location.id,
        ...report
      };
      return country;
    });
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <GraphModeContext.Provider value={{ mode: graphMode, updateMode }}>
      <div className={classes.root}>
        <div className={classes.totalWrapper}>
          <WorldStatsBlock />
        </div>
        <div className={classes.rowFlex}>
          <div className={classes.mainSection}>
            <div className={`${classes.graphsWrapper} ${classes.scroll}`}>
              <ReportsBlock selectedCountries={selectedCountries} />
            </div>
          </div>
          <Hidden xsDown>
            <div className={classes.rightSection}>
              <div className={`${classes.graphsWrapper}  ${classes.scroll}`}>
                <SelectedCountries
                  handleViewAllCountries={handleOpen}
                  countries={countries}
                  selectedCountries={selectedCountries}
                  updateCountry={updateCountry}
                />
              </div>
            </div>
          </Hidden>
        </div>
        <Dialog
          fullWidth={true}
          maxWidth={'sm'}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <div
            className={`${classes.listOfCountriesWrapper} ${classes.scroll}`}
          >
            <ListOfCountries
              countries={countries}
              selectedCountries={selectedCountries}
              updateCountry={updateCountry}
            />
          </div>
        </Dialog>
      </div>
    </GraphModeContext.Provider>
  );
};

export { GraphPage };

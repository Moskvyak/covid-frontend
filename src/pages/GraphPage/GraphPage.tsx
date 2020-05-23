import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GraphModeContext } from './GraphModeContext';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
      [theme.breakpoints.up('sm')]: {
        paddingRight: 16,
      },
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
  const [openAllCountriesDialog, setOpenAllCoutriesDialog] = useState(false);
  const [openFiltersDialog, setOpenFiltersDialog] = useState(false);
  const [graphMode, setGraphMode] = useState('confirmed');
  const [value, setValue] = useState('one');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
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
  const handleCloseAllCountriesDialog = () => {
    setOpenAllCoutriesDialog(false);
  };
  const handleOpenAllCountriesDialog = () => {
    setOpenAllCoutriesDialog(true);
  };

  const handleCloseFiltersDialog = () => {
    setOpenFiltersDialog(false);
  };
  const handleOpenFiltersDialog = () => {
    setOpenFiltersDialog(true);
  };

  return (
    <GraphModeContext.Provider value={{ mode: graphMode, updateMode }}>
      <div className={classes.root}>
        <div className={classes.totalWrapper}>
          <WorldStatsBlock />
        </div>
        <div className={classes.rowFlex}>
          <div className={classes.mainSection}>
            <div className={`${classes.graphsWrapper}`}>
              <ReportsBlock selectedCountries={selectedCountries} openFilters={handleOpenFiltersDialog} />
            </div>
          </div>
          <Hidden smDown>
            <div className={classes.rightSection}>
              <div className={`${classes.graphsWrapper}`}>
                <SelectedCountries
                  handleViewAllCountries={handleOpenAllCountriesDialog}
                  countries={countries}
                  selectedCountries={selectedCountries}
                  updateCountry={updateCountry}
                />
              </div>
            </div>
          </Hidden>
        </div>
        <Hidden smDown>
          <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={openAllCountriesDialog}
            onClose={handleCloseAllCountriesDialog}
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
        </Hidden>
        <Hidden mdUp>
          <Dialog
            fullScreen
            open={openFiltersDialog}
            onClose={handleCloseFiltersDialog}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle style={{ padding: 0 }} id="confirmation-dialog-title">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="filter tabs"
                centered
              >
                <Tab value="one" label="Selected countries" wrapped />
                <Tab value="two" label="All countries" />
              </Tabs>
            </DialogTitle>
            <DialogContent dividers>
              <div
                className={`${classes.listOfCountriesWrapper} ${classes.scroll}`}
              >
                {value === 'one' &&
                  <SelectedCountries
                    handleViewAllCountries={handleOpenAllCountriesDialog}
                    countries={countries}
                    selectedCountries={selectedCountries}
                    updateCountry={updateCountry}
                  />}
                {value === 'two' &&
                  <ListOfCountries
                    countries={countries}
                    selectedCountries={selectedCountries}
                    updateCountry={updateCountry}
                  />}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={handleCloseFiltersDialog}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Hidden>
      </div>
    </GraphModeContext.Provider>
  );
};

export { GraphPage };

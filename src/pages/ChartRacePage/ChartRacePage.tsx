import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { ChartRaceReportsBlock } from '../../components/ChartRaceReportsBlock';
import { ListOfCountries } from '../../components/ListOfCountries';
import { SelectedCountries } from '../../components/SelectedCountries';
import { WorldStatsBlock } from '../../components/WorldStatsBlock';
import { GET_COUNTRIES } from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      padding: 8,
      [theme.breakpoints.up('sm')]: {
        padding: 16
      }
    },
    rowFlex: {
      display: 'flex',
      marginBottom: 16
    },
    mainSection: {
      flex: 1,
      [theme.breakpoints.up('md')]: {
        paddingRight: 16
      },
      [theme.breakpoints.up('lg')]: {
        paddingRight: 16
      }
    },
    rightSection: {
      flex: '0 0 380px'
    },
    totalWrapper: {
      width: '100%',
      flex: 1,
      marginBottom: 16,
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
      height: 500
    },
    padding: {
      padding: 24
    },
    noBottomPadding: {
      paddingBottom: 0
    }
  })
);

const ChartRacePage: React.FC = () => {
  let countries: any[] = [];
  const [selectedCountries, setSelectedCountries] = useState(countries);
  const [openAllCountriesDialog, setOpenAllCoutriesDialog] = useState(false);
  const [openFiltersDialog, setOpenFiltersDialog] = useState(false);
  const [value, setValue] = useState('one');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const { data: getCountriesData } = useQuery(GET_COUNTRIES, {
    onCompleted: (data: any) => {
      const selectedCountries = data.Day[0].Reports
        .slice(0, 10)
        .map((report: any) => {
          const country = {
            ...report,
            name: report.Location.name,
            id: report.Location.id
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

  if (getCountriesData && getCountriesData.Day) {
    countries = getCountriesData.Day[0].Reports.map((report: any) => {
      const country = {
        ...report,
        name: report.Location.name,
        id: report.Location.id,
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
      <div className={classes.root}>
        <div className={classes.totalWrapper}>
          <WorldStatsBlock />
        </div>
        <div className={classes.rowFlex}>
          <div className={classes.mainSection}>
            <div className={`${classes.graphsWrapper}`}>
              <ChartRaceReportsBlock
                selectedCountries={selectedCountries}
                openFilters={handleOpenFiltersDialog}
              />
            </div>
          </div>
          <Hidden smDown>
            <div className={classes.rightSection}>
              <Paper className={`${classes.graphsWrapper} ${classes.padding} ${classes.noBottomPadding}`}>
                <SelectedCountries
                  withActions
                  handleViewAllCountries={handleOpenAllCountriesDialog}
                  countries={countries}
                  selectedCountries={selectedCountries}
                  updateCountry={updateCountry}
                />
              </Paper>
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
              className={`${classes.listOfCountriesWrapper} ${classes.padding}`}
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
                {value === 'one' &&
                  <SelectedCountries
                    withActions={false}
                    handleViewAllCountries={handleOpenAllCountriesDialog}
                    countries={countries}
                    selectedCountries={selectedCountries}
                    updateCountry={updateCountry}
                  />}
                {value === 'two' &&
                  <ListOfCountries
                    filteredView
                    countries={countries}
                    selectedCountries={selectedCountries}
                    updateCountry={updateCountry}
                  />}
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
  );
};

export { ChartRacePage };

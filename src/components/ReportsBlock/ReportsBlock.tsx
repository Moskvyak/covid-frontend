import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CasesGraphs } from '../CasesGraphs';

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

interface Props {
  selectedCountries: any[];
}

const ReportsBlock: React.FC<Props> = (props: Props) => {
  const { selectedCountries } = props;
  const classes = useStyles();

  const {
    loading: getCountriesReportsLoading,
    data: getCountriesReportsData,
    refetch: refetchCountriesReports
  } = useQuery(GET_CONTRIES_REPORTS, {
    variables: {
      locationName: selectedCountries.map((country: any) => country.name)
    }
  });

  return (
   
      <div className={classes.appBar}>
        {getCountriesReportsData &&
          getCountriesReportsData.Day &&
          <CasesGraphs
            selectedCountries={selectedCountries}
            countriesData={getCountriesReportsData}
          />}
      </div>
  );
};

export { ReportsBlock };

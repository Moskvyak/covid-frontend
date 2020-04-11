import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { CasesGraphs } from '../CasesGraphs';

import { GET_CONTRIES_REPORTS } from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingLeft: 40,
      paddingRight: 40
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
      <div className={classes.root}>
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

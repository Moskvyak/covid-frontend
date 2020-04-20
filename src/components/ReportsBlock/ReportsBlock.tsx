import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { CasesGraphs } from '../CasesGraphs';

import { GET_CONTRIES_REPORTS } from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%'
    },
    '@keyframes appear': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    fadeIn: {
      height: '100%',
      animationName: '$appear',
      animationDuration: '1s',
      animationTimingFunction: 'linear'
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
    data: getCountriesReportsData,
  } = useQuery(GET_CONTRIES_REPORTS, {
    variables: {
      locationName: selectedCountries.map((country: any) => country.name)
    }
  });

  return (
    <div className={classes.root}>
      {getCountriesReportsData &&
        getCountriesReportsData.Day &&
        <div className={classes.fadeIn}>
          <CasesGraphs
            selectedCountries={selectedCountries}
            countriesData={getCountriesReportsData}
          />
        </div>}
    </div>
  );
};

export { ReportsBlock };

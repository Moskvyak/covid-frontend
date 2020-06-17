import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LinearProgress from '@material-ui/core/LinearProgress';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { DateRange } from '@material-ui/pickers';
import { ChartRaceGraphs } from '../ChartRaceGraphs';

import {
  GET_CONTRIES_REPORTS,
  GET_CHART_RACE_TOP_CONFIRMED
} from '../../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%'
    },
    container: {
      height: '100%',
      padding: 8,
      paddingTop: 0,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 0,
        padding: 24,
        paddingBottom: 0
      }
    },
    loader: {
      width: '50%',
      position: 'absolute',
      left: '50%',
      paddingTop: 28,
      transform: 'translate(-50%,0)'
    },
    tabs: {
      marginBottom: 8
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
    },
    tabPanel: {
      height: 'calc(100% - 56px)',
      position: 'relative'
    }
  })
);

interface Props {
  selectedCountries: any[];
  openFilters(): void;
}
interface SelectedChartProps extends Props {
  selectedRange: DateRange;
  handleRangeChange: React.Dispatch<React.SetStateAction<DateRange>>;
}

const SelectedChartRaceBlock: React.FC<SelectedChartProps> = (
  props: SelectedChartProps
) => {
  const {
    selectedCountries,
    openFilters,
    selectedRange,
    handleRangeChange
  } = props;
  const { data: getCountriesReportsData } = useQuery(GET_CONTRIES_REPORTS, {
    variables: {
      locationName: selectedCountries.map((country: any) => country.name),
      startDate: selectedRange[0],
      endDate: selectedRange[1]
    }
  });
  const classes = useStyles();
  if (!getCountriesReportsData || !getCountriesReportsData.Day) {
    return (
      <div className={classes.loader}>
        <p>Loading graph...</p>
        <LinearProgress />
      </div>
    );
  }
  return (
    <div className={classes.fadeIn}>
      <ChartRaceGraphs
        openFilters={openFilters}
        handleDateChange={handleRangeChange}
        selectedRange={selectedRange}
        selectedCountries={selectedCountries}
        countriesData={getCountriesReportsData}
      />
    </div>
  );
};

const TopChartRaceBlock: React.FC<SelectedChartProps> = (
  props: SelectedChartProps
) => {
  const {
    selectedCountries,
    openFilters,
    selectedRange,
    handleRangeChange
  } = props;
  const {
    data: getCountriesReportsData
  } = useQuery(GET_CHART_RACE_TOP_CONFIRMED, {
    variables: {
      limit: 20,
      startDate: selectedRange[0],
      endDate: selectedRange[1]
    }
  });

  const classes = useStyles();
 
  if (!getCountriesReportsData || !getCountriesReportsData.Day) {
    return (
      <div className={classes.loader}>
        <p>Loading graph...</p>
        <LinearProgress />
      </div>
    );
  }
  return (
    <div className={classes.fadeIn}>
      <ChartRaceGraphs
        openFilters={openFilters}
        handleDateChange={handleRangeChange}
        onlyTop={true}
        selectedRange={selectedRange}
        selectedCountries={selectedCountries}
        countriesData={getCountriesReportsData}
      />
    </div>
  );
};

const ChartRaceReportsBlock: React.FC<Props> = (props: Props) => {
  const [selectionMode, handleSelectionMode] = React.useState('top');
  const [selectedRange, handleRangeChange] = React.useState<DateRange>([
    null,
    null
  ]);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    handleSelectionMode(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper className={`${classes.container}`} elevation={1}>
        <Tabs
          className={classes.tabs}
          value={selectionMode}
          onChange={handleChange}
          aria-label="filter tabs"
          centered
        >
          <Tab value="top" label="Top 10 chart race" wrapped />
          <Tab value="selected" label="Selected Chart race" wrapped />
        </Tabs>

        {selectionMode === 'selected' &&
          <div className={classes.tabPanel}>
            <SelectedChartRaceBlock
              {...props}
              selectedRange={selectedRange}
              handleRangeChange={handleRangeChange}
            />
          </div>}

        {selectionMode === 'top' &&
          <div className={classes.tabPanel}>
            <TopChartRaceBlock
              {...props}
              selectedRange={selectedRange}
              handleRangeChange={handleRangeChange}
            />
          </div>}
      </Paper>
    </div>
  );
};

export { ChartRaceReportsBlock };

import React, { useContext } from 'react';
import moment from 'moment';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { SimpleChart } from '../SimpleChart';
import { GraphModeContext } from '../../pages/GraphPage/GraphModeContext';
import { DateRangePicker, DateRange } from '@material-ui/pickers';

import {
  RECOVERED_COLOR,
  DEATH_COLOR,
  CONFIRMED_COLOR,
  ACTIVE_COLOR
} from '../../data';
interface Props {
  selectedCountries: any[];
  countriesData: any;
  handleDateChange: (date: DateRange) => void;
  selectedRange: DateRange;
}

const fontSize = 16;
const leftCornerProps: any = {
  width: 'auto',
  position: 'relative',
  marginRight: 16,
  fontWeight: 600
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%'
    },
    graphHeader: {
      width: '100%',
      position: 'relative',
      fontWeight: 600,
      paddingBottom: 16,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    datePickerWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end'
    },
    graphWrapper: {
      position: 'relative',
      width: '100%',
      height: '100%',
      paddingTop: 0,
      paddingLeft: 20,
      paddingRight: 40,
      paddingBottom: 40,
      margin: 'auto'
    },
    name: {
      flex: 1,
      fontSize,
      lineHeight: '12px'
    },
    stats: {
      flex: '0 0 200px',
      display: 'flex',
      marginLeft: 8
    },
    confirmed: {
      fontSize,
      color: CONFIRMED_COLOR,
      ...leftCornerProps
    },
    active: {
      color: ACTIVE_COLOR,
      fontSize,
      ...leftCornerProps
    },
    recovered: {
      color: RECOVERED_COLOR,
      fontSize,
      ...leftCornerProps
    },
    deaths: {
      color: DEATH_COLOR,
      fontSize,
      ...leftCornerProps
    }
  })
);

const CasesGraphs: React.FC<Props> = (props: Props) => {
  const {
    selectedCountries,
    countriesData,
    selectedRange,
    handleDateChange
  } = props;
  const confirmedData: any[] = [];
  const recoveredData: any[] = [];
  const deathsData: any[] = [];
  const activeData: any[] = [];
  const classes = useStyles();

  const { mode } = useContext(GraphModeContext);
  countriesData.Day.forEach((dayItem: any) => {
    const confirmedReports: any = {};
    const recoveredReports: any = {};
    const deathsReports: any = {};
    const activeReports: any = {};

    dayItem.Reports.forEach((report: any) => {
      const key = report.Location.name;
      confirmedReports[key] = report.confirmedTotal;
      recoveredReports[key] = report.recoveredTotal;
      deathsReports[key] = report.deathsTotal;
      activeReports[key] =
        report.confirmedTotal - report.recoveredTotal - report.deathsTotal;
    });
    const id = moment(dayItem.date).format('MMM DD');
    const newConfirmedItem = {
      id,
      ...confirmedReports
    };
    const newRecoveredItem = {
      id,
      ...recoveredReports
    };
    const newDeathsItem = {
      id,
      ...deathsReports
    };
    const newActiveItem = {
      id,
      ...activeReports
    };
    confirmedData.push(newConfirmedItem);
    recoveredData.push(newRecoveredItem);
    deathsData.push(newDeathsItem);
    activeData.push(newActiveItem);
  });

  const renderDatePicker = () => {
    return (
      <div className={`${classes.datePickerWrapper}`}>
        <DateRangePicker
          startText="Start date"
          endText="End date"
          margin="dense"
          value={selectedRange}
          minDate={moment('2020-01-22')}
          maxDate={moment()}
          onChange={date => handleDateChange(date)}
        />
      </div>
    );
  };
  return (
    <div className={classes.root}>
      {mode === 'confirmed' &&
        <div className={classes.graphWrapper}>
          <div className={classes.graphHeader}>
            <div className={classes.confirmed}>Confirmed</div>
            {renderDatePicker()}
          </div>
          {selectedCountries.length > 0 &&
            <SimpleChart
              data={confirmedData}
              selectedCountries={selectedCountries}
            />}
        </div>}
      {mode === 'active' &&
        <div className={classes.graphWrapper}>
          <div className={classes.graphHeader}>
            <div className={classes.active}>Active</div>
            {renderDatePicker()}
          </div>
          {selectedCountries.length > 0 &&
            <SimpleChart
              data={activeData}
              selectedCountries={selectedCountries}
            />}
        </div>}
      {mode === 'recovered' &&
        <div className={classes.graphWrapper}>
          <div className={classes.graphHeader}>
            <div className={classes.recovered}>Recovered</div>
            {renderDatePicker()}
          </div>
          {selectedCountries.length > 0 &&
            <SimpleChart
              data={recoveredData}
              selectedCountries={selectedCountries}
            />}
        </div>}
      {mode === 'deaths' &&
        <div className={classes.graphWrapper}>
          <div className={classes.graphHeader}>
            <div className={classes.deaths}>Deaths</div>
            {renderDatePicker()}
          </div>
          {selectedCountries.length > 0 &&
            <SimpleChart
              data={deathsData}
              selectedCountries={selectedCountries}
            />}
        </div>}
    </div>
  );
};

export { CasesGraphs };

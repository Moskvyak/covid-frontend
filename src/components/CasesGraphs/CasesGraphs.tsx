import React, { useContext } from 'react';
import moment from 'moment';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { SimpleChart } from '../SimpleChart';
import Hidden from '@material-ui/core/Hidden';

import { GraphModeContext } from '../../pages/GraphPage/GraphModeContext';
import { DateRangePicker, DateRange } from '@material-ui/pickers';
import TuneIcon from '@material-ui/icons/Tune';
import IconButton from '@material-ui/core/IconButton';

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
  openFilters(): void;
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
      position: 'relative',
      width: '100%',
      height: '100%'
    },
    graphHeader: {
      width: '100%',
      position: 'relative',
      fontWeight: 600,
      paddingBottom: 0,
      paddingLeft: 16,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.up('sm')]: {
        padding: 0,
        marginBottom: 8
      }
    },
    graphWrapper: {
      height: 280,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        height: 300,
        marginTop: 16
      }
    },
    datePickerWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      paddingLeft: 8,
      marginBottom: 16,
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
        padding: 0,
        marginBottom: 0
      }
    },
    datePicker: {
      flexDirection: 'row',
      '& .MuiFormControl-root': {
        marginRight: 8,
        marginLeft: 8,
        [theme.breakpoints.down('xs')]: {
          width: 100
        }
      }
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
    handleDateChange,
    openFilters
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
          className={classes.datePicker}
          startText="Start date"
          endText="End date"
          inputFormat={'DD/MM/YYYY'}
          margin="dense"
          color="primary"
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
      <div className={classes.graphHeader}>
        {mode === 'confirmed' &&
          <div className={classes.confirmed}>Confirmed</div>}
        {mode === 'active' && <div className={classes.active}>Active</div>}
        {mode === 'recovered' &&
          <div className={classes.recovered}>Recovered</div>}
        {mode === 'deaths' && <div className={classes.deaths}>Deaths</div>}
        <Hidden xsDown>
          <div>
            {renderDatePicker()}
          </div>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={openFilters}>
            <TuneIcon />
          </IconButton>
        </Hidden>
      </div>
      <Hidden smUp>
        <div>
          {renderDatePicker()}
        </div>
      </Hidden>
      <div className={classes.graphWrapper}>
        {selectedCountries.length > 0 &&
          mode === 'confirmed' &&
          <SimpleChart
            data={confirmedData}
            selectedCountries={selectedCountries}
          />}
        {selectedCountries.length > 0 &&
          mode === 'active' &&
          <SimpleChart
            data={activeData}
            selectedCountries={selectedCountries}
          />}
        {selectedCountries.length > 0 &&
          mode === 'recovered' &&
          <SimpleChart
            data={recoveredData}
            selectedCountries={selectedCountries}
          />}
        {selectedCountries.length > 0 &&
          mode === 'deaths' &&
          <SimpleChart
            data={deathsData}
            selectedCountries={selectedCountries}
          />}
      </div>
    </div>
  );
};

export { CasesGraphs };

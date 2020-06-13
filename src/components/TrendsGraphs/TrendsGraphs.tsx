import React, { useContext, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { SimpleChart } from '../SimpleChart';
import Hidden from '@material-ui/core/Hidden';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GraphModeContext } from '../../contexts/GraphModeContext';
import TuneIcon from '@material-ui/icons/Tune';
import IconButton from '@material-ui/core/IconButton';
import useMinimalSelectStyles from '../../common/minimalSelectClasses';
import { filterData } from './filterData';

import {
  RECOVERED_COLOR,
  DEATH_COLOR,
  CONFIRMED_COLOR,
  ACTIVE_COLOR
} from '../../data';
interface Props {
  selectedCountries: any[];
  countriesData: any;
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
      paddingBottom: 16,
      paddingLeft: 16,
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      [theme.breakpoints.up('sm')]: {
        alignItems: 'center',
        padding: 0,
        marginBottom: 8
      }
    },
    graphWrapper: {
      height: 260,
      width: '100%',
      paddingLeft: 8,
      paddingRight: 8,
      [theme.breakpoints.up('sm')]: {
        height: 300,
        marginTop: 16,
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    graphHeaderSelectWrapper: {
      paddingTop: 8,
      flex: '0 0 auto',
      [theme.breakpoints.up('sm')]: {
        paddingTop: 0,
        marginTop: 8,
        marginBottom: 4
      }
    },
    datePickerWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      paddingLeft: 8,
      paddingRight: 8,
      marginBottom: 16,
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
        padding: 0,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 0
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: 16,
        marginRight: 0
      }
    },
    datePicker: {
      flexDirection: 'row',
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      },
      '& .MuiFormControl-root': {
        marginRight: 0,
        marginLeft: 0,
        [theme.breakpoints.down('sm')]: {
          marginRight: 8,
          marginLeft: 8
        },
        [theme.breakpoints.down('xs')]: {
          width: 100,
          flex: 1
        }
      },
      '& .MuiPickersDateRangePickerInput-toLabelDelimiter': {
        marginLeft: 8,
        marginRight: 8,
        [theme.breakpoints.down('xs')]: {
          flex: '0 0 auto'
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

const TrendsGraphs: React.FC<Props> = (props: Props) => {
  const { selectedCountries, countriesData, openFilters } = props;
  const { mode, updateMode } = useContext(GraphModeContext);
  const [minimumCases, setMinimumCases] = useState('100');
  const classes = useStyles();
  let color: string = CONFIRMED_COLOR;
  switch (mode) {
    case 'confirmed': {
      color = CONFIRMED_COLOR;
      break;
    }
    case 'active': {
      color = ACTIVE_COLOR;
      break;
    }
    case 'recovered': {
      color = RECOVERED_COLOR;
      break;
    }
    case 'deaths': {
      color = DEATH_COLOR;
      break;
    }
  }
  const minimalSelectClasses = useMinimalSelectStyles({ color });

  const iconComponent = (props: any) => {
    return (
      <ExpandMoreIcon
        className={props.className + ' ' + minimalSelectClasses.icon}
      />
    );
  };

  // moves the menu below the select input
  const menuProps: any = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    getContentAnchorEl: null
  };

  const parsedMinumCases = minimumCases === '' ? 0 : parseInt(minimumCases);
  const confirmedData = filterData(
    parsedMinumCases,
    'confirmedTotal',
    countriesData
  );
  const recoveredData = filterData(
    parsedMinumCases,
    'recoveredTotal',
    countriesData
  );
  const deathsData = filterData(parsedMinumCases, 'deathsTotal', countriesData);
  const activeData = filterData(parsedMinumCases, 'activeTotal', countriesData);

  const handleMinimumCasesChange = (event: any) => {
    if (event.target.value === '') {
      setMinimumCases('');
    } else {
      const value = Number(event.target.value);
      if (!isNaN(value)) {
        setMinimumCases(event.target.value);
      }
    }
  };
  const renderMinimumCasesPicker = () => {
    return (
      <div className={`${classes.datePickerWrapper}`}>
        <TextField
          className={classes.datePicker}
          margin="dense"
          color="primary"
          variant="outlined"
          label="From N cases"
          value={minimumCases}
          onChange={handleMinimumCasesChange}
        />
      </div>
    );
  };
  const handleChange = (event: any) => {
    updateMode(event.target.value);
  };
  return (
    <div className={classes.root}>
      <div className={classes.graphHeader}>
        <FormControl className={classes.graphHeaderSelectWrapper}>
          <Select
            disableUnderline
            classes={{ root: `${minimalSelectClasses.select}` }}
            MenuProps={menuProps}
            IconComponent={iconComponent}
            value={mode}
            onChange={handleChange}
          >
            <MenuItem value={'confirmed'}>Confirmed</MenuItem>
            <MenuItem value={'active'}>Active</MenuItem>
            <MenuItem value={'recovered'}>Recovered</MenuItem>
            <MenuItem value={'deaths'}>Deaths</MenuItem>
          </Select>
        </FormControl>

        <div>
          {renderMinimumCasesPicker()}
        </div>

        <Hidden mdUp>
          <IconButton color="inherit" onClick={openFilters}>
            <TuneIcon />
          </IconButton>
        </Hidden>
      </div>

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

export { TrendsGraphs };

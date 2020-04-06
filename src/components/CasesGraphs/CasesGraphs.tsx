import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { SimpleChart } from '../SimpleChart';
import Paper from '@material-ui/core/Paper';

interface Props {
  selectedCountries: any[];
  countriesData: any;
}
const CasesGraphs: React.FC<Props> = (props: Props) => {
  const { selectedCountries, countriesData } = props;
  const confirmedData: any[] = [];
  const recoveredData: any[] = [];
  countriesData.Day.forEach((dayItem: any) => {
    const confirmedReports: any = {};
    const recoveredReports: any = {};
    dayItem.Reports.forEach((report: any) => {
      const key = report.Location.name;
      confirmedReports[key] = report.confirmedTotal;
      recoveredReports[key] = report.recoveredTotal;
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
    confirmedData.push(newConfirmedItem);
    recoveredData.push(newRecoveredItem);
  });
  const mappedData = countriesData.Day.map((dayItem: any) => {
    const reports: any = {};
    dayItem.Reports.forEach((report: any) => {
      const key = report.Location.name;
      const value = report.confirmedTotal;
      reports[key] = value;
    });
    const newItem = {
      id: `${new Date(dayItem.date).getDate()}/${new Date(
        dayItem.date
      ).getMonth()}`,
      ...reports
    };
    return newItem;
  });

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            style={{
              height: 300
            }}
          >
            <SimpleChart
              data={confirmedData}
              selectedCountries={selectedCountries}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            style={{
              height: 300
            }}
          >
            <SimpleChart
              data={recoveredData}
              selectedCountries={selectedCountries}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            style={{
              height: 300
            }}
          >
            <SimpleChart
              data={mappedData}
              selectedCountries={selectedCountries}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            style={{
              height: 300
            }}
          >
            <SimpleChart
              data={mappedData}
              selectedCountries={selectedCountries}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export { CasesGraphs };

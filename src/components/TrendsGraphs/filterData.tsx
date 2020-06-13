export const filterData = (
  minimumCases: number,
  keyToFilter: string,
  countriesData: any
) => {
  let maxLength = 0;
  const returnData: any = [];

  const filteredCountriesData = countriesData.Location.map(
    (locationData: any) => {
      const foundIndex = locationData.Reports.findIndex((report: any) => {
        const value =
          keyToFilter === 'activeTotal'
            ? report.confirmedTotal - report.recoveredTotal - report.deathsTotal
            : report[keyToFilter];
        return value >= minimumCases;
      });
      if (foundIndex !== -1) {
        if (locationData.Reports.length - foundIndex > maxLength) {
          maxLength = locationData.Reports.length - foundIndex;
        }
        return {
          id: locationData.id,
          name: locationData.name,
          Reports: locationData.Reports.slice(
            foundIndex,
            locationData.Reports.length
          )
        };
      }
      return {
        id: locationData.id,
        name: locationData.name,
        Reports: []
      };
    }
  );

  for (let i = 0; i < maxLength; i++) {
    const item: any = {
      id: i + 1
    };
    filteredCountriesData.forEach((country: any) => {
      if (country.Reports.length > i) {
        const value =
          keyToFilter === 'activeTotal'
            ? country.Reports[i].confirmedTotal -
              country.Reports[i].recoveredTotal -
              country.Reports[i].deathsTotal
            : country.Reports[i][keyToFilter];

        item[country.name] = value;
      }
    });
    returnData.push(item);
  }
  return returnData;
};

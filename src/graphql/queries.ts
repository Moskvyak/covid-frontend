import gql from 'graphql-tag';

export const GET_CONTRIES_REPORTS = gql`
  query MyQuery($locationName: [String!]) {
    Day {
      date
      id
      Reports(
        where: {
          Location: { name: { _in: $locationName }, locationTypeId: { _eq: 2 } }
        }
      ) {
        confirmedTotal
        recoveredTotal
        deathsTotal
        Location {
          name
        }
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query MyQuery {
  Day(order_by: {date: desc}, limit: 1) {
    reportId: id
    date
    Reports(where: {Location: {LocationType: {id: {_eq: 2}}}}, order_by: {confirmedTotal: desc_nulls_last}) {
      id
      confirmedNew
      confirmedTotal
      recoveredNew
      recoveredTotal
      deathsNew
      deathsTotal
      Location {
        id
        name
      }
    }
  }
}
`;

export const GET_TOTAL_NUMBERS = gql`
  query MyQuery {
    Day(order_by: { date: desc }, limit: 7) {
      id
      Reports_aggregate {
        aggregate {
          sum {
            confirmedTotal
            confirmedNew
            deathsTotal
            deathsNew
            recoveredNew
            recoveredTotal
          }
        }
      }
      date
    }
  }
`;

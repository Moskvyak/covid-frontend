import gql from 'graphql-tag';

export const GET_CONTRIES_REPORTS = gql`
  query MyQuery(
    $locationName: [String!]
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    Day(where: { date: { _gte: $startDate, _lte: $endDate } }) {
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
          id
          name
        }
      }
    }
  }
`;

export const GET_CHART_RACE_TOP_CONFIRMED = gql`
  query MyQuery($startDate: timestamptz, $endDate: timestamptz, $limit: Int!) {
    Day(
      where: { date: { _gte: $startDate, _lte: $endDate } }
      order_by: { date: asc }
    ) {
      id
      date
      Reports(order_by: { confirmedTotal: desc }, limit: $limit) {
        id
        confirmedTotal
        recoveredTotal
        deathsTotal
        Day {
          date
        }
        Location {
          name
          id
        }
      }
    }
  }
`;

export const GET_COUNTRIES_ALL_REPORTS_BY_IDS = gql`
  query MyQuery($locationIds: [Int!]) {
    Location(where: { id: { _in: $locationIds } }) {
      id
      name
      Reports(order_by: { Day: { date: asc } }) {
        confirmedTotal
        confirmedNew
        deathsNew
        deathsTotal
        recoveredNew
        recoveredTotal
        Day {
          date
          id
        }
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query MyQuery {
    Day(order_by: { date: desc }, limit: 1) {
      reportId: id
      date
      Reports(
        where: { Location: { LocationType: { id: { _eq: 2 } } } }
        order_by: { confirmedTotal: desc_nulls_last }
      ) {
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

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
    Location(
      where: { locationTypeId: { _eq: 2 } }
      order_by: { Reports_aggregate: { max: { confirmedTotal: desc } } }
    ) {
      id
      name
      Reports(limit: 1, order_by: { confirmedTotal: desc_nulls_last }) {
        confirmedTotal
        recoveredTotal
        deathsTotal
      }
    }
  }
`;
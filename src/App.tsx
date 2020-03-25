import React from 'react';
import { GraphPage } from './components';

import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql'
});

function App() {
  client
    .query({
      query: gql`
        {
          Day {
            id
            date
            Reports_aggregate {
              aggregate {
                sum {
                  confirmedTotal
                }
              }
            }
          }
        }
      `
    })
    .then(result => console.log(result));
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <GraphPage />
      </div>
    </ApolloProvider>
  );
}

export default App;

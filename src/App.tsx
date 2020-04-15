import React from 'react';
import { GraphPage } from './components';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <GraphPage />
      </div>
    </ApolloProvider>
  );
}

export default App;

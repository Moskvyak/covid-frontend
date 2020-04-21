import React from 'react';
import { GraphPage } from './components';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ListOfCountries} from './components/ListOfCountries';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  })
);

function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <div className={classes.root}>
        <CssBaseline />
          <GraphPage />
      </div>
    </ApolloProvider>
  );
}

export default App;

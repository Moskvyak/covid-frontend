import React from 'react';
import ApolloClient from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LocalizationProvider } from '@material-ui/pickers';
import MomentUtils from '@material-ui/pickers/adapter/moment';


import { GraphPage } from './pages/GraphPage';
import { AboutPage } from './pages/AboutPage';
import { Menu } from './pages/Menu';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL
});
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      paddingTop: 20,
      flexDirection: 'column',
      height: 'calc(100% - 20px)',
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      }
    }
  })
);

function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={MomentUtils}>
        <Router>
          <Menu />
          <div className={classes.root}>
            <CssBaseline />
            <Switch>
              <Route path="/graphs" exact>
                <GraphPage />
              </Route>
              <Route path="/about" exact>
                <AboutPage />
              </Route>
              <Route path="/">
                <Redirect to="/graphs" />
              </Route>
              <Route path="*">
                <Redirect to="/graphs" />
              </Route>
            </Switch>
          </div>
        </Router>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;

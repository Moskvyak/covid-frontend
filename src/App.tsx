import React from 'react';
import ApolloClient from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink
} from 'react-router-dom';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LocalizationProvider } from '@material-ui/pickers';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';

import { GraphPage } from './pages/GraphPage';
import { AboutPage } from './pages/AboutPage';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL
});
const drawerWidth = 120;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    }
  })
);

function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={MomentUtils}>
        <Router>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            anchor="left"
          >
            <ListItem
              button
              component={NavLink}
              to="/graphs"
              activeClassName="Mui-selected"
              exact
            >
              Graphs
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to="/about"
              activeClassName="Mui-selected"
              exact
            >
              About
            </ListItem>
          </Drawer>
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

import React, { useState } from 'react';
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
import { useMediaQuery, useTheme } from '@material-ui/core';
import { LocalizationProvider } from '@material-ui/pickers';
import MomentUtils from '@material-ui/pickers/adapter/moment';

import { ChartRacePage } from './pages/ChartRacePage';
import { GraphPage } from './pages/GraphPage';
import { TrendsPage } from './pages/TrendsPage';
import { AboutPage } from './pages/AboutPage';
import { Menu } from './pages/Menu';
import { Topbar } from './pages/Topbar';

import { GraphModeContext } from './contexts/GraphModeContext';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 56,
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64
      }
    },
    shiftContent: {
      paddingLeft: 240
    },
    content: {
      height: '100%'
    }
  })
);

function App() {
  const classes = useStyles();
  const [graphMode, setGraphMode] = useState('confirmed');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  const updateMode = (mode: string) => {
    setGraphMode(mode);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  const variant = isDesktop ? 'persistent' : 'temporary';
  const rootClass = isDesktop
    ? `${classes.root} ${classes.shiftContent}`
    : classes.root;
  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={MomentUtils}>
        <GraphModeContext.Provider value={{ mode: graphMode, updateMode }}>
          <Router>
            <div className={rootClass}>
              <CssBaseline />
              <Topbar onSidebarOpen={handleSidebarOpen} />
              <Menu
                variant={variant}
                onMenuItemClick={handleSidebarClose}
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
              />
              <div className={classes.content}>
                <Switch>
                  <Route path="/chart-race" exact>
                    <ChartRacePage />
                  </Route>
                  <Route path="/timeline" exact>
                    <GraphPage />
                  </Route>
                  <Route path="/trends" exact>
                    <TrendsPage />
                  </Route>
                  <Route path="/about" exact>
                    <AboutPage />
                  </Route>
                  <Route path="/">
                    <Redirect to="/chart-race" />
                  </Route>
                  <Route path="*">
                    <Redirect to="/chart-race" />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
        </GraphModeContext.Provider>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;

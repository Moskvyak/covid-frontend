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
import Toolbar from '@material-ui/core/Toolbar';
import { useMediaQuery, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { LocalizationProvider } from '@material-ui/pickers';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import AppBar from '@material-ui/core/AppBar';

import { GraphPage } from './pages/GraphPage';
import { AboutPage } from './pages/AboutPage';
import { Menu } from './pages/Menu';
import { Topbar } from './pages/Topbar';

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

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  const variant = isDesktop ? 'persistent' : 'temporary';
  const rootClass = isDesktop? `${classes.root} ${classes.shiftContent}` : classes.root;
  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={MomentUtils}>
        <Router>
          <div className={rootClass}>
            <CssBaseline />
            <Topbar onSidebarOpen={handleSidebarOpen}/>
            <Menu
              variant={variant}
              onClose={handleSidebarClose}
              open={shouldOpenSidebar}
            />
            <div className={classes.content}>
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
          </div>
        </Router>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;

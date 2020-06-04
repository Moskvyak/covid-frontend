import React from 'react';

import { Theme, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../virus.svg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
    marginLeft: theme.spacing(3)
  }
}));

const routes: any = {
  '/trends': 'Trends',
  '/timeline': 'Timeline',
  '/about': 'About'
}

interface Props {
  onSidebarOpen(): void;
}

const Topbar: React.FC<Props> = (props: Props) => {
  const { onSidebarOpen } = props;
  const location = useLocation();
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <RouterLink to="/">
          <img width={40} height={40} alt="Logo" src={logo} />
        </RouterLink>

        <div className={classes.flexGrow}>
          <Hidden lgUp>
            <h1 className={classes.title}>
              {routes[location.pathname]}
            </h1>
          </Hidden>
        </div>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export { Topbar };

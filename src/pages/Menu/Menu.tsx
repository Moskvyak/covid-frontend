import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';

import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    menuItem: {
      fontSize: 20,
      paddingLeft: theme.spacing(2)
    },
    menuItemSelected: {
      color: theme.palette.primary.main
    },
    menuButton: {
      position: 'absolute',
      top: 4,
      left: 4
    },
    menuHeader: {
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      borderBottom: '1px solid #ccc'
    }
  })
);

const Menu: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const drawerVariant = !matches ? 'temporary' : 'permanent';

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant={drawerVariant}
        classes={{
          paper: classes.drawerPaper
        }}
        open={open}
        onClose={() => setOpen(false)}
        anchor="left"
      >
        <div>
          <Typography
            variant="h4"
            component="h1"
            className={classes.menuHeader}
          >
            COVID 19 info
          </Typography>
        </div>
        <ListItem
          button
          className={classes.menuItem}
          component={NavLink}
          to="/graphs"
          activeClassName={classes.menuItemSelected}
          exact
        >
          Graphs
        </ListItem>
        <ListItem
          button
          component={NavLink}
          className={classes.menuItem}
          to="/about"
          activeClassName={classes.menuItemSelected}
          exact
        >
          About
        </ListItem>
      </Drawer>
      {!matches &&
        !open &&
        <IconButton
          aria-label="menu"
          size="medium"
          className={classes.menuButton}
          onClick={() => setOpen(true)}
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>}
    </React.Fragment>
  );
};

export { Menu };

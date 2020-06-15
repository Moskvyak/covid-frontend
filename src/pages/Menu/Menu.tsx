import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';

import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      [theme.breakpoints.up('lg')]: {
        marginTop: 64,
        height: 'calc(100% - 64px)'
      }
    },
    root: {
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(2)
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
interface Props {
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary',
  onClose(): void;
  onMenuItemClick(): void;
}
const Menu: React.FC<Props> = (props: Props) => {
  const { open, variant, onClose, onMenuItemClick } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={onClose}
        open={open}
        variant={variant}
      >
        <div className={classes.root}>
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
          onClick={onMenuItemClick}
          className={classes.menuItem}
          component={NavLink}
          to="/chart-race"
          activeClassName={classes.menuItemSelected}
          exact
        >
          Chart Race (Beta)
        </ListItem>
        <ListItem
          button
          onClick={onMenuItemClick}
          className={classes.menuItem}
          component={NavLink}
          to="/timeline"
          activeClassName={classes.menuItemSelected}
          exact
        >
          Timeline
        </ListItem>
        <ListItem
          button
          onClick={onMenuItemClick}
          className={classes.menuItem}
          component={NavLink}
          to="/trends"
          activeClassName={classes.menuItemSelected}
          exact
        >
          Trends
        </ListItem>
        <ListItem
          button
          onClick={onMenuItemClick}
          component={NavLink}
          className={classes.menuItem}
          to="/about"
          activeClassName={classes.menuItemSelected}
          exact
        >
          About
        </ListItem>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export { Menu };

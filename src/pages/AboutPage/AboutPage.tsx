import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center'
    },
    link: {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'none'
      }
    },
    header: {
      marginBottom: theme.spacing(5)
    },
    section: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0.5)
    },
    imgContainer: {
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: 50,
      margin: theme.spacing(0.5)
    }
  })
);

const AboutPage: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h1" className={classes.header}>
        About
      </Typography>

      <Typography variant="body2" component="p" className={classes.section}>
        Data Source
      </Typography>
      <Link
        target="_blank"
        rel="noopener"
        className={classes.link}
        href="https://www.worldometers.info/coronavirus/"
      >
        <Button variant="outlined" color="default" startIcon={<LinkIcon />}>
          Worldometer
        </Button>
      </Link>

      <Typography variant="body2" component="p" className={classes.section}>
        Questions and suggestions
      </Typography>
      <Link
        target="_blank"
        rel="noopener"
        className={classes.link}
        href="https://github.com/Moskvyak/virus19.info"
      >
        <Button variant="outlined" color="default" startIcon={<GitHubIcon />}>
          Virus19.info Q&A
        </Button>
      </Link>

      <Typography variant="body2" component="p" className={classes.section}>
        Created by
      </Typography>
      <Link
        target="_blank"
        rel="noopener"
        className={classes.link}
        href="https://www.linkedin.com/in/artem-moskvyak-95b30ab4/"
      >
        <Button variant="outlined" color="primary" startIcon={<LinkedInIcon />}>
          Artem Moskvyak
        </Button>
      </Link>

      <Typography variant="body2" component="p" className={classes.section}>
        Tech stack
      </Typography>
      <div className={classes.imgContainer}>
        <img
          alt="material-ui"
          className={classes.image}
          src="https://s3-ap-southeast-2.amazonaws.com/skillmap-assets/images/material-ui.svg"
        />
        <img
          alt="react-js"
          className={classes.image}
          src="https://s3-ap-southeast-2.amazonaws.com/skillmap-assets/images/react.svg"
        />
        <img
          alt="graphql"
          className={classes.image}
          src="https://s3-ap-southeast-2.amazonaws.com/skillmap-assets/images/graphql.svg"
        />
        <img
          alt="postgres"
          className={classes.image}
          src="https://s3-ap-southeast-2.amazonaws.com/skillmap-assets/images/postgres.svg"
        />
      </div>
    </div>
  );
};

export { AboutPage };

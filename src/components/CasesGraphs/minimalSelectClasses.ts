import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: (colorStyles: any) => ({
      minWidth: 100,
      background: 'white',
      color: '#222',
      fontWeight: 500,
      borderStyle: 'solid',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 4,
      paddingLeft: 18.5,
      paddingTop: 10.5,
      paddingBottom: 10.5,
      ...colorStyles,
      '&:focus': {
        borderRadius: 4,
        background: 'white',
        borderColor: '#222'
      }
    }),

    icon: {
      color: theme.palette.primary.main,
      marginTop: 2,
      right: 12,
      position: 'absolute',
      userSelect: 'none',
      pointerEvents: 'none'
    },
    paper: {
      borderRadius: 12,
      marginTop: 8
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      background: 'white',
      '& li': {
        fontWeight: 400,
        paddingTop: 12,
        paddingBottom: 12
      },
      '& li:hover': {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main
      },
      '& li.Mui-selected': {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.dark
      },
      '& li.Mui-selected:hover': {
        background: theme.palette.primary.main
      }
    }
  })
);

export default useStyles;

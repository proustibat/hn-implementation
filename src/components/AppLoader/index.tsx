import React from 'react';
import {
  Backdrop,
  CircularProgress,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export const AppLoader = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default AppLoader;

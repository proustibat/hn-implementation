import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, LinearProgress, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import {requestStories} from '../../state/actions/storiesActions';
import { StoriesReducerType } from '../../state/reducers/storiesReducer';
import { RootReducersType } from '../../state/reducers';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(12),
  },
}));

export const Home = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    items: stories,
    loading: isLoadingStories,
  }: StoriesReducerType = useSelector(
    ({ stories }: RootReducersType) => stories,
  );

  const renderLoading = () => (
    <>
      <LinearProgress />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton variant="text" animation="wave" key={i} />
      ))}
    </>
  );

  useEffect(() => {
    dispatch(requestStories());
  }, [dispatch]);

  return (
    <>
      <Typography component="h1" variant="h1">
        {t('home-title')}
      </Typography>
      <Container maxWidth="sm" className={classes.root}>
        <Box>
          {isLoadingStories ? (
            renderLoading()
          ) : (
            <div>{stories.length > 0 && stories.join(' ')}</div>
          )}
        </Box>
      </Container>
    </>
  );
};
export default Home;

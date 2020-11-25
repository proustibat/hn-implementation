import React, { useEffect } from 'react';
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, LinearProgress, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { getStories } from '../../state/actions/storiesActions';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(12),
  },
}));

export const Home = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {items: stories, loading: isLoadingStories}: RootStateOrAny = useSelector<RootStateOrAny>(
    ({ stories: { items, loading } }) => ({items, loading}),
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
    dispatch(getStories());
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
            <div>STORIES {stories.join(' ')}</div>
          )}
        </Box>
      </Container>
    </>
  );
};
export default Home;

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  LinearProgress,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {
  requestStories,
  requestStory,
} from '../../state/actions/storiesActions';
import { StoriesReducerType } from '../../state/reducers/storiesReducer';
import { RootReducersType } from '../../state/reducers';
import StoryCard from '../../components/StoryCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(12),
    },
  }),
);

export const Home = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    items: stories,
    loading: isLoadingStories,
    loaded: isLoadedStories,
  }: StoriesReducerType = useSelector(
    ({ stories }: RootReducersType) => stories,
  );
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);

  // const oneOfThemIsLoading = useSelector(
  //   ({ stories: { items } }: RootReducersType) =>
  //     items.some(story => story.loading),
  // );
  const allDetailsLoaded = useSelector(
    ({ stories: { items } }: RootReducersType) =>
      items.every(story => story.loaded),
  );
  const fetchDetails = useCallback(async () => {
    if (!isLoadingDetails && !allDetailsLoaded) {
      setIsLoadingDetails(true);
      const promises = stories.map(story => dispatch(requestStory(story.id)));
      await Promise.all(promises);
      setIsLoadingDetails(false);
    }
  }, [dispatch, stories, isLoadingDetails, allDetailsLoaded]);

  // When component is mounted, load the stories
  useEffect(() => {
    dispatch(requestStories());
  }, [dispatch]);

  // When all the stories are loaded, load details for each
  useEffect(() => {
    isLoadedStories && fetchDetails();
  }, [isLoadedStories, fetchDetails]);

  return (
    <>
      <Container maxWidth="sm" className={classes.root}>
        <Typography component="h1" variant="h3">
          {t('home-title')}
        </Typography>
        <Box>
          {isLoadingStories ? (
            <LinearProgress />
          ) : (
            <div>
              {isLoadingDetails && <p>Loading details for each stories...</p>}
              {allDetailsLoaded && stories.length === 0
                ? t('no-content')
                : allDetailsLoaded && <p>All details are loaded</p>}

              {stories.length > 0 &&
                stories.map(story => <StoryCard key={story.id} {...story} />)}
            </div>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;

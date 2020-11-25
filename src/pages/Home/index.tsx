import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  requestStories,
  requestStory,
} from '../../state/actions/storiesActions';
import {
  StoriesReducerType,
  StoryProps,
} from '../../state/reducers/storiesReducer';
import { RootReducersType } from '../../state/reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(12),
    },
    card: {
      minWidth: 275,
      marginBottom: theme.typography.pxToRem(12),
    },
    type: {
      fontSize: theme.typography.pxToRem(14),
    },
    score: {
      marginBottom: theme.typography.pxToRem(12),
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
  // const [extractStories, setExtractStories] = useState<StoryProps[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);

  const allDetailsLoaded = useSelector(
    ({ stories: { items } }: RootReducersType) =>
      items.every(story => story.loaded),
  );

  // const oneOfThemIsLoading = useSelector(
  //   ({ stories: { items } }: RootReducersType) =>
  //     items.some(story => story.loading),
  // );

  const renderLoading = () => (
    <>
      <LinearProgress />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton variant="text" animation="wave" key={i} />
      ))}
    </>
  );

  // TODO: create a component in another file
  const renderStory = ({
    id,
    title,
    url,
    text,
    loading,
    type,
    score,
    loaded,
  }: StoryProps) => {
    return (
      <Card className={classes.card} key={id}>
        {!loaded && loading && <LinearProgress />}
        <CardContent>
          {loaded && !loading && (
            <>
              <Typography
                className={classes.type}
                color="textSecondary"
                gutterBottom
              >
                {type}
              </Typography>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
              <Typography className={classes.score} color="textSecondary">
                Score: {score}
              </Typography>
              <Typography variant="body2" component="p">
                {text}
              </Typography>
            </>
          )}
        </CardContent>
        {url && (
          <CardActions>
            <Button size="small" href={url}>
              Visit
            </Button>
          </CardActions>
        )}
      </Card>
    );
  };

  const fetchDetails = useCallback(async () => {
    if (!isLoadingDetails && !allDetailsLoaded) {
      setIsLoadingDetails(true);
      const promises = stories.map(story => dispatch(requestStory(story.id)));
      await Promise.all(promises);
      setIsLoadingDetails(false);
    }
  }, [dispatch, stories, isLoadingDetails, allDetailsLoaded]);

  // When component is mounter, load the stories
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
            renderLoading()
          ) : (
            <div>
              {isLoadingDetails && <p>Loading details for each stories...</p>}
              {allDetailsLoaded && <p>All details are loaded</p>}
              {stories.length > 0 && stories.map(story => renderStory(story))}
            </div>
          )}
        </Box>
      </Container>
    </>
  );
};
export default Home;

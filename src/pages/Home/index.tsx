import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  const allDetailsLoaded = useSelector(
    ({ stories: { items } }: RootReducersType) =>
      items.every(story => story.loaded),
  );

  const isLoadingDetails = useSelector(
    ({ stories: { items } }: RootReducersType) =>
      items.some(story => story.loading),
  );

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
    console.log('RENDER STORY');
    return (
      <Card className={classes.card} key={id}>
        <CardContent>
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
            {score}
          </Typography>
          <Typography variant="body2" component="p">
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <a rel="noreferrer" href={url} target="_blank">
              Visit
            </a>
          </Button>
        </CardActions>
      </Card>
    );
  };

  const fetchDetails = () => {
    // TODO: create a pagination system
    const extract = [...stories];
    extract.length = 10;
    Promise.all(extract.map(story => dispatch(requestStory(story.id))));
  };

  // When component is mounter, load the stories
  useEffect(() => {
    dispatch(requestStories());
  }, [dispatch]);

  // When all the stories are loaded, load details for each
  useEffect(() => {
    isLoadedStories && fetchDetails();
  }, [isLoadedStories]);

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
              {stories.length > 0 && stories.map(renderStory)}
            </div>
          )}
        </Box>
      </Container>
    </>
  );
};
export default Home;

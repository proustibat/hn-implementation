import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { StoryProps } from '../../state/reducers/storiesReducer';
import ChipKind from './ChipStoryType';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
      paddingBottom: theme.typography.pxToRem(4),
      marginBottom: theme.typography.pxToRem(12),
    },
    score: {
      marginBottom: theme.typography.pxToRem(12),
    },
  }),
);

const StoryCard = ({
  id,
  loading,
  title,
  url,
  text,
  type,
  score,
  loaded,
}: StoryProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={classes.root} key={id}>
      {loading && <LinearProgress />}
      <CardContent>
        {loaded && !loading && (
          <>
            {type && <ChipKind type={type} />}

            {title && (
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
            )}

            {score && (
              <Typography className={classes.score} color="textSecondary">
                {t('score')}: {score}
              </Typography>
            )}

            {text && (
              <Typography variant="body2" component="p">
                {text}
              </Typography>
            )}
          </>
        )}
      </CardContent>
      {url && (
        <CardActions>
          <Button
            target="_blank"
            size="small"
            href={url}
            variant="contained"
            color="primary"
          >
            {t('visit')}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
export default StoryCard;

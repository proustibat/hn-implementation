import React, { ReactElement } from 'react';
import { Chip } from '@material-ui/core';
import {
  Comment,
  Poll,
  RadioButtonChecked,
  Subject,
  Work,
} from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { StoryKindType } from '../../../state/reducers/storiesReducer';

export type ChipStoryTypeProps = { type: StoryKindType };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
    },
  }),
);

export const ChipStoryType = ({ type }: ChipStoryTypeProps) => {
  const classes = useStyles();
  const getIcon = () => {
    const rules = [
      {
        predicate: () => type === StoryKindType.job,
        process: () => <Work className={classes.root} />,
      },
      {
        predicate: () => type === StoryKindType.story,
        process: () => <Subject className={classes.root} />,
      },
      {
        predicate: () => type === StoryKindType.comment,
        process: () => <Comment className={classes.root} />,
      },
      {
        predicate: () => type === StoryKindType.poll,
        process: () => <Poll className={classes.root} />,
      },
      {
        predicate: () => type === StoryKindType.pollopt,
        process: () => <RadioButtonChecked className={classes.root} />,
      },
    ];

    return (rules.find(rule => rule.predicate()) as {
      process: () => ReactElement;
    }).process();
  };
  return (
    <Chip
      className={classes.root}
      label={type}
      variant="outlined"
      size="small"
      icon={getIcon()}
    />
  );
};

export default ChipStoryType;

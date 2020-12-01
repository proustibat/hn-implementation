// @ts-nocheck
// https://github.com/mui-org/material-ui/issues/14357
import * as MUIStyles from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core";
const makeStyles = (style: unknown) => (props: unknown) => {
  // Apply theme to classes
  const classes = typeof style === 'function' ? style(createMuiTheme()) : style;

  // Apply props to every class, which is every key of classes
  const classesByProps = {};
  Object.keys(classes).forEach(classKey => {
    classesByProps[classKey] =
      typeof classes[classKey] === 'function'
        ? classes[classKey](props)
        : classes[classKey];
  });

  const classesToString = {};
  Object.entries(classesByProps).forEach(entry => {
    const property = entry[0];
    if (property && entry.length > 0 && entry[1]) {
      classesToString[property] = Object.entries(entry[1])
        .map(
          styleEntries =>
            `${property}_${styleEntries[0]}-${styleEntries[1].toString()}`,
        )
        .join(' ');
    }
  });

  return classesToString;
};

module.exports = { ...MUIStyles, makeStyles };

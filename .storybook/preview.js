import React, { Suspense } from 'react';
import { addDecorator } from '@storybook/react';
import { withMuiTheme } from '@harelpls/storybook-addon-materialui';
import { withI18next } from "storybook-addon-i18next";
import themes from '../src/themes';
import i18n from "../src/i18n";
import { languages } from "./utils";

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true },
};

addDecorator(
  withMuiTheme({
    Brownwave: themes.Brownwave,
    Cralga: themes.Cralga,
    None: null,
  }),
);

addDecorator((story, context) => {
  try {
    return <Suspense fallback={<span>Please wait a little</span>}>{story(context)}</Suspense>;
  } catch (error) {
    return <span>{JSON.stringify(error)}</span>;
  }
});
addDecorator(
  withI18next({
    i18n,
    languages,
  })
);


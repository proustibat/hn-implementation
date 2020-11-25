# hn-implementation

[![CircleCI](https://circleci.com/gh/proustibat/hn-implementation.svg?style=shield)](https://circleci.com/gh/proustibat/hn-implementation)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Renovate enabled](https://img.shields.io/badge/RenovateBot-enabled-brightgreen.svg)](https://renovatebot.com/)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=proustibat_hn-implementation&metric=alert_status)](https://sonarcloud.io/dashboard?id=proustibat_hn-implementation)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=proustibat_hn-implementation&metric=coverage)](https://sonarcloud.io/dashboard?id=proustibat_hn-implementation)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=proustibat_hn-implementation&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=proustibat_hn-implementation)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=proustibat_hn-implementation&metric=code_smells)](https://sonarcloud.io/dashboard?id=proustibat_hn-implementation)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=proustibat_hn-implementation&metric=bugs)](https://sonarcloud.io/dashboard?id=proustibat_hn-implementation)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=proustibat_hn-implementation&metric=sqale_index)](https://sonarcloud.io/dashboard?id=proustibat_hn-implementation)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## DEMO
[![Live Demo Web App](https://img.shields.io/badge/Live%20Demo-%20Web%20App-brightgreen.svg)](https://hn-implementation.surge.sh)
[![Live Demo Storybook](https://img.shields.io/badge/Live%20Demo-%20Storybook-FF4785.svg)](https://storybook.hn-implementation.surge.sh)
[![Live Demo Coverage Report](https://img.shields.io/badge/Live%20Demo-%20Coverage-FFAE00.svg)](https://coverage.hn-implementation.surge.sh)

## REQUIREMENTS
Be sure [Node](https://nodejs.org/) and [NPM](https://www.npmjs.com/) are installed.

We also use [Yarn](https://classic.yarnpkg.com/), but you could use NPM instead.

If you work on multiple projects we recommend you to use [NVM](https://github.com/nvm-sh/nvm) to manage different node version. Since this project has a `.nvmrc` file, you can just run `npm use` to be sure to use the right version of Node.

## INSTALLATION
```
git clone git@github.com:proustibat/hn-implementation.git
cd hn-implementation
yarn
```

This will clone the repository then it will install needed packages and will make the web app ready to run for development.

## DEVELOPMENT
### Run the app locally
```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Internationalization
We use [react-i18next](https://react.i18next.com/), a powerful internationalization framework for React / React Native which is based on [i18next](https://www.i18next.com/).
You can find translation files in `./public/locales`.

With [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) we set the browser language as the default app language. You can run the app in another language by adding `?lng=XX`, for example: [https://hn-implementation.surge.sh/?lng=en](https://hn-implementation.surge.sh/?lng=en) or [https://hn-implementation.surge.sh/?lng=fr](https://hn-implementation.surge.sh/?lng=fr).


### Commits
This repo is Commitizen-friendly. It means you'll be prompted to fill out any required commit fields at commit time. 
Learn more about [commitizen cli](https://github.com/commitizen/cz-cli).

[Husky](https://typicode.github.io/husky) is used to enable `prepare-commit-msg` git hook. So you can just use `git commit` then follow the prompt of your terminal. 

### Linting
By using [pretty-quick](https://github.com/azz/pretty-quick) we run [Prettier](https://prettier.io/) on changed files before each commit (on the `pre-commit` git hook).

We added Prettier to the default linter used by create-react-app which is [ESLint](https://create-react-app.dev/docs/setting-up-your-editor/#extending-or-replacing-the-default-eslint-config).
Our configuration of Prettier allows ESLint to be used with Prettier because of [eslint-prettier](https://prettier.io/docs/en/integrating-with-linters.html). 
 
If you wanna run the linters by your own, you can run `yarn lint` that will run Prettier.

Please, be sure you also [configured your IDE correctly](https://create-react-app.dev/docs/setting-up-your-editor/).

## UNIT TESTING
```
yarn tdd
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## DESIGN SYSTEM
### Developing UI
We use [Storybook](https://storybook.js.org/docs/react/get-started/introduction) for UI development. It makes development faster and easier by isolating components.

Run it in watch mode in order to develop UIs:
```
yarn storybook
```
Then open [http://localhost:6006](http://localhost:6006) to view it in the browser.

You can write any stories file you want by writing them in a file with the `.stories.tsx` extension.

### Build and deploy the Storybook app
`yarn build-storybook` create a minified app ready to be deployed in `storybook-static` directory.

Our CI/CD run the build then deploy its content during the `deployments` job for the `main` branch on [https://storybook.hn-implementation.surge.sh](https://storybook.hn-implementation.surge.sh).
For other branches or pull requests, built storybook is in artifacts.

## PRODUCTION
```
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## CI/CD

### Config, workflow and jobs
We use [CircleCI](https://circleci.com/) to run jobs during the git flow.

The config is in the `.circleci/config.yml`.

The pipelines' history of the current project is available [on this dashboard](https://app.circleci.com/pipelines/github/proustibat/hn-implementation).

The `main` workflow runs 6 jobs: 
- `prepare`: installs node modules and save it to the current workspace
- `unit-testing`: requires prepare job, runs tests
- `sonar`: requires unit-testing, runs sonar-scanner
- `build-app`: requires prepare job
- `build-storybook`: requires prepare job
- `deployments`: runs different steps that require different build workflows. 

| *Main workflow on the main branch*                             | *Main workflow on a pull request*                                 |
:---------------------------------------------------------------:|:-----------------------------------------------------------------:|
| ![Main workflow on main branch](https://imgur.com/8kfQ7yj.png) | ![Main workflow on a pull request](https://imgur.com/18msrSv.png) |

### Deployments
#### The web app
We use [Surge](https://surge.sh/) to host our web app, a tool for static web publishing for frontend developers.
CircleCI deploys the app on [https://hn-implementation.surge.sh](https://hn-implementation.surge.sh/) after each push on the main branch. 

Note that you can deploy manually by running `yarn deploy`. 
Then you'll need to define your own domain. 
A surge token has been added to the [CircleCI variables environment](https://circleci.com/docs/2.0/env-vars/) in order to deploy on our [demo domain](https://hn-implementation.surge.sh).

Note the `predeploy` and `postddeploy` scripts. It's used to make the react routing [compliant with the surge config](https://surge.sh/help/adding-a-200-page-for-client-side-routing).

#### Coverage and unit test reports
Since `testing` job runs at each pull request or at each push on master, the job save junit report and coverage reports as artifacts.

Here is how it looks like on CircleCI dashboard:

| ![Junit Report](https://imgur.com/wbzhUNM.png) | ![Coverage](https://imgur.com/BWasQlj.png) |
:-----------------------------------------------:|:------------------------------------------:|

For the `main` branch, the coverage reports will be deployed on [https://coverage.hn-implementation.surge.sh](https://coverage.hn-implementation.surge.sh) by the CI/CD.

![Coverage](https://imgur.com/NmA2Ivz.png)

#### Storybook
As mentioned in the Storybook section, the design system is deployed at [https://storybook.hn-implementation.surge.sh](https://storybook.hn-implementation.surge.sh).

### Code quality tracking
We use [Sonarcloud](https://sonarcloud.io/documentation) to detect code quality issues, the maintainability, reliability and security of the code.
Visit the [public dashboard of the project](https://sonarcloud.io/dashboard?id=proustibat_hn-implementation).
The CI/CD runs the sonar scanner on each push.

![Sonarcloud job](https://imgur.com/DWXfc8m.png)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### About other used tools
- [Husky](https://typicode.github.io/husky)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Surge](https://surge.sh)
- [CircleCI](https://circleci.com)
- [Material-ui](https://material-ui.com/)
- [Storybook](https://storybook.js.org/)
- [react-i18next](https://react.i18next.com/)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

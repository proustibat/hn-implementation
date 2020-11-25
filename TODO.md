# MISSING STUFF

## Technical improvements

### Performances
- Save stories in the reducer in an object more than in an array.
- Load stories details by lot (maybe add a kind of pagination system), **you can't request 500 endpoints at the same time in real life!**

### Errors management
- Use axios middleware to catch error when requesting api
- Globally add an error logger (then plug a ool like Sentry for example)
- Display a snackbar or any visual element to inform user when an error ooccurs

## Feature enhancements
- Filters
- Sort
- Be able to load latest stories or top stories, etc. Ar just ASK, or job. Use more endpoints of the API!
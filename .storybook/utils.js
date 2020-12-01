const languagesNamesMap = { fr: "French", en: "English" };

export const languages = require
  .context("../public/locales", true, /\.json$/)
  .keys()
  .map((filename) => filename.substr(2).replace(/\.[^/.]+$/, ""))
  .reduce((languages, key) => {
    languages[key] = languagesNamesMap[key] || key;
    return languages;
  }, {});

/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/fr');
  require('@formatjs/intl-pluralrules/locale-data/en');
  require('@formatjs/intl-pluralrules/locale-data/es');
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/fr');
  require('@formatjs/intl-relativetimeformat/locale-data/en');
  require('@formatjs/intl-relativetimeformat/locale-data/es');
}

if (!Intl.NumberFormat) {
  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-numberformat/locale-data/fr');
  require('@formatjs/intl-numberformat/locale-data/en');
  require('@formatjs/intl-numberformat/locale-data/es');
}

const enTranslationMessages = require('./en.json');
const frTranslationMessages = require('./fr.json');
const esTranslationMessages = require('./es.json');

const DEFAULT_LOCALE = 'es';

// prettier-ignore
const appLocales = [
  'en',
  'fr',
  'es'
];

const formatTranslationMessages = (locale, messages) => {
  // console.warn(locale + "   " + JSON.stringify(messages));
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;

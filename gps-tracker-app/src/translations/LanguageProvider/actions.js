/*
 *
 * LanguageProvider actions
 *
 */

import * as types from './actionTypes';

export function changeLocale(locale,country, language) {
  return {
    type: types.CHANGE_LOCALE,
    locale: locale,
    country: country,
    language: language
  };
}

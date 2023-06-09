import { createSelector } from 'reselect';
import { initialState } from './initialState';

/**
 * Direct selector to the language domain
 */

const selectLanguage = (state) => state.languageReducer || initialState;

/**
 * Select the language locale
 */

const makeSelectLocale = () => createSelector(selectLanguage, (languageState) => {return {locale: languageState.locale, country: languageState.country, language: languageState.language}; });

export { selectLanguage, makeSelectLocale };

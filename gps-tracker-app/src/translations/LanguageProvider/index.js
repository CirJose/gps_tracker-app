/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from "react-redux";
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

export default function LanguageProvider(props) {
  // Consultar los datos (memoized) del lenguaje de la base del teléfono
  const lenguaje = useSelector(makeSelectLocale(), shallowEqual);

  return (
    <IntlProvider locale={lenguaje.locale} key={lenguaje.locale} messages={props.messages[lenguaje.language]}>
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};
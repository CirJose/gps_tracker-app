/*
 * Welcome Messages
 *
 * This contains all the text for the Welcome container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.navigation.Language';
export const commons = 'app.commons';

export default defineMessages({
  en:{
    id: `${scope}.en`,
    defaultMessage: "Inglés"
  },
  es:{
    id: `${scope}.es`,
    defaultMessage: "Español"
  },
  fr:{
    id: `${scope}.fr`,
    defaultMessage: "Francés"
  },
  btn_guardar:{
    id:`${commons}.btn_guardar`,
    defaultMessage: "Guardar"
  },
  idioma:{
    id:`${scope}.idioma`,
    defaultMessage: "Idioma"
  },
  region:{
    id:`${scope}.region`,
    defaultMessage: "País/Región"
  },
});

// import { DEFAULT_LOCALE } from "../i18n";
import initConfig from "../../configs/init.config";

export const initialState = {
    locale: initConfig.idioma.defaultLocale,
    country: initConfig.idioma.defaultCountry,
    language: 'es-EC' //DEFAULT_LOCALE
  };
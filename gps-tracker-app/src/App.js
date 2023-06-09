import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { useState, useMemo } from 'react';

import PublicNavigation from "./navigation/PublicNavigation";
import PrivateNavigation from "./navigation/PrivateNavigation";
import PrivateNavigationAdmin from "./navigation/PrivateNavigationAdmin";
import Loader from "./features/loader/containers";

import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import { esES } from '@mui/x-data-grid';



function App() {

  const isLoggedIn = useSelector(state => { return state.loginReducer.isLoggedIn });
  const isLoading = useSelector(state => { return state.loaderReducer.isLoading });
  const isAdmin = useSelector(state => { return state.loginReducer.userInfo.isAdmin });

  const [locale, setLocale] = useState('esES');

  const theme = useTheme();

  const themeWithLocale = useMemo(
    () => createTheme(
      theme,
      locales[locale],
      esES
    ),
    [locale, theme],
  );

  return (
    <>
      <ThemeProvider theme={themeWithLocale}>
        <Loader loading={isLoading} />
        {
          isLoggedIn ?
            isAdmin ?
              <PrivateNavigationAdmin></PrivateNavigationAdmin> :
              <PrivateNavigation></PrivateNavigation>
            :
            <PublicNavigation></PublicNavigation>
        }
      </ThemeProvider>
    </>
  );
}

export default App;

import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from './theme';
import createEmotionCache from './createEmotionCache';
import { UserProvider } from '@auth0/nextjs-auth0';
import NavBar from '../components/NavBar/NavBar'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <UserProvider>

    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar/>
          <Component {...pageProps} />
        </ThemeProvider>
    </CacheProvider>
    </UserProvider>

  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
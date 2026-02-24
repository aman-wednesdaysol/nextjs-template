import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import colors from '@themes/colors';
import globalStyle from '@app/global-styles';
import { Global } from '@emotion/react';
import { translationMessages, DEFAULT_LOCALE } from '@app/i18n';
import { wrapper } from '@app/configureStore';
import { getStoredToken } from '@utils/authStorage';
import { setAuthHeader } from '@utils/apiUtils';
import { ThemeProvider } from '@app/contexts/ThemeContext';
import PropTypes from 'prop-types';
import posthog from 'posthog-js';

const scTheme = { colors };

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      setAuthHeader('music', token);
    }
  }, []);

  return (
    <IntlProvider locale={DEFAULT_LOCALE} key={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <ThemeProvider>
        <SCThemeProvider theme={scTheme}>
          <Global styles={globalStyle} />
          <Component {...pageProps} />
        </SCThemeProvider>
      </ThemeProvider>
    </IntlProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
});

export default wrapper.withRedux(MyApp);

import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import colors from '@themes/colors';
import globalStyle from '@app/global-styles';
import { Global } from '@emotion/react';
import { translationMessages, DEFAULT_LOCALE } from '@app/i18n';
import { wrapper } from '@app/configureStore';
import PropTypes from 'prop-types';
import { authActionCreators } from '@app/containers/Auth/reducer';
import { themeActionCreators } from '@app/containers/Theme/reducer';
import {
  decodeJwtPayload,
  getStoredToken,
  getStoredUser,
  parseAuthHash
} from '@app/utils/authUtils';
import {
  selectCanUseApp,
  selectIsAuthenticated,
  selectNeedsEmailVerification
} from '@app/containers/Auth/selectors';
import MusicPlayer from '@app/components/MusicPlayer';

const theme = {
  colors
};

function handleMagicLinkLogin(dispatch, parsed) {
  if (!parsed?.accessToken) return false;

  const payload = decodeJwtPayload(parsed.accessToken);
  const email = payload?.email || null;

  const verifiedUser = {
    email,
    email_confirmed_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString()
  };

  dispatch(
    authActionCreators.loginSuccess(verifiedUser, parsed.accessToken)
  );

  window.history.replaceState(
    null,
    document.title,
    window.location.pathname + window.location.search
  );

  return true;
}

function restoreStoredSession(dispatch) {
  const token = getStoredToken();
  const user = getStoredUser();

  if (!token || !user) return;

  dispatch(authActionCreators.loginSuccess(user, token));
}

function bootstrapAuth(dispatch) {
  const parsed = parseAuthHash(window.location.hash);

  const handled = handleMagicLinkLogin(dispatch, parsed);
  if (handled) return;

  restoreStoredSession(dispatch);
}

function bootstrapTheme(dispatch) {
  const savedTheme = localStorage.getItem('theme') || 'light';

  document.documentElement.setAttribute('data-theme', savedTheme);
  dispatch(themeActionCreators.setTheme(savedTheme));
}

function handleRouteProtection({
  router,
  isAuthenticated,
  needsEmailVerification
}) {
  const publicPaths = ['/login', '/signup', '/verify-email'];
  const path = router.pathname;

  if (needsEmailVerification && path !== '/verify-email') {
    router.replace('/verify-email');
    return;
  }

  if (!isAuthenticated && !publicPaths.includes(path)) {
    router.replace('/login');
  }
}

/* -------------------------------------------------------------------------- */
/*                               APP CONTENT                                  */
/* -------------------------------------------------------------------------- */

function AppContent({ Component, pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuthenticated = useSelector(selectIsAuthenticated());
  const canUseApp = useSelector(selectCanUseApp());
  const needsEmailVerification = useSelector(
    selectNeedsEmailVerification()
  );

  const [bootstrapped, setBootstrapped] = useState(false);

  // App bootstrap (auth + theme)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    bootstrapAuth(dispatch);
    bootstrapTheme(dispatch);

    setBootstrapped(true);
  }, [dispatch]);

  // Route protection
  useEffect(() => {
    if (!bootstrapped) return;

    handleRouteProtection({
      router,
      isAuthenticated,
      needsEmailVerification
    });
  }, [
    bootstrapped,
    isAuthenticated,
    needsEmailVerification,
    router.pathname
  ]);

  const publicPaths = ['/login', '/signup', '/verify-email'];
  const showPlayer =
    canUseApp && !publicPaths.includes(router.pathname);

  return (
    <>
      <Component {...pageProps} />
      {showPlayer && <MusicPlayer />}
    </>
  );
}

AppContent.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};

/* -------------------------------------------------------------------------- */
/*                                   APP                                      */
/* -------------------------------------------------------------------------- */

function MyApp({ Component, pageProps, ...rest }) {
  return (
    <IntlProvider
      locale={DEFAULT_LOCALE}
      key={DEFAULT_LOCALE}
      messages={translationMessages[DEFAULT_LOCALE]}
    >
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <AppContent
          Component={Component}
          pageProps={pageProps}
          {...rest}
        />
      </ThemeProvider>
    </IntlProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default wrapper.withRedux(MyApp);

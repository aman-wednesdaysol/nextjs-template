import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '@utils/injectSaga';
import MusicVisual from '@components/MusicVisual';
import LoginForm from '@app/containers/Auth/LoginForm';
import { AuthPageWrapper, VisualPanel, FormPanel, FormPanelToggle, MobileBrand } from '@components/styled/authLayout';
import ThemeToggle from '@components/ThemeToggle';
import { authCreators } from '@app/containers/Auth/reducer';
import { selectAuthError, selectAuthLoading } from '@app/containers/Auth/selectors';
import saga from '@app/containers/Auth/saga';

export const LoginPage = ({ dispatchLogin, dispatchGoogleLogin, loading, error }) => (
  <AuthPageWrapper>
    <VisualPanel>
      <MusicVisual />
    </VisualPanel>
    <FormPanel>
      <FormPanelToggle>
        <ThemeToggle />
      </FormPanelToggle>
      <MobileBrand>MUSICA</MobileBrand>
      <LoginForm onSubmit={dispatchLogin} onGoogleSubmit={dispatchGoogleLogin} loading={loading} error={error} />
    </FormPanel>
  </AuthPageWrapper>
);

LoginPage.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  dispatchGoogleLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  error: selectAuthError(),
  loading: selectAuthLoading()
});

function mapDispatchToProps(dispatch) {
  const { requestLogin, requestGoogleLogin } = authCreators;
  return {
    dispatchLogin: (email, password) => dispatch(requestLogin(email, password)),
    dispatchGoogleLogin: () => dispatch(requestGoogleLogin())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'auth', saga }))(LoginPage);

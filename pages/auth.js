import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import LoginForm from '@app/components/Auth/LoginForm';
import SignupForm from '@app/components/Auth/SignupForm';
import { selectIsAuthenticated } from '@app/containers/Auth/selectors';
import injectSaga from '@utils/injectSaga';
import saga from '@app/containers/Auth/saga';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  padding: 20px;
`;

function AuthPage({ isAuthenticated, mode = 'login' }) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const currentMode = router.query.mode || mode;

  return (
    <PageContainer>
      {currentMode === 'signup' ? <SignupForm /> : <LoginForm />}
    </PageContainer>
  );
}

AuthPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  mode: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated()
});

export default compose(connect(mapStateToProps), injectSaga({ key: 'auth', saga }))(AuthPage);

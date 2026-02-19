/**
 *
 * SignupForm Component
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { authActionCreators } from '@app/containers/Auth/reducer';
import {
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
  selectNeedsEmailVerification
} from '@app/containers/Auth/selectors';

const FormContainer = styled.form`
  width: 100%;
  max-width: 420px;
  padding: 48px;
  background: transparent;
  transition: all var(--transition-base);

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  animation: fadeInUp 0.6s ease 0.2s forwards;
  opacity: 0;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text);
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: 32px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--color-text);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: inherit;
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 13px;
  margin-top: 8px;
  padding: 8px;
  background-color: rgba(220, 53, 69, 0.1);
  border-radius: 6px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  background-color: var(--color-accent);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: 8px;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: var(--color-text-secondary);

  a {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export function SignupForm({ onSignup, loading, error, isAuthenticated, needsEmailVerification }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (needsEmailVerification) {
      router.push('/verify-email');
    }
  }, [needsEmailVerification, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onSignup(email, password);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} data-testid="signup-form">
      <Title>Create Account</Title>
      <Subtitle>Sign up to get started</Subtitle>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </SubmitButton>
      <LinkText>
        Already have an account? <a href="/login">Sign in</a>
      </LinkText>
    </FormContainer>
  );
}

SignupForm.propTypes = {
  onSignup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  needsEmailVerification: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading(),
  error: selectAuthError(),
  isAuthenticated: selectIsAuthenticated(),
  needsEmailVerification: selectNeedsEmailVerification()
});

const mapDispatchToProps = (dispatch) => ({
  onSignup: (email, password) => dispatch(authActionCreators.signupRequest(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import posthog from 'posthog-js';
import { GoogleOutlined } from '@ant-design/icons';
import {
  FormCard,
  FormTitle,
  FormSubtitle,
  InputWrapper,
  InputLabel,
  StyledInput,
  SubmitButton,
  SwitchText,
  SwitchLink,
  ErrorMessage,
  GoogleButton,
  Separator
} from '@components/styled/authForm';

const LoginForm = ({ onSubmit, onGoogleSubmit, loading, error }) => {
  const [googleLoginVariant, setGoogleLoginVariant] = useState(null);

  useEffect(() => {
    setGoogleLoginVariant(posthog.getFeatureFlag('google-login'));
  }, []);

  useEffect(() => {
    if (googleLoginVariant) {
      posthog.capture('$feature_flag_called', {
        $feature_flag: 'google-login',
        $feature_flag_response: googleLoginVariant
      });
    }
  }, [googleLoginVariant]);

  const isGoogleLoginEnabled = googleLoginVariant === 'test';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  const handleGoogleClick = () => {
    posthog.capture('google_signin_clicked', {
      variant: googleLoginVariant
    });
    onGoogleSubmit();
  };

  return (
    <FormCard>
      <FormTitle>Welcome back</FormTitle>
      <FormSubtitle>Sign in to continue your musical journey</FormSubtitle>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputLabel htmlFor="login-email">Email</InputLabel>
          <StyledInput
            id="login-email"
            data-testid="login-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel htmlFor="login-password">Password</InputLabel>
          <StyledInput
            id="login-password"
            data-testid="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrapper>
        {error && <ErrorMessage data-testid="login-error">{error}</ErrorMessage>}
        <SubmitButton type="submit" disabled={loading} data-testid="login-submit">
          {loading ? 'Signing in...' : 'Sign In'}
        </SubmitButton>
      </form>
      {isGoogleLoginEnabled && (
        <>
          <Separator>OR</Separator>
          <GoogleButton onClick={handleGoogleClick} data-testid="google-login-button">
            <GoogleOutlined /> Sign in with Google
          </GoogleButton>
        </>
      )}
      <SwitchText>
        Don&apos;t have an account?{' '}
        <Link href="/signup" passHref legacyBehavior>
          <SwitchLink>Create one</SwitchLink>
        </Link>
      </SwitchText>
    </FormCard>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onGoogleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default LoginForm;

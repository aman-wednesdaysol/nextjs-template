import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';
import { selectPendingEmail } from '@app/containers/Auth/selectors';

const shimmer = keyframes`
  0% { transform: translateX(-30%) rotate(12deg); opacity: 0.2; }
  50% { opacity: 0.35; }
  100% { transform: translateX(130%) rotate(12deg); opacity: 0.2; }
`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background: var(--color-background);
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 720px;
  border-radius: 20px;
  padding: 40px;
  border: 1px solid var(--color-border);
  background: linear-gradient(160deg, var(--color-background-secondary) 0%, var(--color-background) 100%);
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  overflow: hidden;
`;

const Shimmer = styled.div`
  position: absolute;
  inset: -40% -60%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  animation: ${shimmer} 3.5s ease-in-out infinite;
  pointer-events: none;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
`;

const Sub = styled.p`
  margin: 0 0 24px;
  color: var(--color-text-secondary);
  font-size: 15px;
  line-height: 1.6;
`;

const EmailPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
  font-size: 13px;
  margin-bottom: 18px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  font-family: inherit;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-muted);
  }
`;

const Primary = styled(Button)`
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;

  &:hover {
    opacity: 0.95;
    box-shadow: 0 0 0 3px var(--color-accent-muted);
  }
`;

function VerifyEmailPage({ pendingEmail }) {
  const router = useRouter();
  const mailto = pendingEmail ? `mailto:${pendingEmail}` : 'mailto:';

  return (
    <Page>
      <Card>
        <Shimmer />
        <Title>Verify your email</Title>
        <Sub>
          We’ve sent you a verification link. Please open your inbox and click the link to activate your account.
          Until you verify, you won’t be able to use the application.
        </Sub>
        {pendingEmail && <EmailPill>📩 {pendingEmail}</EmailPill>}
        <Sub>
          After you click the link, you’ll be redirected back here and automatically signed in.
        </Sub>
        <Actions>
          <Primary onClick={() => window.open(mailto, '_self')}>Open email</Primary>
          <Button onClick={() => router.push('/login')}>Back to login</Button>
        </Actions>
      </Card>
    </Page>
  );
}

VerifyEmailPage.propTypes = {
  pendingEmail: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  pendingEmail: selectPendingEmail()
});

export default connect(mapStateToProps)(VerifyEmailPage);


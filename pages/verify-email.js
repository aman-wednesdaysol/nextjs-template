import React from 'react';
import Link from 'next/link';
import { CheckCircleFilled } from '@ant-design/icons';
import MusicVisual from '@components/MusicVisual';
import { AuthPageWrapper, VisualPanel, FormPanel, FormPanelToggle, MobileBrand } from '@components/styled/authLayout';
import { FormCard, FormTitle, FormSubtitle, IconWrapper, SuccessText, SubmitButton } from '@components/styled/authForm';
import ThemeToggle from '@components/ThemeToggle';

const VerifyEmailPage = () => {
  return (
    <AuthPageWrapper>
      <VisualPanel>
        <MusicVisual />
      </VisualPanel>
      <FormPanel>
        <FormPanelToggle>
          <ThemeToggle />
        </FormPanelToggle>
        <MobileBrand>MUSICA</MobileBrand>
        <FormCard>
          <IconWrapper>
            <CheckCircleFilled />
          </IconWrapper>
          <FormTitle data-testid="verify-email-title" style={{ textAlign: 'center' }}>
            Check your email
          </FormTitle>
          <FormSubtitle style={{ textAlign: 'center' }}>We&apos;ve sent a magic link to your inbox</FormSubtitle>
          <SuccessText>
            Please check your email and click the link to verify your account. It might take a minute to arrive.
          </SuccessText>
          <Link href="/login" passHref legacyBehavior>
            <SubmitButton as="a">Back to Sign in</SubmitButton>
          </Link>
        </FormCard>
      </FormPanel>
    </AuthPageWrapper>
  );
};

export default VerifyEmailPage;

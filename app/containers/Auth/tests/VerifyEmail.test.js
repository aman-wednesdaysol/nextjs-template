import React from 'react'
import { renderProvider } from '@utils/testUtils'
import { CheckCircleFilled } from '@ant-design/icons'
import {
  FormCard,
  FormTitle,
  FormSubtitle,
  IconWrapper,
  SuccessText,
  SubmitButton
} from '@components/styled/authForm'

describe('VerifyEmail UI tests', () => {
  it('should render the verification success components correctly', () => {
    const { getByText } = renderProvider(
      <FormCard>
        <IconWrapper>
          <CheckCircleFilled data-testid='success-icon' />
        </IconWrapper>
        <FormTitle>Check your email</FormTitle>
        <FormSubtitle>Verification link sent</FormSubtitle>
        <SuccessText>
          Please check your email and click the link to verify your account.
        </SuccessText>
        <SubmitButton>Back to Sign in</SubmitButton>
      </FormCard>
    )

    expect(getByText('Check your email')).toBeInTheDocument()
    expect(getByText('Verification link sent')).toBeInTheDocument()
    expect(getByText(/Please check your email/i)).toBeInTheDocument()
  })
})

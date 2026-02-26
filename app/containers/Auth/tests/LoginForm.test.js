import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import LoginForm from '../LoginForm'
import posthog from 'posthog-js'

jest.mock('posthog-js', () => ({
  getFeatureFlag: jest.fn(),
  capture: jest.fn()
}))

describe('<LoginForm />', () => {
  const mockSubmit = jest.fn()
  const mockGoogleSubmit = jest.fn()
  const defaultProps = {
    onSubmit: mockSubmit,
    onGoogleSubmit: mockGoogleSubmit,
    loading: false,
    error: null
  }

  beforeEach(() => {
    mockSubmit.mockClear()
    mockGoogleSubmit.mockClear()
    posthog.getFeatureFlag.mockClear()
    posthog.capture.mockClear()
  })

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<LoginForm {...defaultProps} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render email and password inputs', () => {
    const { getByTestId } = renderProvider(<LoginForm {...defaultProps} />)
    expect(getByTestId('login-email')).toBeTruthy()
    expect(getByTestId('login-password')).toBeTruthy()
  })

  it('should call onSubmit with email and password', () => {
    const { getByTestId } = renderProvider(<LoginForm {...defaultProps} />)
    fireEvent.change(getByTestId('login-email'), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(getByTestId('login-password'), {
      target: { value: 'pass123' }
    })
    fireEvent.click(getByTestId('login-submit'))
    expect(mockSubmit).toHaveBeenCalledWith('test@test.com', 'pass123')
  })

  it('should display error message when error prop is set', () => {
    const props = { ...defaultProps, error: 'Invalid credentials' }
    const { getByTestId } = renderProvider(<LoginForm {...props} />)
    expect(getByTestId('login-error').textContent).toBe('Invalid credentials')
  })

  it('should disable submit button when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<LoginForm {...props} />)
    expect(getByTestId('login-submit')).toBeDisabled()
  })

  it('should show loading text when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<LoginForm {...props} />)
    expect(getByTestId('login-submit').textContent).toBe('Signing in...')
  })

  describe('PostHog A/B Testing', () => {
    it('should not show Google button when variant is "control"', () => {
      posthog.getFeatureFlag.mockReturnValue('control')
      const { queryByTestId } = renderProvider(<LoginForm {...defaultProps} />)
      expect(queryByTestId('google-login-button')).toBeNull()
    })

    it('should show Google button when variant is "test"', () => {
      posthog.getFeatureFlag.mockReturnValue('test')
      const { getByTestId } = renderProvider(<LoginForm {...defaultProps} />)
      expect(getByTestId('google-login-button')).toBeTruthy()
    })

    it('should capture exposure event when variant is identified', () => {
      posthog.getFeatureFlag.mockReturnValue('test')
      renderProvider(<LoginForm {...defaultProps} />)
      expect(posthog.capture).toHaveBeenCalledWith('$feature_flag_called', {
        $feature_flag: 'google-login',
        $feature_flag_response: 'test'
      })
    })

    it('should capture click event and call onGoogleSubmit when Google button is clicked', () => {
      posthog.getFeatureFlag.mockReturnValue('test')
      const { getByTestId } = renderProvider(<LoginForm {...defaultProps} />)
      fireEvent.click(getByTestId('google-login-button'))

      expect(posthog.capture).toHaveBeenCalledWith('google_signin_clicked', {
        variant: 'test'
      })
      expect(mockGoogleSubmit).toHaveBeenCalledTimes(1)
    })
  })
})

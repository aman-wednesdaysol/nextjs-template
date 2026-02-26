import { takeLatest, call, put } from 'redux-saga/effects'
import { loginUser, signupUser } from '@services/authApi'
import { apiResponseGenerator } from '@utils/testUtils'
import authSaga, { handleLogin, handleSignup } from '../saga'
import { authTypes } from '../reducer'

jest.mock('@utils/authStorage', () => ({
  setStoredToken: jest.fn()
}))

jest.mock('@utils/apiUtils', () => ({
  setAuthHeader: jest.fn(),
  generateApiClient: () => ({
    post: jest.fn().mockResolvedValue({ ok: true, data: {} })
  })
}))

jest.mock('next/router', () => ({
  push: jest.fn()
}))

const { setStoredToken } = require('@utils/authStorage')
const { setAuthHeader } = require('@utils/apiUtils')
const Router = require('next/router')

describe('Auth saga tests', () => {
  const generator = authSaga()

  it('should watch for REQUEST_LOGIN action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(authTypes.REQUEST_LOGIN, handleLogin)
    )
  })

  it('should watch for REQUEST_SIGNUP action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(authTypes.REQUEST_SIGNUP, handleSignup)
    )
  })

  describe('handleLogin', () => {
    const action = { email: 'test@test.com', password: 'pass123' }

    beforeEach(() => jest.clearAllMocks())

    it('should dispatch SUCCESS_AUTH on successful login', () => {
      const gen = handleLogin(action)
      const res = gen.next().value
      expect(res).toEqual(
        call(loginUser, { email: action.email, password: action.password })
      )
      const successData = { accessToken: 'abc123' }
      expect(gen.next(apiResponseGenerator(true, successData)).value).toEqual(
        put({ type: authTypes.SUCCESS_AUTH, data: successData })
      )
      // Continue generator to cover persistToken + Router.push
      gen.next()
      expect(setStoredToken).toHaveBeenCalledWith('abc123')
      expect(setAuthHeader).toHaveBeenCalledWith('music', 'abc123')
      expect(Router.push).toHaveBeenCalledWith('/')
    })

    it('should not persist token when accessToken is missing', () => {
      const gen = handleLogin(action)
      gen.next()
      const successData = { user: 'test' }
      gen.next(apiResponseGenerator(true, successData))
      gen.next()
      expect(setStoredToken).not.toHaveBeenCalled()
    })

    it('should dispatch FAILURE_AUTH on failed login', () => {
      const gen = handleLogin(action)
      gen.next()
      const errorData = { message: 'Invalid credentials' }
      expect(gen.next(apiResponseGenerator(false, errorData)).value).toEqual(
        put({ type: authTypes.FAILURE_AUTH, error: errorData })
      )
    })
  })

  describe('handleSignup', () => {
    const action = { email: 'test@test.com', password: 'pass123' }

    beforeEach(() => jest.clearAllMocks())

    it('should dispatch SUCCESS_AUTH on successful signup', () => {
      const gen = handleSignup(action)
      const res = gen.next().value
      expect(res).toEqual(
        call(signupUser, {
          email: action.email,
          password: action.password
        })
      )
      const successData = { accessToken: 'abc123' }
      expect(gen.next(apiResponseGenerator(true, successData)).value).toEqual(
        put({ type: authTypes.SUCCESS_AUTH, data: successData })
      )
      gen.next()
      expect(setStoredToken).not.toHaveBeenCalled()
      expect(Router.push).toHaveBeenCalledWith('/verify-email')
    })

    it('should not persist token when data is null', () => {
      const gen = handleSignup(action)
      gen.next()
      gen.next(apiResponseGenerator(true, null))
      gen.next()
      expect(setStoredToken).not.toHaveBeenCalled()
    })

    it('should dispatch FAILURE_AUTH on failed signup', () => {
      const gen = handleSignup(action)
      gen.next()
      const errorData = { message: 'Email already exists' }
      expect(gen.next(apiResponseGenerator(false, errorData)).value).toEqual(
        put({ type: authTypes.FAILURE_AUTH, error: errorData })
      )
    })
  })
})

const mockPost = jest.fn().mockResolvedValue({ ok: true, data: {} })

jest.mock('@utils/apiUtils', () => ({
  generateApiClient: () => ({
    post: mockPost
  })
}))

describe('authApi', () => {
  let loginUser, signupUser

  beforeAll(() => {
    const api = require('../authApi')
    loginUser = api.loginUser
    signupUser = api.signupUser
  })

  beforeEach(() => mockPost.mockClear())

  it('should call loginUser', async () => {
    await loginUser({ email: 'a@b.com', password: '123' })
    expect(mockPost).toHaveBeenCalledWith('/login', {
      email: 'a@b.com',
      password: '123'
    })
  })

  it('should call signupUser', async () => {
    await signupUser({ email: 'a@b.com', password: '123' })
    expect(mockPost).toHaveBeenCalledWith('/signup', {
      email: 'a@b.com',
      password: '123'
    })
  })
})

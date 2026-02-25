import { searchSongs, fetchTrackDetails } from '../musicApi'

jest.mock('@utils/apiUtils', () => ({
  generateApiClient: () => ({
    get: jest.fn().mockResolvedValue({ ok: true, data: {} })
  })
}))

describe('musicApi', () => {
  it('should call searchSongs with term only', async () => {
    const result = await searchSongs({ term: 'hello' })
    expect(result).toBeDefined()
  })

  it('should call searchSongs with limit and offset', async () => {
    const result = await searchSongs({ term: 'test', limit: 10, offset: 20 })
    expect(result).toBeDefined()
  })

  it('should call searchSongs with no term', async () => {
    const result = await searchSongs({})
    expect(result).toBeDefined()
  })

  it('should call searchSongs with limit but no offset', async () => {
    const result = await searchSongs({ term: 'a', limit: 5 })
    expect(result).toBeDefined()
  })

  it('should call searchSongs with offset but no limit', async () => {
    const result = await searchSongs({ term: 'a', offset: 10 })
    expect(result).toBeDefined()
  })

  it('should call fetchTrackDetails', async () => {
    const result = await fetchTrackDetails(123)
    expect(result).toBeDefined()
  })
})

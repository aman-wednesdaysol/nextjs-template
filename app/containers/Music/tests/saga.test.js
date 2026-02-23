import { takeLatest, call, put } from 'redux-saga/effects'
import { searchSongs } from '@services/musicApi'
import { apiResponseGenerator } from '@utils/testUtils'
import musicSaga, {
  handleSearchSongs,
  handleLoadMore,
  extractNextOffset
} from '../saga'
import { musicTypes } from '../reducer'
import { MUSIC_PAYLOAD, DEFAULT_PAGE_LIMIT } from '../constants'
// selectors tested via saga generator steps (type === 'SELECT')

describe('Music saga tests', () => {
  const generator = musicSaga()

  it('should watch for REQUEST_SEARCH_SONGS action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(musicTypes.REQUEST_SEARCH_SONGS, handleSearchSongs)
    )
  })

  it('should watch for REQUEST_LOAD_MORE action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(musicTypes.REQUEST_LOAD_MORE, handleLoadMore)
    )
  })

  describe('extractNextOffset', () => {
    it('should return number from header', () => {
      expect(extractNextOffset({ 'x-next-offset': '20' })).toBe(20)
    })

    it('should return null when header is missing', () => {
      expect(extractNextOffset({})).toBe(null)
    })

    it('should return null when headers is undefined', () => {
      expect(extractNextOffset(undefined)).toBe(null)
    })
  })

  describe('handleSearchSongs', () => {
    const action = { [MUSIC_PAYLOAD.SEARCH_TERM]: 'senorita' }

    it('should dispatch SUCCESS on successful search', () => {
      const gen = handleSearchSongs(action)
      expect(gen.next().value).toEqual(
        call(searchSongs, { term: 'senorita', limit: DEFAULT_PAGE_LIMIT })
      )
      const songs = [{ trackId: 1, trackName: 'Señorita' }]
      const headers = { 'x-next-offset': '20' }
      expect(
        gen.next(apiResponseGenerator(true, songs, headers)).value
      ).toEqual(
        put({
          type: musicTypes.SUCCESS_SEARCH_SONGS,
          data: songs,
          nextOffset: 20
        })
      )
    })

    it('should dispatch FAILURE on failed search', () => {
      const gen = handleSearchSongs(action)
      gen.next()
      const errorData = { message: 'Search failed' }
      expect(gen.next(apiResponseGenerator(false, errorData)).value).toEqual(
        put({ type: musicTypes.FAILURE_SEARCH_SONGS, error: errorData })
      )
    })
  })

  describe('handleLoadMore', () => {
    it('should select term and offset then fetch more', () => {
      const gen = handleLoadMore()
      const selectStep1 = gen.next().value
      expect(selectStep1.type).toBe('SELECT')
      const selectStep2 = gen.next('senorita').value
      expect(selectStep2.type).toBe('SELECT')
      expect(gen.next(20).value).toEqual(
        call(searchSongs, {
          term: 'senorita',
          limit: DEFAULT_PAGE_LIMIT,
          offset: 20
        })
      )
      const songs = [{ trackId: 2 }]
      const headers = { 'x-next-offset': '40' }
      expect(
        gen.next(apiResponseGenerator(true, songs, headers)).value
      ).toEqual(
        put({ type: musicTypes.SUCCESS_LOAD_MORE, data: songs, nextOffset: 40 })
      )
    })

    it('should dispatch FAILURE_LOAD_MORE on error', () => {
      const gen = handleLoadMore()
      gen.next()
      gen.next('senorita')
      gen.next(20)
      const errorData = { message: 'Failed' }
      expect(gen.next(apiResponseGenerator(false, errorData)).value).toEqual(
        put({ type: musicTypes.FAILURE_LOAD_MORE, error: errorData })
      )
    })
  })
})

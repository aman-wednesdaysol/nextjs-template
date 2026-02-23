import { PAYLOAD } from '@app/utils/reducer'
import { musicReducer, initialState, musicTypes } from '../reducer'
import { MUSIC_PAYLOAD } from '../constants'

describe('Music reducer tests', () => {
  let state
  beforeEach(() => {
    state = initialState
  })

  it('should return the initial state', () => {
    expect(musicReducer(undefined, {})).toEqual(state)
  })

  it('should set loading and searchTerm on REQUEST_SEARCH_SONGS', () => {
    const expected = {
      ...state,
      loading: true,
      error: null,
      searchTerm: 'senorita'
    }
    expect(
      musicReducer(state, {
        type: musicTypes.REQUEST_SEARCH_SONGS,
        [MUSIC_PAYLOAD.SEARCH_TERM]: 'senorita'
      })
    ).toEqual(expected)
  })

  it('should set songs on SUCCESS_SEARCH_SONGS', () => {
    const songs = [{ trackId: 1, trackName: 'Song' }]
    const expected = { ...state, songs, loading: false }
    expect(
      musicReducer(state, {
        type: musicTypes.SUCCESS_SEARCH_SONGS,
        [PAYLOAD.DATA]: songs
      })
    ).toEqual(expected)
  })

  it('should set error on FAILURE_SEARCH_SONGS', () => {
    const expected = {
      ...state,
      [PAYLOAD.ERROR]: 'something_went_wrong',
      loading: false
    }
    expect(
      musicReducer(state, { type: musicTypes.FAILURE_SEARCH_SONGS })
    ).toEqual(expected)
  })

  it('should set currentSong and isPlaying on SET_CURRENT_SONG', () => {
    const song = { trackId: 1, trackName: 'Song' }
    const expected = { ...state, currentSong: song, isPlaying: true }
    expect(
      musicReducer(state, {
        type: musicTypes.SET_CURRENT_SONG,
        [MUSIC_PAYLOAD.CURRENT_SONG]: song
      })
    ).toEqual(expected)
  })

  it('should set isPlaying on SET_IS_PLAYING', () => {
    const expected = { ...state, isPlaying: true }
    expect(
      musicReducer(state, {
        type: musicTypes.SET_IS_PLAYING,
        [MUSIC_PAYLOAD.IS_PLAYING]: true
      })
    ).toEqual(expected)
  })

  it('should reset pagination on REQUEST_SEARCH_SONGS', () => {
    const modified = { ...state, nextOffset: 20, hasMore: true }
    const result = musicReducer(modified, {
      type: musicTypes.REQUEST_SEARCH_SONGS,
      [MUSIC_PAYLOAD.SEARCH_TERM]: 'test'
    })
    expect(result.nextOffset).toBe(null)
    expect(result.hasMore).toBe(false)
  })

  it('should set nextOffset and hasMore on SUCCESS_SEARCH_SONGS', () => {
    const songs = [{ trackId: 1 }]
    const result = musicReducer(state, {
      type: musicTypes.SUCCESS_SEARCH_SONGS,
      [PAYLOAD.DATA]: songs,
      [MUSIC_PAYLOAD.NEXT_OFFSET]: 20
    })
    expect(result.songs).toEqual(songs)
    expect(result.nextOffset).toBe(20)
    expect(result.hasMore).toBe(true)
  })

  it('should set loadingMore on REQUEST_LOAD_MORE', () => {
    const result = musicReducer(state, { type: musicTypes.REQUEST_LOAD_MORE })
    expect(result.loadingMore).toBe(true)
  })

  it('should append songs on SUCCESS_LOAD_MORE', () => {
    const existing = { ...state, songs: [{ trackId: 1 }] }
    const newSongs = [{ trackId: 2 }]
    const result = musicReducer(existing, {
      type: musicTypes.SUCCESS_LOAD_MORE,
      [PAYLOAD.DATA]: newSongs,
      [MUSIC_PAYLOAD.NEXT_OFFSET]: 40
    })
    expect(result.songs).toEqual([{ trackId: 1 }, { trackId: 2 }])
    expect(result.nextOffset).toBe(40)
    expect(result.hasMore).toBe(true)
    expect(result.loadingMore).toBe(false)
  })

  it('should set hasMore false when no nextOffset on load more', () => {
    const result = musicReducer(state, {
      type: musicTypes.SUCCESS_LOAD_MORE,
      [PAYLOAD.DATA]: [],
      [MUSIC_PAYLOAD.NEXT_OFFSET]: null
    })
    expect(result.hasMore).toBe(false)
  })

  it('should set error on FAILURE_LOAD_MORE', () => {
    const result = musicReducer(state, {
      type: musicTypes.FAILURE_LOAD_MORE,
      [PAYLOAD.ERROR]: 'failed'
    })
    expect(result.loadingMore).toBe(false)
    expect(result.error).toBe('failed')
  })

  it('should reset state on CLEAR_MUSIC', () => {
    const modified = { ...state, songs: [{ trackId: 1 }], loading: true }
    expect(musicReducer(modified, { type: musicTypes.CLEAR_MUSIC })).toEqual(
      initialState
    )
  })
})

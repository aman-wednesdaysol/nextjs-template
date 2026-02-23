import {
  selectMusicSongs,
  selectMusicLoading,
  selectMusicError,
  selectCurrentSong,
  selectSearchTerm,
  selectIsPlaying,
  selectNextOffset,
  selectHasMore,
  selectLoadingMore
} from '../selectors'

describe('Music selector tests', () => {
  let mockedState

  beforeEach(() => {
    mockedState = {
      music: {
        songs: [{ trackId: 1, trackName: 'Test Song' }],
        loading: true,
        error: 'Some error',
        currentSong: { trackId: 1 },
        searchTerm: 'test',
        isPlaying: true,
        nextOffset: 20,
        hasMore: true,
        loadingMore: false
      }
    }
  })

  it('should select songs', () => {
    expect(selectMusicSongs()(mockedState)).toEqual(mockedState.music.songs)
  })

  it('should select loading', () => {
    expect(selectMusicLoading()(mockedState)).toBe(true)
  })

  it('should select error', () => {
    expect(selectMusicError()(mockedState)).toBe('Some error')
  })

  it('should select currentSong', () => {
    expect(selectCurrentSong()(mockedState)).toEqual({ trackId: 1 })
  })

  it('should select searchTerm', () => {
    expect(selectSearchTerm()(mockedState)).toBe('test')
  })

  it('should select isPlaying', () => {
    expect(selectIsPlaying()(mockedState)).toBe(true)
  })

  it('should select nextOffset', () => {
    expect(selectNextOffset()(mockedState)).toBe(20)
  })

  it('should select hasMore', () => {
    expect(selectHasMore()(mockedState)).toBe(true)
  })

  it('should select loadingMore', () => {
    expect(selectLoadingMore()(mockedState)).toBe(false)
  })

  it('should return defaults when music state is empty', () => {
    const empty = {}
    expect(selectMusicSongs()(empty)).toEqual([])
    expect(selectMusicLoading()(empty)).toBe(false)
    expect(selectMusicError()(empty)).toBeNull()
    expect(selectCurrentSong()(empty)).toBeNull()
    expect(selectSearchTerm()(empty)).toBe('')
    expect(selectIsPlaying()(empty)).toBe(false)
    expect(selectNextOffset()(empty)).toBeNull()
    expect(selectHasMore()(empty)).toBe(false)
    expect(selectLoadingMore()(empty)).toBe(false)
  })
})

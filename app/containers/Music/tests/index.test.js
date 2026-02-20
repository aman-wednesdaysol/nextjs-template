import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import { MusicTest as Music } from '../index'

jest.mock('@components/AudioPlayer', () => {
  const PT = require('prop-types')
  const MockPlayer = ({ onNext, onPrev }) => (
    <div data-testid='audio-player'>
      <button data-testid='mock-next' onClick={onNext}>
        Next
      </button>
      <button data-testid='mock-prev' onClick={onPrev}>
        Prev
      </button>
    </div>
  )
  MockPlayer.displayName = 'MockAudioPlayer'
  MockPlayer.propTypes = {
    onNext: PT.func,
    onPrev: PT.func
  }
  return MockPlayer
})

const mockSongs = [
  {
    trackId: 1,
    trackName: 'Song A',
    artistName: 'Artist A',
    artworkUrl: 'a.jpg',
    previewUrl: 'a.mp3'
  },
  {
    trackId: 2,
    trackName: 'Song B',
    artistName: 'Artist B',
    artworkUrl: 'b.jpg',
    previewUrl: 'b.mp3'
  }
]

describe('<Music /> container', () => {
  const mockSearch = jest.fn()
  const mockSetSong = jest.fn()
  const defaultProps = {
    songs: [],
    loading: false,
    currentSong: null,
    dispatchSearch: mockSearch,
    dispatchSetSong: mockSetSong
  }

  beforeEach(() => {
    mockSearch.mockClear()
    mockSetSong.mockClear()
  })

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Music {...defaultProps} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render the page title', () => {
    const { getByText } = renderProvider(<Music {...defaultProps} />)
    expect(getByText('MUSICA')).toBeTruthy()
  })

  it('should render the search bar', () => {
    const { getByTestId } = renderProvider(<Music {...defaultProps} />)
    expect(getByTestId('music-search-input')).toBeTruthy()
  })

  it('should render songs when provided', () => {
    const props = { ...defaultProps, songs: mockSongs }
    const { getByTestId } = renderProvider(<Music {...props} />)
    expect(getByTestId('song-1')).toBeTruthy()
    expect(getByTestId('song-2')).toBeTruthy()
  })

  it('should render loading spinner when loading', () => {
    const props = { ...defaultProps, loading: true }
    const { getByTestId } = renderProvider(<Music {...props} />)
    expect(getByTestId('loading-spinner')).toBeTruthy()
  })

  it('should select a song when clicked', () => {
    const props = { ...defaultProps, songs: mockSongs }
    const { getByTestId } = renderProvider(<Music {...props} />)
    fireEvent.click(getByTestId('song-1'))
    expect(mockSetSong).toHaveBeenCalledWith(mockSongs[0])
  })
})

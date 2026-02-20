import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderProvider } from '@utils/testUtils'
import SongList from '../index'

const mockSongs = [
  {
    trackId: 1,
    trackName: 'Song A',
    artistName: 'Artist A',
    albumName: 'Album A',
    artworkUrl: 'a.jpg'
  },
  {
    trackId: 2,
    trackName: 'Song B',
    artistName: 'Artist B',
    albumName: 'Album B',
    artworkUrl: 'b.jpg'
  }
]

describe('<SongList />', () => {
  const mockSelect = jest.fn()
  const defaultProps = {
    songs: mockSongs,
    currentSong: null,
    onSelectSong: mockSelect
  }

  beforeEach(() => {
    mockSelect.mockClear()
  })

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SongList {...defaultProps} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render all songs', () => {
    const { getByTestId } = renderProvider(<SongList {...defaultProps} />)
    expect(getByTestId('song-1')).toBeTruthy()
    expect(getByTestId('song-2')).toBeTruthy()
  })

  it('should call onSelectSong when a song is clicked', () => {
    const { getByTestId } = renderProvider(<SongList {...defaultProps} />)
    fireEvent.click(getByTestId('song-1'))
    expect(mockSelect).toHaveBeenCalledWith(mockSongs[0])
  })

  it('should render song details', () => {
    const { getByText } = renderProvider(<SongList {...defaultProps} />)
    expect(getByText('Song A')).toBeTruthy()
    expect(getByText('Artist A')).toBeTruthy()
    expect(getByText('Album A')).toBeTruthy()
  })

  it('should render empty list when no songs', () => {
    const { getByTestId } = renderProvider(
      <SongList songs={[]} currentSong={null} onSelectSong={mockSelect} />
    )
    expect(getByTestId('song-list').children.length).toBe(0)
  })
})

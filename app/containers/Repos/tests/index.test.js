/**
 *
 * Tests for Repos container
 *
 *
 */

import React from 'react'
import { renderProvider } from '@utils/testUtils'
import { ReposTest as Repos } from '../index'
import { fireEvent, waitFor } from '@testing-library/react'

describe('<Repos /> container tests', () => {
  const defaultProps = {
    repos: {},
    error: null,
    loading: false,
    searchKey: 'react',
    recommendations: [{ id: 1, name: 'React' }],
    dispatchGetGithubRepos: jest.fn(),
    dispatchClearGithubRepos: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks())

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <Repos {...defaultProps} recommendations={[]} />
    )
    expect(baseElement).toMatchSnapshot()
  })

  it('should call dispatchGetGithubRepos on mount when repos has no items', () => {
    renderProvider(<Repos {...defaultProps} />)
    expect(defaultProps.dispatchGetGithubRepos).toHaveBeenCalledWith('react')
  })

  it('should not call dispatchGetGithubRepos on mount when repos has items', () => {
    const props = {
      ...defaultProps,
      repos: { items: [{ id: 1, name: 'repo' }] }
    }
    renderProvider(<Repos {...props} />)
    expect(defaultProps.dispatchGetGithubRepos).not.toHaveBeenCalled()
  })

  it('should render the search bar', () => {
    const { getByTestId } = renderProvider(<Repos {...defaultProps} />)
    expect(getByTestId('search-bar')).toBeTruthy()
  })

  it('should call dispatchGetGithubRepos when search text is entered', async () => {
    const { getByTestId } = renderProvider(<Repos {...defaultProps} />)
    const searchBar = getByTestId('search-bar')
    const input =
      searchBar.tagName === 'INPUT'
        ? searchBar
        : searchBar.querySelector('input') || searchBar
    fireEvent.change(input, { target: { value: 'redux' } })
    await waitFor(
      () => {
        expect(defaultProps.dispatchGetGithubRepos).toHaveBeenCalledWith(
          'redux'
        )
      },
      { timeout: 500 }
    )
  })

  it('should call dispatchClearGithubRepos when search text is cleared', async () => {
    const { getByTestId } = renderProvider(<Repos {...defaultProps} />)
    const searchBar = getByTestId('search-bar')
    const input =
      searchBar.tagName === 'INPUT'
        ? searchBar
        : searchBar.querySelector('input') || searchBar
    fireEvent.change(input, { target: { value: '' } })
    await waitFor(
      () => {
        expect(defaultProps.dispatchClearGithubRepos).toHaveBeenCalled()
      },
      { timeout: 500 }
    )
  })
})

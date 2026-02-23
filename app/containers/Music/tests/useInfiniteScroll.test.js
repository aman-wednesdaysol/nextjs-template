import React from 'react'
import PropTypes from 'prop-types'
import { render, act } from '@testing-library/react'
import useInfiniteScroll from '../useInfiniteScroll'

describe('useInfiniteScroll', () => {
  let mockObserve, mockDisconnect, observerCallback

  beforeEach(() => {
    mockObserve = jest.fn()
    mockDisconnect = jest.fn()
    global.IntersectionObserver = jest.fn((cb) => {
      observerCallback = cb
      return { observe: mockObserve, disconnect: mockDisconnect }
    })
  })

  afterEach(() => {
    delete global.IntersectionObserver
  })

  const TestComponent = ({ hasMore, loadingMore, onLoadMore }) => {
    const sentinelRef = useInfiniteScroll({ hasMore, loadingMore, onLoadMore })
    return <div ref={sentinelRef} data-testid='sentinel' />
  }

  TestComponent.propTypes = {
    hasMore: PropTypes.bool.isRequired,
    loadingMore: PropTypes.bool.isRequired,
    onLoadMore: PropTypes.func.isRequired
  }

  it('should observe the sentinel element', () => {
    render(
      <TestComponent
        hasMore={true}
        loadingMore={false}
        onLoadMore={jest.fn()}
      />
    )
    expect(mockObserve).toHaveBeenCalled()
  })

  it('should call onLoadMore when intersecting and hasMore', () => {
    const onLoadMore = jest.fn()
    render(
      <TestComponent
        hasMore={true}
        loadingMore={false}
        onLoadMore={onLoadMore}
      />
    )
    act(() => {
      observerCallback([{ isIntersecting: true }])
    })
    expect(onLoadMore).toHaveBeenCalled()
  })

  it('should not call onLoadMore when hasMore is false', () => {
    const onLoadMore = jest.fn()
    render(
      <TestComponent
        hasMore={false}
        loadingMore={false}
        onLoadMore={onLoadMore}
      />
    )
    act(() => {
      observerCallback([{ isIntersecting: true }])
    })
    expect(onLoadMore).not.toHaveBeenCalled()
  })

  it('should not call onLoadMore when loadingMore is true', () => {
    const onLoadMore = jest.fn()
    render(
      <TestComponent
        hasMore={true}
        loadingMore={true}
        onLoadMore={onLoadMore}
      />
    )
    act(() => {
      observerCallback([{ isIntersecting: true }])
    })
    expect(onLoadMore).not.toHaveBeenCalled()
  })

  it('should disconnect observer on unmount', () => {
    const { unmount } = render(
      <TestComponent
        hasMore={true}
        loadingMore={false}
        onLoadMore={jest.fn()}
      />
    )
    unmount()
    expect(mockDisconnect).toHaveBeenCalled()
  })
})

/**
 *
 * Tests for ErrorState
 *
 */

import React from 'react'
import { renderProvider } from '@utils/testUtils'
import ErrorState from '../index'

describe('<ErrorState />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ErrorState />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should contain 1 ErrorState component when reposError is set', () => {
    const { getAllByTestId } = renderProvider(
      <ErrorState reposError='failure' />
    )
    expect(getAllByTestId('error-state').length).toBe(1)
  })

  it('should render error state when reposData has no totalCount', () => {
    const { getByTestId } = renderProvider(
      <ErrorState reposData={[]} loading={false} />
    )
    expect(getByTestId('error-state')).toBeTruthy()
  })

  it('should not render error state when loading is true', () => {
    const { queryByTestId } = renderProvider(
      <ErrorState reposError='error' loading={true} />
    )
    expect(queryByTestId('error-state')).toBeNull()
  })

  it('should not render error state when reposData has totalCount', () => {
    const { queryByTestId } = renderProvider(
      <ErrorState reposData={{ totalCount: 5 }} loading={false} />
    )
    expect(queryByTestId('error-state')).toBeNull()
  })
})

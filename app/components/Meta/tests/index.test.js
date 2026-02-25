/**
 *
 * Tests for Meta
 *
 */

import React from 'react'
import { renderProvider } from '@utils/testUtils'
import Meta from '../index'

describe('<Meta />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Meta />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render with useTranslation enabled', () => {
    const { baseElement } = renderProvider(
      <Meta title='app_title' description='app_title' useTranslation />
    )
    expect(baseElement).toBeTruthy()
  })

  it('should render with plain text title and description', () => {
    const { baseElement } = renderProvider(
      <Meta
        title='My Page'
        description='My description'
        useTranslation={false}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})

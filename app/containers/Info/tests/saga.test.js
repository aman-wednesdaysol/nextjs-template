import { takeLatest, call, put } from 'redux-saga/effects'
import { getRepo } from '@services/info'
import appSaga, { requestInfo } from '../saga'
import { infoTypes, infoCreators } from '../reducer'

describe('InfoContainer saga tests', () => {
  const generator = appSaga()
  const repo = 'mac'
  const owner = 'wednesday'

  it('should start task to watch for REQUEST_INFO action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(infoTypes.REQUEST_INFO, requestInfo)
    )
  })

  it('should call getRepo with repo and owner', () => {
    const gen = requestInfo({ repo, owner })
    const res = gen.next().value
    expect(res).toEqual(call(getRepo, repo, owner))
  })

  it('should dispatch successInfo when the api call succeeds', () => {
    const gen = requestInfo({ repo, owner })
    gen.next()
    const mockResponse = { name: 'mac', description: 'test' }
    expect(gen.next(mockResponse).value).toEqual(
      put(infoCreators.successInfo(mockResponse))
    )
  })

  it('should dispatch failureInfo when repo is missing', () => {
    const gen = requestInfo({ owner })
    const result = gen.next().value
    expect(result).toEqual(put(infoCreators.failureInfo('Insufficient Info')))
  })

  it('should dispatch failureInfo when owner is missing', () => {
    const gen = requestInfo({ repo })
    const result = gen.next().value
    expect(result).toEqual(put(infoCreators.failureInfo('Insufficient Info')))
  })

  it('should dispatch failureInfo when API call throws', () => {
    const gen = requestInfo({ repo, owner })
    gen.next()
    const error = new Error('Network error')
    const result = gen.throw(error).value
    expect(result).toEqual(put(infoCreators.failureInfo('Network error')))
  })
})


import { DEFAULT_VOLUME } from '../constants';



global.Audio = jest.fn().mockImplementation(() => ({
  volume: 0,
}));

describe('getAudioInstance', () => {
  let getAudioInstance;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    // Re-import fresh module each time to reset the singleton
    getAudioInstance = require('../audioSingleton').getAudioInstance;
  });

  it('should create a new Audio instance on first call', () => {
    const instance = getAudioInstance();
    expect(global.Audio).toHaveBeenCalledTimes(1);
    expect(instance).toBeDefined();
  });

  it('should set the default volume on the audio instance', () => {
    const instance = getAudioInstance();
    expect(instance.volume).toBe(DEFAULT_VOLUME);
  });

  it('should return the same instance on subsequent calls (singleton)', () => {
    const instance1 = getAudioInstance();
    const instance2 = getAudioInstance();
    expect(instance1).toBe(instance2);
    expect(global.Audio).toHaveBeenCalledTimes(1);
  });
});
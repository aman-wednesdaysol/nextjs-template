import { generateApiClient } from '@utils/apiUtils';

const musicApi = generateApiClient('music');

const buildSearchParams = ({ term, limit, offset }) => {
  const params = new URLSearchParams({ term: term || '' });
  if (limit !== undefined) {
    params.set('limit', limit);
  }
  if (offset !== undefined) {
    params.set('offset', offset);
  }
  return params.toString();
};

export const searchSongs = (options) => musicApi.get(`/music/resources/songs?${buildSearchParams(options)}`);

export const fetchTrackDetails = (trackId) => musicApi.get(`/music/resources/songs/${trackId}`);

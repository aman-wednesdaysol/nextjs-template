/**
 * Music API service
 */
import { generateApiClient } from '@utils/apiUtils';

const musicApi = generateApiClient('music');

/**
 * Search for songs
 * @param {object} params - Search parameters
 * @param {string} params.term - Search term
 * @param {number} [params.limit=20] - Page size
 * @param {number} [params.offset=0] - Offset for pagination
 * @param {string} [params.country] - Country code (e.g., 'US')
 * @returns {Promise} API response with song results
 */
export const searchSongs = async ({ term, limit = 20, offset = 0, country } = {}) => {
  const query = {
    term,
    limit,
    offset
  };
  if (country) {
    query.country = country;
  }
  const response = await musicApi.get('/music/resources/songs', query);
  return response;
};

/**
 * Get trending/top tracks for a country
 * @param {string} countryCode - Country code (e.g., 'US', 'GB')
 * @returns {Promise} API response with trending tracks
 */
export const getTrendingTracks = async (countryCode = 'US') => {
  // Try trending endpoint first, fallback to search with country
  // Adjust based on your actual API structure
  try {
    const response = await musicApi.get('/music/resources/trending', { country: countryCode });
    if (response.ok) {
      return response;
    }
  } catch (error) {
    // Fallback: use search endpoint with country parameter
  }
  
  // Fallback to search endpoint
  const response = await musicApi.get('/music/resources/songs', { 
    term: 'trending',
    country: countryCode 
  });
  return response;
};

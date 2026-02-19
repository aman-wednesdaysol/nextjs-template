/**
 * Geolocation utility functions
 */

const COUNTRY_KEY = 'music_app_country';

/**
 * Get user's country code from geolocation API
 * @returns {Promise<string>} Country code (e.g., 'US', 'GB')
 */
export const getUserCountry = async () => {
  try {
    // Try to get from localStorage first
    const storedCountry = localStorage.getItem(COUNTRY_KEY);
    if (storedCountry) {
      return storedCountry;
    }

    // Use ipapi.co for geolocation (free, no API key needed)
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.country_code) {
      localStorage.setItem(COUNTRY_KEY, data.country_code);
      return data.country_code;
    }

    // Fallback to US if geolocation fails
    return 'US';
  } catch (error) {
    console.error('Error getting user country:', error);
    // Fallback to US
    const fallback = 'US';
    localStorage.setItem(COUNTRY_KEY, fallback);
    return fallback;
  }
};

/**
 * Get stored country from localStorage
 * @returns {string|null} Country code or null
 */
export const getStoredCountry = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(COUNTRY_KEY);
};

/**
 * Set country in localStorage
 * @param {string} countryCode - Country code to store
 */
export const setStoredCountry = (countryCode) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COUNTRY_KEY, countryCode);
};

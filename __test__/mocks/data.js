export const TEST_TOKEN = 'mock-jwt-token-e2e';

export const TEST_USER = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'TestPass123'
};

export const API_LOGIN_SUCCESS = { access_token: TEST_TOKEN };
export const API_LOGIN_FAILURE = 'Invalid credentials';
export const API_SIGNUP_SUCCESS = { access_token: TEST_TOKEN };
export const API_SIGNUP_FAILURE = 'Email already exists';

const makeSong = ({ data }) => ({
  track_id: data.id,
  track_name: data.name,
  artist_name: data.artist,
  album_name: data.album,
  artwork_url: `https://via.placeholder.com/100?text=${data.id}`,
  preview_url: `https://example.com/preview${data.id}.m4a`,
  genre: data.genre,
  duration_ms: data.duration_ms,
  release_date: '2024-01-15T00:00:00Z',
  track_price: 1.29,
  currency: 'USD',
  track_url: `https://music.apple.com/track/${data.id}`
});

export const API_SONG_1 = makeSong({
  data: { id: 101, name: 'Starlight', artist: 'Muse', album: 'Black Holes', genre: 'Alternative', duration_ms: 240000 }
});
export const API_SONG_2 = makeSong({
  data: { id: 202, name: 'Uprising', artist: 'Muse', album: 'The Resistance', genre: 'Rock', duration_ms: 305000 }
});
export const API_SONG_3 = makeSong({
  data: { id: 303, name: 'Madness', artist: 'Muse', album: 'The 2nd Law', genre: 'Electronic', duration_ms: 281000 }
});
export const API_SONGS = [API_SONG_1, API_SONG_2, API_SONG_3];

export const TOKEN_KEY = 'musica_access_token';
export const THEME_KEY = 'musica_theme';

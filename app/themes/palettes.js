export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';

const shared = {
  accent: '#ff6b35',
  pink: '#e84393',
  error: '#ff4757'
};

export const darkPalette = {
  ...shared,
  bg: '#0d0d0d',
  cardBg: '#161622',
  inputBg: '#1e1e30',
  border: '#2d2d44',
  text: '#ffffff',
  muted: '#6c7086',
  label: '#9ca0b0',
  placeholder: '#4a4a5a',
  surface: '#1a1a2e'
};

export const lightPalette = {
  ...shared,
  bg: '#f4f4f8',
  cardBg: '#ffffff',
  inputBg: '#eeeef4',
  border: '#d8d8e4',
  text: '#1a1a2e',
  muted: '#6c7086',
  label: '#4a4a5a',
  placeholder: '#b0b0c0',
  surface: '#e8e8f0'
};

export const paletteToCSSVars = (palette) =>
  Object.entries(palette)
    .map(([key, val]) => `--musica-${key}: ${val};`)
    .join('\n');

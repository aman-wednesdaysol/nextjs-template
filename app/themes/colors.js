/**
 * This file contains the application's colors.
 *
 * iTunes-inspired color palette using CSS variables for theme switching
 */

const colors = {
  // CSS variable references for theme-aware colors
  background: 'var(--color-background)',
  backgroundSecondary: 'var(--color-background-secondary)',
  text: 'var(--color-text)',
  textSecondary: 'var(--color-text-secondary)',
  accent: 'var(--color-accent)',
  border: 'var(--color-border)',
  hover: 'var(--color-hover)',
  
  // Static colors
  transparent: 'rgba(0,0,0,0)',
  success: '#28a745',
  error: '#dc3545',
  transparent80: 'rgba(0, 0, 0, 0.2)',
  
  // Legacy support
  primary: '#007AFF',
  secondary: '#f8c49c'
};

module.exports = colors;

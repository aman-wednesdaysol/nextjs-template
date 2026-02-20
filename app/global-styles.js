import { css } from '@emotion/react';

const globalStyle = css`
  :root {
    /* Light Mode - iTunes-inspired, dominant palette with sharp accent */
    --color-background: #FAFAFC;
    --color-background-secondary: #F0F0F5;
    --color-text: #1A1A1E;
    --color-text-secondary: #6B6B73;
    --color-accent: #0071E3;
    --color-accent-muted: rgba(0, 113, 227, 0.12);
    --color-border: #E1E1E6;
    --color-hover: #E8E8ED;
    --font-primary: 'Sora', sans-serif;
    --transition-base: 0.3s ease;
    --transition-fast: 0.2s ease;
    --transition-slow: 0.25s ease;
  }

  [data-theme='dark'] {
    /* Dark Mode - Deep atmospheric contrast */
    --color-background: #0A0A0E;
    --color-background-secondary: #15151A;
    --color-text: #F0F0F5;
    --color-text-secondary: #9B9BA3;
    --color-accent: #0A84FF;
    --color-accent-muted: rgba(10, 132, 255, 0.18);
    --color-border: #2C2C32;
    --color-hover: #1E1E24;
  }

  html,
  body {
    -webkit-overflow-scrolling: touch !important;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    display: block;
    margin: 0;
    padding: 0;
    font-family: var(--font-primary);
    background-color: var(--color-background);
    color: var(--color-text);
    transition: background-color var(--transition-base), color var(--transition-base);
  }

  p,
  label {
    font-family: var(--font-primary);
    line-height: 1.5;
    color: var(--color-text);
  }

  body {
    p,
    label,
    span,
    div,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.5;
      font-family: var(--font-primary);
      color: var(--color-text);
    }
  }

  body.fontLoaded {
    font-family: var(--font-primary);
  }

  #app {
    min-height: 100vh;
    min-width: 100%;
    transition: background-color var(--transition-base);
  }

  #__next {
    height: 100%;
    min-height: 100vh;
    background: var(--color-background);
  }

  /* Atmospheric layered background - depth with contextual effects */
  [data-theme='light'] #__next {
    background:
      radial-gradient(circle at 20% 30%, rgba(0, 113, 227, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 113, 227, 0.08), transparent),
      radial-gradient(ellipse 60% 40% at 100% 50%, rgba(0, 113, 227, 0.04), transparent),
      var(--color-background);
  }

  [data-theme='dark'] #__next {
    background:
      radial-gradient(circle at 80% 20%, rgba(10, 132, 255, 0.08) 0%, transparent 40%),
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(10, 132, 255, 0.12), transparent),
      radial-gradient(ellipse 50% 30% at 0% 80%, rgba(10, 132, 255, 0.06), transparent),
      var(--color-background);
  }

  /* Staggered reveal animation - high-impact page load */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-on-load {
    animation: fadeInUp 0.5s ease forwards;
  }

  .animate-on-load-delay-1 { animation-delay: 0.1s; opacity: 0; }
  .animate-on-load-delay-2 { animation-delay: 0.2s; opacity: 0; }
  .animate-on-load-delay-3 { animation-delay: 0.3s; opacity: 0; }
  .animate-on-load-delay-4 { animation-delay: 0.4s; opacity: 0; }
  .animate-on-load-delay-5 { animation-delay: 0.5s; opacity: 0; }

  button {
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    color: var(--color-text);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  /* Smooth scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-background-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-secondary);
  }
`;

export default globalStyle;

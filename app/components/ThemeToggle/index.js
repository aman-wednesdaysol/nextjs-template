import React from 'react';
import { SunFilled, MoonFilled } from '@ant-design/icons';
import { useTheme } from '@app/contexts/ThemeContext';
import { THEME_DARK } from '@app/themes/palettes';
import { ToggleButton } from '@components/styled/themeToggle';
import { TooltipWrapper } from '@components/styled/toolTip';

const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();
  const isDark = themeMode === THEME_DARK;

  return (
    <TooltipWrapper label={isDark ? 'Light mode' : 'Dark mode'}>
      <ToggleButton
        data-testid="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDark ? <SunFilled /> : <MoonFilled />}
      </ToggleButton>
    </TooltipWrapper>
  );
};

export default ThemeToggle;

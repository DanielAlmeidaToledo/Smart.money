import cn from 'classnames';
import { useMemo } from 'react';

import './ThemeSwitcher.scss';

type ThemeSwitcherProps = {
  className?: string;
};

const loadTheme = () => {
  let theme = localStorage.getItem('theme');

  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    localStorage.setItem('theme', theme);
  }

  document.body.dataset.theme = theme;
};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  useMemo(() => loadTheme(), []);

  const onSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const theme = localStorage.getItem('theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={cn('__theme-switcher-container', className)}>
      <button
        className="__theme-switcher-button"
        title="seletor de tema"
        aria-label="seletor de tema"
        aria-live="polite"
        onClick={onSwitch}
      >
        <svg
          className="sun-and-moon"
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <circle
            className="sun"
            cx="12"
            cy="12"
            r="6"
            mask="url(#moon-mask)"
            fill="currentColor"
          />
          <g className="sun-beams" stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
          <mask className="moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="24" cy="10" r="6" fill="black" />
          </mask>
        </svg>
      </button>
    </div>
  );
};

export default ThemeSwitcher;

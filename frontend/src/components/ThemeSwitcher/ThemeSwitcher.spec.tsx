import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSwitcher from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => ({
      match: false
    })
  });

  const localStorageCache: Record<string, any> = {};

  Object.defineProperty(window, 'localStorage', {
    writable: true,
    value: {
      getItem: (key: string) => localStorageCache[key],
      setItem: (key: string, value: string) => (localStorageCache[key] = value)
    }
  });

  let localStorageGetItemMock: jest.SpyInstance;
  let localStorageSetItemMock: jest.SpyInstance;
  let matchMediaMock: jest.SpyInstance;

  beforeEach(() => {
    localStorageGetItemMock = jest.spyOn(window.localStorage, 'getItem');
    localStorageSetItemMock = jest.spyOn(window.localStorage, 'setItem');
    matchMediaMock = jest.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false
    } as any);
  });

  afterEach(() => {
    if (localStorageGetItemMock) localStorageGetItemMock.mockRestore();
    if (localStorageSetItemMock) localStorageSetItemMock.mockRestore();
    localStorageCache.theme = undefined;
    matchMediaMock.mockRestore();
  });

  it('should render', () => {
    // Arrange
    const { getByRole } = render(<ThemeSwitcher />);

    // Act
    const themeSwitcher = getByRole('button');

    // Assert
    expect(themeSwitcher).toBeInTheDocument();
  });

  it('should change dataset theme of body to dark', () => {
    // Arrange
    localStorageGetItemMock.mockRestore();
    localStorageGetItemMock.mockReturnValueOnce(undefined);
    matchMediaMock.mockReturnValue({
      matches: false
    } as any);

    // Act
    const { getByRole } = render(<ThemeSwitcher />);
    const themeSwitcher = getByRole('button');

    themeSwitcher.click();

    // Assert
    expect(document.body.dataset.theme).toBe('dark');
  });

  it('should change dataset theme of body to light', () => {
    // Arrange
    matchMediaMock.mockReturnValue({
      matches: false
    } as any);

    // Act
    const { getByRole } = render(<ThemeSwitcher />);
    const themeSwitcher = getByRole('button');

    themeSwitcher.click();
    themeSwitcher.click();

    // Assert
    expect(document.body.dataset.theme).toBe('light');
  });

  it('default theme should be light if matchMedia is light', () => {
    // Arrange
    localStorageGetItemMock.mockRestore();
    localStorageGetItemMock.mockReturnValueOnce(undefined);
    matchMediaMock.mockReturnValue({
      matches: false
    } as any);

    // Act
    render(<ThemeSwitcher />);

    // Assert
    expect(document.body.dataset.theme).toBe('light');
  });

  it('default theme should be dark if matchMedia is dark', () => {
    // Arrange
    localStorageGetItemMock.mockRestore();
    localStorageGetItemMock.mockReturnValue(undefined);
    matchMediaMock.mockReturnValue({
      matches: true
    } as any);

    render(<ThemeSwitcher />);

    // Act

    // Assert
    expect(document.body.dataset.theme).toBe('dark');
  });

  it('should get theme from localStorage', () => {
    // Arrange
    localStorageCache.theme = 'dark';
    render(<ThemeSwitcher />);

    // Act

    // Assert
    expect(document.body.dataset.theme).toBe('dark');
  });
});

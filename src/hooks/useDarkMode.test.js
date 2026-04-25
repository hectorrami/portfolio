import { renderHook, act } from '@testing-library/react';
import useDarkMode from './useDarkMode';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

describe('useDarkMode', () => {
  it('defaults to false when localStorage is empty and no system preference', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    const { result } = renderHook(() => useDarkMode());
    expect(result.current[0]).toBe(false);
  });

  it('initializes to true when localStorage has darkMode=true', () => {
    localStorage.setItem('darkMode', 'true');
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    const { result } = renderHook(() => useDarkMode());
    expect(result.current[0]).toBe(true);
  });

  it('adds dark class to document when dark mode is on', () => {
    localStorage.setItem('darkMode', 'true');
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    renderHook(() => useDarkMode());
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class from document when dark mode is off', () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'false');
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    renderHook(() => useDarkMode());
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggle flips dark mode and persists to localStorage', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    const { result } = renderHook(() => useDarkMode());

    act(() => result.current[1]());

    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');
  });
});

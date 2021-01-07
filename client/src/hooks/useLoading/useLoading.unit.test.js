import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import { useLoading } from './useLoading';

describe('useLoading', () => {
  test('test', () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.startLoading();
    });
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.finishLoading();
    });
    expect(result.current.isLoading).toBe(false);
  });

  test('test', () => {
    const { result } = renderHook(() => useLoading(false, true));

    // Initial state of isLoading and pointerEvents property
    expect(result.current.isLoading).toBe(false);
    expect(document.documentElement.style.pointerEvents).toBe('');

    // Disable pointer events on loading start
    act(() => {
      result.current.startLoading();
    });
    expect(result.current.isLoading).toBe(true);
    expect(document.documentElement.style.pointerEvents).toBe('none');

    // Set pointerEvents property to auto on loading finish
    act(() => {
      result.current.finishLoading();
    });
    expect(result.current.isLoading).toBe(false);
    expect(document.documentElement.style.pointerEvents).toBe('auto');
  });
});

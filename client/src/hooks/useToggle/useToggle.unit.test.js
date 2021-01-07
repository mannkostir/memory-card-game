import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  test('test', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.isOn).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOn).toBe(true);
  });
});

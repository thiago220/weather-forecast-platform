import { renderHook, act } from "@testing-library/react";
import { WeatherProvider, useWeatherContext } from "../contexts/WeatherContext";

test("contexto inicial está definido", () => {
  const wrapper = ({ children }) => (
    <WeatherProvider>{children}</WeatherProvider>
  );
  const { result } = renderHook(() => useWeatherContext(), { wrapper });

  expect(result.current.data).toBe(null);
  expect(Array.isArray(result.current.history)).toBe(true);
});

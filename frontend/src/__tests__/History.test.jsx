import { render, screen } from "@testing-library/react";
import SearchHistory from "../components/SearchHistory";
import { WeatherContext } from "../contexts/WeatherContext";

test("mostra histórico se existir", () => {
  const mockContext = {
    history: [
      {
        _id: "1",
        query: "São Paulo",
        createdAt: new Date().toISOString(),
        weather: {
          main: { temp: 25, humidity: 70 },
          weather: [{ description: "ensolarado" }],
        },
      },
    ],
    fetchWeatherByCity: jest.fn(),
    loading: false,
    error: null,
  };

  render(
    <WeatherContext.Provider value={mockContext}>
      <SearchHistory />
    </WeatherContext.Provider>
  );

  expect(screen.getByText(/são paulo/i)).toBeInTheDocument();
  expect(screen.getByText(/ensolarado/i)).toBeInTheDocument();
});

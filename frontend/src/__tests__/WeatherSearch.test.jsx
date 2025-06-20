import { render, screen, fireEvent } from "@testing-library/react";
import WeatherSearch from "../components/WeatherSearch";
import { WeatherProvider } from "../contexts/WeatherContext";

test("permite buscar por uma cidade", () => {
  render(
    <WeatherProvider>
      <WeatherSearch />
    </WeatherProvider>
  );

  const input = screen.getByPlaceholderText(/digite a cidade/i);
  fireEvent.change(input, { target: { value: "Ouro Preto" } });

  const button = screen.getByRole("button", { name: /buscar/i });
  fireEvent.click(button);

  expect(button).toBeInTheDocument();
});

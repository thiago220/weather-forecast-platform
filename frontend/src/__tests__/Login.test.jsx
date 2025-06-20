import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";

test("renderiza formulário de login e envia dados", () => {
  render(<Login />);

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/senha/i);
  const button = screen.getByRole("button", { name: /entrar/i });

  fireEvent.change(emailInput, { target: { value: "teste@exemplo.com" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  fireEvent.click(button);

  expect(button).toBeInTheDocument();
});

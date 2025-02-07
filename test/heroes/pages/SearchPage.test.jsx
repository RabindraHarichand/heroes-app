import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en SearchPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe mostrarse correctamente con valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();

    // screen.debug();
  });

  test("debe mostrarse batman y el input con el query string", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");

    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe("none");
  });

  test("debe mostrar un error si no se encuentra el hero (batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe("");

    expect(screen.getByText("batman123")).toBeTruthy();
  });

  test("debe llamar el navigate a la pantalla nueva", () => {
    const inputValue = "superman";

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: { name: "searchText", value: inputValue },
    });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
  });
});

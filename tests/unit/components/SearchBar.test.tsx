import { fireEvent, render, screen } from "@testing-library/react";

import SearchBar from "../../../src/components/ui/SearchBar/SearchBar";

describe("SearchBar", () => {
  it("emits typed search terms", () => {
    const onSearch = jest.fn();

    render(<SearchBar searchTerm="" onSearch={onSearch} />);

    fireEvent.change(
      screen.getByPlaceholderText("Ingrese el estado o municipio..."),
      {
        target: { value: "Morelos" },
      }
    );

    expect(onSearch).toHaveBeenCalledWith("Morelos");
  });
});

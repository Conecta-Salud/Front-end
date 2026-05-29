import { fireEvent, render, screen } from "@testing-library/react";

import LocationInput, {
  type LocationOption,
} from "../../../src/components/ui/LocationInput/LocationInput";

const options: LocationOption[] = [
  {
    id: "17",
    code: "17",
    name: "Morelos",
    level: "state",
  },
  {
    id: "17007",
    code: "17007",
    name: "Cuernavaca",
    level: "municipality",
    stateName: "Morelos",
    stateCode: "17",
  },
];

describe("LocationInput", () => {
  it("filters and selects an option", () => {
    const onChange = jest.fn();

    render(
      <LocationInput
        options={options}
        placeholder="Selecciona una ubicación"
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Selecciona una ubicación"), {
      target: { value: "Cuern" },
    });
    fireEvent.click(screen.getByText("Cuernavaca"));

    expect(onChange).toHaveBeenCalledWith(options[1]);
  });

  it("clears the selected option", () => {
    const onChange = jest.fn();
    const onClear = jest.fn();

    render(
      <LocationInput
        value={options[0]}
        options={options}
        onChange={onChange}
        onClear={onClear}
      />
    );

    fireEvent.click(screen.getByLabelText("Limpiar ubicación"));

    expect(onChange).toHaveBeenCalledWith(null);
    expect(onClear).toHaveBeenCalled();
  });
});

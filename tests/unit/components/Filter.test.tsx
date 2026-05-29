import { fireEvent, render, screen } from "@testing-library/react";

import Filter from "../../../src/components/ui/Filter/Filter";

const options = [
  { name: "Cobertura médica", value: "medical_coverage" },
  { name: "Infraestructura hospitalaria", value: "hospital_beds" },
];

describe("Filter", () => {
  it("opens the dropdown and emits the selected value", () => {
    const onChange = jest.fn();
    const onOpenChange = jest.fn();

    render(
      <Filter
        id="category"
        title="Categoría"
        options={options}
        values=""
        isOpen
        onChange={onChange}
        onOpenChange={onOpenChange}
      />
    );

    fireEvent.click(screen.getByText("Infraestructura hospitalaria"));

    expect(onChange).toHaveBeenCalledWith("hospital_beds");
    expect(onOpenChange).toHaveBeenCalledWith(null);
  });

  it("clears the selected value when allowClear is enabled", () => {
    const onChange = jest.fn();

    render(
      <Filter
        id="category"
        title="Categoría"
        options={options}
        values="medical_coverage"
        isOpen
        allowClear
        onChange={onChange}
        onOpenChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Limpiar"));

    expect(onChange).toHaveBeenCalledWith("");
  });
});

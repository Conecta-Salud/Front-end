import { render, screen } from "@testing-library/react";

import RankingTable from "../../../src/components/ui/RankingTable/RankingTable";
import type { RankingColumn } from "../../../src/components/ui/RankingTable/RankingTable.types";

type Row = {
  id: string;
  name: string;
  value?: number | null;
  status?: string;
};

const columns: RankingColumn<Row>[] = [
  { header: "Nombre", key: "name" },
  { header: "Valor", key: "value", align: "center" },
  {
    header: "Estado",
    key: "status",
    render: (row) => <strong>{row.status ?? "Sin estado"}</strong>,
  },
];

describe("RankingTable", () => {
  it("renders rows, formatted values and custom cells", () => {
    render(
      <RankingTable
        columns={columns}
        data={[
          { id: "1", name: "Cuernavaca", value: 1234.567, status: "Activo" },
        ]}
      />
    );

    expect(screen.getByText("Cuernavaca")).toBeInTheDocument();
    expect(screen.getByText("1,234.57")).toBeInTheDocument();
    expect(screen.getByText("Activo")).toBeInTheDocument();
  });

  it("renders an empty state", () => {
    render(
      <RankingTable
        columns={columns}
        data={[]}
        emptyMessage="No hay registros."
      />
    );

    expect(screen.getByText("No hay registros.")).toBeInTheDocument();
  });

  it("renders fallback text for missing values", () => {
    render(
      <RankingTable
        columns={columns}
        data={[{ id: "1", name: "Cuernavaca", value: null }]}
      />
    );

    expect(screen.getByText("Sin dato")).toBeInTheDocument();
    expect(screen.getByText("Sin estado")).toBeInTheDocument();
  });
});

import {
  adaptSummaryChartTitle,
  adaptSummaryChartToBarData,
  adaptSummaryChartToScatterData,
} from "../../../src/features/dashboard/utils/dashboardChart.adapter";
import { adaptSummaryKpisToCards } from "../../../src/features/dashboard/utils/dashboardKpiSummary.adapter";
import {
  adaptSummaryRankingColumns,
  adaptSummaryRankingRows,
  adaptSummaryRankingTitle,
} from "../../../src/features/dashboard/utils/dashboardRanking.adapter";
import {
  formatDashboardKpiValue,
  formatDashboardNumber,
} from "../../../src/features/dashboard/utils/dashboardValueFormatters";

describe("dashboard utils", () => {
  it("formats dashboard numbers and KPI values", () => {
    expect(formatDashboardNumber(1234.567)).toBe("1,234.57");
    expect(formatDashboardNumber(null)).toBe("N/A");
    expect(
      formatDashboardKpiValue({
        id: "poverty_percentage",
        label: "Pobreza",
        value: 21.455,
        unit: "percentage",
        variant: "default",
        order: 1,
      })
    ).toBe("21.46%");
  });

  it("orders KPI cards and applies configured display labels", () => {
    const cards = adaptSummaryKpisToCards([
      {
        id: "critical_states",
        label: "Estados críticos",
        value: 8,
        unit: "count",
        variant: "default",
        order: 2,
      },
      {
        id: "doctors_per_1000",
        label: "Médicos por 1000 habitantes",
        value: 2.5,
        unit: "doctors_per_1000",
        variant: "default",
        order: 1,
      },
    ]);

    expect(cards.map((card) => card.id)).toEqual([
      "doctors_per_1000",
      "critical_states",
    ]);
    expect(cards[0]).toMatchObject({
      title: "Promedio médicos",
      titleSecondLine: "por 1000 habitantes",
      variant: "green",
      value: "2.5",
    });
  });

  it("adapts chart data and ignores invalid numeric points", () => {
    const chart = {
      type: "bar" as const,
      title: "Medical coverage by state",
      data: [
        { label: "Morelos", value: 2.5, colorToken: "green" as const },
        { label: "Sin datos", value: null },
      ],
    };

    expect(adaptSummaryChartTitle(chart)).toBe(
      "Cobertura médica por estado"
    );
    expect(adaptSummaryChartToBarData(chart)).toEqual([
      { label: "Morelos", value: 2.5, colorToken: "green" },
    ]);
  });

  it("adapts scatter data only when x/y keys are valid numbers", () => {
    expect(
      adaptSummaryChartToScatterData({
        type: "scatter",
        title: "Relación",
        xKey: "population",
        yKey: "doctors",
        data: [
          {
            label: "Morelos",
            code: "17",
            population: 1000,
            doctors: 25,
            colorToken: "green",
          },
          {
            label: "Sin médicos",
            population: 200,
          },
        ],
      })
    ).toEqual([
      {
        label: "Morelos",
        code: "17",
        x: 1000,
        y: 25,
        colorToken: "green",
      },
    ]);
  });

  it("adapts ranking title, columns and rows", () => {
    const ranking = {
      title: "Top municipalities",
      columns: [
        { key: "name", label: "Name" },
        { key: "value", label: "Value" },
      ],
      rows: [
        { name: "Cuernavaca", code: "17007", value: 2.1 },
        { id: "custom", name: "Jiutepec", value: 1.8 },
      ],
    };

    expect(adaptSummaryRankingTitle(ranking)).toBe(
      "Municipios prioritarios"
    );
    expect(adaptSummaryRankingColumns(ranking)).toMatchObject([
      { header: "Nombre", key: "name", truncate: true },
      { header: "Valor", key: "value", align: "center" },
    ]);
    expect(adaptSummaryRankingRows(ranking).map((row) => row.id)).toEqual([
      "17007",
      "custom",
    ]);
  });
});

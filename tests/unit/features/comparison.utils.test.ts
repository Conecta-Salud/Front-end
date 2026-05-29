import {
  adaptComparisonChartData,
  adaptComparisonReferenceLine,
  translateComparisonChartTitle,
} from "../../../src/features/comparison/utils/comparisonChart.adapter";
import {
  adaptMunicipalitiesToLocationOptions,
  adaptStatesToLocationOptions,
} from "../../../src/features/comparison/utils/comparisonLocationOptions.adapter";
import {
  formatComparisonChartValue,
  formatPriorityFactorValue,
  formatPriorityScore,
} from "../../../src/features/comparison/utils/comparisonFormatters";
import {
  adaptPriorityResultsToCards,
  translatePriorityLabel,
} from "../../../src/features/comparison/utils/comparisonPriority.adapter";

describe("comparison utils", () => {
  it("translates chart titles and reference labels", () => {
    expect(translateComparisonChartTitle("Medical coverage")).toBe(
      "Cobertura médica"
    );

    expect(
      adaptComparisonReferenceLine({
        id: "medical_coverage",
        title: "Medical coverage",
        type: "bar",
        referenceLine: { value: 2.7, label: "Minimum reference / 2.7" },
        data: [],
      })
    ).toEqual({
      value: 2.7,
      label: "Referencia mínima / 2.7",
    });
  });

  it("adapts chart points without losing tone metadata", () => {
    expect(
      adaptComparisonChartData([
        {
          territoryCode: "17",
          label: "Morelos",
          subtitle: "Estado",
          value: 2.1,
          variant: "yellow",
        },
      ])
    ).toEqual([
      {
        label: "Morelos",
        subtitle: "Estado",
        value: 2.1,
        tone: "yellow",
      },
    ]);
  });

  it("adapts state and municipality catalogs to LocationInput options", () => {
    const states = [
      { id: 17, name: "Morelos", code: "17" },
      { id: 99, name: "Sin código", code: "" },
    ];

    expect(adaptStatesToLocationOptions(states)).toEqual([
      {
        id: "17",
        code: "17",
        name: "Morelos",
        level: "state",
        stateCode: "17",
      },
    ]);

    expect(
      adaptMunicipalitiesToLocationOptions({
        states,
        municipalities: [
          {
            id: 17007,
            stateId: 17,
            name: "Cuernavaca",
            code: "17007",
          },
        ],
      })
    ).toEqual([
      {
        id: "17007",
        code: "17007",
        name: "Cuernavaca",
        level: "municipality",
        stateCode: "17",
        stateName: "Morelos",
      },
    ]);
  });

  it("formats chart, priority score and priority factors", () => {
    expect(formatComparisonChartValue("poverty_rate", 21.234)).toBe("21.23%");
    expect(formatPriorityScore(87.444)).toBe("87.44");
    expect(
      formatPriorityFactorValue({
        id: "medical_coverage",
        label: "Medical coverage",
        value: 2.345,
        unit: "doctors_per_1000",
        variant: "green",
      })
    ).toBe("2.35 médicos / 1,000 hab.");
  });

  it("adapts priority results to priority cards", () => {
    expect(translatePriorityLabel("High")).toBe("Alta");

    const cards = adaptPriorityResultsToCards([
      {
        territoryCode: "17",
        name: "Morelos",
        score: 140,
        level: "high",
        label: "High",
        colorToken: "red",
        factors: [
          {
            id: "older_adults",
            label: "Older adults",
            value: 14,
            unit: "percentage",
            variant: "yellow",
          },
        ],
      },
    ]);

    expect(cards[0]).toMatchObject({
      id: "17",
      title: "Morelos",
      priority: "alta",
      progress: 100,
    });
    expect(cards[0].metrics[0]).toEqual({
      id: "priority_score",
      label: "Índice de prioridad",
      value: "140",
    });
  });
});

import { useMemo } from "react";
import type {
  HealthMapIndicator,
  HealthMapIndicatorResponse,
  HealthMapStatusLevel,
  HealthMapViewLevel,
} from "../types/healthMap.types";
import { healthMapLegendConfig } from "../constants/healthMapLegend.config";

type HealthMapLegendProps = Readonly<{
  indicator: HealthMapIndicator;
  indicators?: HealthMapIndicatorResponse[];
  level: HealthMapViewLevel;
}>;

const getTerritoryLabel = (level: HealthMapViewLevel) => {
  if (level === "country") return "Estados";
  return "Municipios";
};

export default function HealthMapLegend({
  indicator,
  indicators = [],
  level,
}: HealthMapLegendProps) {
  const config = healthMapLegendConfig[indicator];
  const territoryLabel = getTerritoryLabel(level);

  const tickPositions = ["0%", "42%", "65%", "100%"];
  const tickColors = ["#12D439", "#E8E338", "#F4B642", "#FC6767"];

  const counts = useMemo(() => {
    const nextCounts: Record<HealthMapStatusLevel, number> = {
      good: 0,
      risk: 0,
      critical: 0,
      no_data: 0,
    };

    indicators.forEach((item) => {
      nextCounts[item.level] += 1;
    });

    return nextCounts;
  }, [indicators]);
  
  return (
    <section className="rounded-none bg-white px-[50px] py-[20px]">
      <div className="grid grid-cols-3 items-start gap-6 text-center">
        {config.items.map((item, index) => (
          <div
            key={item.status}
            className={[
              "flex flex-col items-center justify-center",
              index === 0 ? "" : "border-l border-[#C6C6C6]",
            ].join(" ")}
          >
            <p className="text-[20px] font-semibold leading-none">
              <span className={item.colorClassName}>{item.label}</span>{" "}
              <span className="text-[15px] text-[#3B3B3B]">
                ({item.range})
              </span>
            </p>

            <p className="mt-5 text-[20px] font-bold leading-none">
              {counts[item.status]} {territoryLabel}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-[15px]">
        <div className="relative mx-auto h-[60px] max-w-[920px]">
          <div
            className="absolute left-0 right-0 top-0 h-[21px] rounded-t-[28px]"
            style={{
              background:
                "linear-gradient(90deg, #12D439 0%, #E8E338 50%, #FC6767 100%)",
            }}
          />

          {config.ticks.map((tick, index) => {
	            const isFirst = index === 0;
	            const isLast = index === config.ticks.length - 1;
              let transform = "translateX(-50%)";

              if (isFirst) {
                transform = "translateX(0)";
              } else if (isLast) {
                transform = "translateX(-100%)";
              }

            return (
              <div
                key={tick}
                className="absolute top-[21px] flex flex-col items-center"
                style={{
                  left: tickPositions[index],
	                  transform,
                }}
              >
                <div
                  className="h-[15px] w-[3px]"
                  style={{ backgroundColor: tickColors[index] }}
                />

                <span className="mt-[4px] text-[18px] leading-none text-[#3B3B3B]">
                  {tick}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[15px] flex items-center gap-4">
        <div className="h-[2px] flex-1 bg-[#C6C6C6]" />

        <p className="shrink-0 whitespace-nowrap text-center text-[16px] font-medium text-[#C6C6C6]">
          {config.title}
        </p>

        <div className="h-[2px] flex-1 bg-[#C6C6C6]" />
      </div>

      <p className="text-center text-[16px] font-normal text-[#C6C6C6]">
        {config.description}
      </p>
    </section>
  );
}

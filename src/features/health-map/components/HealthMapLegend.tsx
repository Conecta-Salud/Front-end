import { useMemo } from "react";
import type {
  HealthMapIndicator,
  HealthMapIndicatorResponse,
  HealthMapStatusLevel,
  HealthMapViewLevel,
} from "../types/healthMap.types";
import { healthMapLegendConfig } from "../constants/healthMapLegend.config";

type HealthMapLegendProps = {
  indicator: HealthMapIndicator;
  indicators?: HealthMapIndicatorResponse[];
  level: HealthMapViewLevel;
};

const countByLevel = (
  indicators: HealthMapIndicatorResponse[] = [],
  level: HealthMapStatusLevel
) => {
  return indicators.filter((item) => item.level === level).length;
};

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

  const counts = useMemo(
    () => ({
      good: countByLevel(indicators, "good"),
      risk: countByLevel(indicators, "risk"),
      critical: countByLevel(indicators, "critical"),
    }),
    [indicators]
  );

  return (
    <section className="rounded-[10px] bg-white py-[20px] px-[50px] shadow-sm">
      <div className="grid grid-cols-3 items-start gap-6 text-center">
        {config.items.map((item, index) => (
          <div
            key={item.status}
            className={[
              "flex flex-col items-center justify-center",
              index !== 0 ? "border-l border-[#C6C6C6]" : "",
            ].join(" ")}
          >
            <p className="text-[20px] font-semibold leading-none">
                <span className={item.colorClassName}>{item.label}</span>{" "}
                <span className="text-[#3B3B3B] text-[15px]">({item.range})</span>
            </p>

            <p className="mt-5 text-[20px] font-bold leading-none">
              {counts[item.status]} {territoryLabel}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-[15px]">
        <div className="relative mx-auto h-[38px] max-w-[920px]">
          <div
            className="absolute left-0 right-0 top-0 h-[21px] rounded-t-[28px]"
            style={{
              background:
                "linear-gradient(90deg, #12D439 0%, #E8E338 50%, #FC6767 100%)",
            }}
          />

          <div className="absolute left-0 top-[21px] h-[15px] w-[3px] bg-[#12D439]" />
          <div className="absolute left-[42%] top-[21px] h-[15px] w-[3px] bg-[#E8E338]" />
          <div className="absolute left-[65%] top-[21px] h-[15px] w-[3px] bg-[#F4B642]" />
          <div className="absolute right-0 top-[21px] h-[15px] w-[3px] bg-[#FC6767]" />
        </div>

        <div className="mx-auto grid max-w-[920px] grid-cols-4 text-[18px]">
          {config.ticks.map((tick, index) => (
            <span
              key={tick}
              className={[
                index === 0 ? "text-left" : "",
                index === config.ticks.length - 1 ? "text-right" : "text-center",
              ].join(" ")}
            >
              {tick}
            </span>
          ))}
        </div>
      </div>

    <div className="mt-[15px] flex items-center gap-4">
    <div className="h-[2px] flex-1 bg-[#C6C6C6]" />

    <p
        className="
        shrink-0
        whitespace-nowrap
        text-center
        text-[16px]
        font-medium
        text-[#C6C6C6]
        "
    >
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
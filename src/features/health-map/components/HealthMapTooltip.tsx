import type { HealthMapFeatureProperties } from "../types/healthMap.types";
import { getFeatureDisplayValue } from "../utils/healthMap.utils";

type HealthMapTooltipProps = {
  properties: HealthMapFeatureProperties;
};

export default function HealthMapTooltip({ properties }: HealthMapTooltipProps) {
  const indicator = properties.indicator;

  return (
    <div className="min-w-[180px] rounded-[10px] bg-white px-3 py-2 shadow-md">
      <p className="text-[14px] font-semibold text-black">
        {properties.name}
      </p>

      {indicator ? (
        <div className="mt-1 text-[12px] text-gray-600">
          <p>Value: {getFeatureDisplayValue(indicator.value)}</p>
          <p>Level: {indicator.level}</p>
        </div>
      ) : (
        <p className="mt-1 text-[12px] text-gray-500">No data</p>
      )}
    </div>
  );
}
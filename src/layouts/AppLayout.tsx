import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/layout/Header/Header";
import HeaderActions from "../components/layout/Header/HeaderActions";
import Sidebar from "../components/layout/SideBar/SideBar";

import type { UserRole } from "../components/layout/SideBar/Sidebar.types";
import { useHeaderFilterStore } from "../stores/headerFilterStore";
import {
  headerConfigByPath,
  defaultHeaderConfig,
} from "../config/header.config";
import { useDataAvailabilityQuery } from "../features/data-availability/queries/dataAvailability.queries";
import { getAvailableYears } from "../features/data-availability/utils/dataAvailability.utils";

type AppLayoutProps = {
  children: React.ReactNode;
  role?: UserRole;
};

const HEADER_HEIGHT = 120;
const SIDEBAR_WIDTH = 100;

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  role = "strategic",
}) => {
  const location = useLocation();

  const headerConfig = headerConfigByPath[location.pathname] ?? defaultHeaderConfig;

  const category = useHeaderFilterStore((state) => state.category);
  const year = useHeaderFilterStore((state) => state.year);
  const selectedLocation = useHeaderFilterStore((state) => state.selectedLocation);

  const setCategory = useHeaderFilterStore((state) => state.setCategory);
  const setYear = useHeaderFilterStore((state) => state.setYear);
  const setSelectedLocation = useHeaderFilterStore((state) => state.setSelectedLocation);

  const shouldShowHeaderActions =
    headerConfig.showCategoryFilter ||
    headerConfig.showYearFilter ||
    headerConfig.showSearchBar;

  const dataAvailabilityQuery = useDataAvailabilityQuery({
    enabled: headerConfig.showYearFilter,
  });

  const availableYears = useMemo(() => {
    const responseYears = dataAvailabilityQuery.data?.years ?? [];
    const years = responseYears.length
      ? responseYears
      : getAvailableYears(dataAvailabilityQuery.data?.items);

    return Array.from(
      new Set(years.filter((item) => Number.isFinite(Number(item))))
    )
      .map(Number)
      .sort((a, b) => b - a);
  }, [dataAvailabilityQuery.data]);

  const yearOptions = useMemo(
    () =>
      availableYears.map((availableYear) => ({
        name: String(availableYear),
        value: String(availableYear),
      })),
    [availableYears]
  );

  useEffect(() => {
    if (!availableYears.length) return;

    const selectedYear = Number(year);

    if (availableYears.includes(selectedYear)) return;

    setYear(String(availableYears[0]));
  }, [availableYears, setYear, year]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F5F7F8]">
      {/* Header fijo */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: `${HEADER_HEIGHT}px` }}
      >
        <Header
          subtitle={headerConfig.subtitle}
          actions={
            shouldShowHeaderActions ? (
              <HeaderActions
                showCategoryFilter={headerConfig.showCategoryFilter}
                showYearFilter={headerConfig.showYearFilter}
                showSearchBar={headerConfig.showSearchBar}
                category={category}
                year={year}
                yearOptions={yearOptions}
                selectedLocation={selectedLocation}
                onCategoryChange={setCategory}
                onYearChange={setYear}
                onLocationChange={setSelectedLocation}
              />
            ) : undefined
          }
        />
      </div>

      {/* Sidebar fijo */}
      <div
        className="fixed left-0 z-40"
        style={{
          top: `${HEADER_HEIGHT}px`,
          width: `${SIDEBAR_WIDTH}px`,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <Sidebar role={role}/>
      </div>

      {/* Área scrollable */}
      <main
        className="overflow-y-auto overflow-x-hidden"
        style={{
          marginTop: `${HEADER_HEIGHT}px`,
          marginLeft: `${SIDEBAR_WIDTH}px`,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

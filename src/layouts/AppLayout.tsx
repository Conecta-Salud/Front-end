import React from "react";
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
const search = useHeaderFilterStore((state) => state.search);

const setCategory = useHeaderFilterStore((state) => state.setCategory);
const setYear = useHeaderFilterStore((state) => state.setYear);
const setSearch = useHeaderFilterStore((state) => state.setSearch);

  const shouldShowHeaderActions =
    headerConfig.showCategoryFilter ||
    headerConfig.showYearFilter ||
    headerConfig.showSearchBar;

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
                search={search}
                onCategoryChange={setCategory}
                onYearChange={setYear}
                onSearchChange={setSearch}
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
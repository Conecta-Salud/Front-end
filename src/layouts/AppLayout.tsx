import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/SideBar/SideBar";
import type { UserRole } from "../components/SideBar/Sidebar.types";

type AppLayoutProps = {
  children: React.ReactNode;
  role?: UserRole;
};

const HEADER_HEIGHT = 120;
const SIDEBAR_WIDTH = 100;

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  role = "user",
}) => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F5F7F8]">
      {/* Header fijo */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: `${HEADER_HEIGHT}px` }}
      >
        <Header subtitle="Panel Usuario Estratégico" />
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
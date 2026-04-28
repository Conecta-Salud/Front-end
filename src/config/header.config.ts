export type HeaderRouteConfig = {
  subtitle: string;
  showCategoryFilter: boolean;
  showYearFilter: boolean;
  showSearchBar: boolean;
};

export const headerConfigByPath: Record<string, HeaderRouteConfig> = {
  "/": {
    subtitle: "Panel Usuario Estratégico",
    showCategoryFilter: true,
    showYearFilter: true,
    showSearchBar: true,
  },

  "/comparison": {
    subtitle: "Módulo de Comparación",
    showCategoryFilter: false,
    showYearFilter: true,
    showSearchBar: false,
  },

  "/admin": {
    subtitle: "Panel Administrador",
    showCategoryFilter: false,
    showYearFilter: false,
    showSearchBar: false,
  },

  "/profile": {
    subtitle: "Perfil",
    showCategoryFilter: false,
    showYearFilter: false,
    showSearchBar: false,
  },
};

export const defaultHeaderConfig: HeaderRouteConfig = {
  subtitle: "ConectaSalud",
  showCategoryFilter: false,
  showYearFilter: false,
  showSearchBar: false,
};
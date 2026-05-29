/* eslint-disable @typescript-eslint/no-namespace */
import {
  mockAdminApi,
  mockComparisonApi,
  mockCoreApi,
  mockDashboardApi,
} from "./apiMocks";

declare global {
  namespace Cypress {
    interface Chainable {
      visitAsAuthenticated(
        path: string,
        role?: "strategic" | "admin"
      ): Chainable<void>;
      mockCoreApi(): Chainable<void>;
      mockDashboardApi(): Chainable<void>;
      mockComparisonApi(): Chainable<void>;
      mockAdminApi(): Chainable<void>;
    }
  }
}

Cypress.Commands.add(
  "visitAsAuthenticated",
  (path: string, role: "strategic" | "admin" = "admin") => {
    cy.visit(path, {
      onBeforeLoad(win) {
        win.localStorage.setItem("conectasalud:e2e-auth-bypass", "true");
        win.localStorage.setItem("conectasalud:e2e-auth-role", role);
      },
    });
  }
);

Cypress.Commands.add("mockCoreApi", () => {
  mockCoreApi();
});

Cypress.Commands.add("mockDashboardApi", () => {
  mockDashboardApi();
});

Cypress.Commands.add("mockComparisonApi", () => {
  mockComparisonApi();
});

Cypress.Commands.add("mockAdminApi", () => {
  mockAdminApi();
});

export {};

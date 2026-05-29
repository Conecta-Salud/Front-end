# Testing para Producción

Este bloque deja la base para cumplir el mínimo solicitado:

- Pruebas unitarias e integración con Jest y React Testing Library.
- Umbral global de cobertura del 80%.
- Cinco flujos E2E con Cypress sin autenticación real.
- Uso de agente IA documentado para apoyar selección de pruebas y flujos.

## Instalación Pendiente

La instalación de dependencias quedó bloqueada por acceso de red/cache en este entorno. Ejecutar localmente o en CI:

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript cypress start-server-and-test
```

Después de eso, los comandos esperados son:

```bash
npm run test:coverage
npm run e2e:dev
npm run check:production
```

## Cobertura

La configuración está en `jest.config.cjs` y exige 80% global en:

- `branches`
- `functions`
- `lines`
- `statements`

La cobertura inicial prioriza módulos de alto impacto: adapters/utils de features, filtros, inputs, tablas, búsqueda y rutas.

## Flujos Cypress

Los cinco flujos creados son:

1. Guard anónimo: rutas protegidas redirigen a `/login`.
2. Dashboard estratégico: KPIs, ranking, mapa y cambio de categoría.
3. Comparación: selección de dos estados y cambio a municipios.
4. Admin: listado, búsqueda y desactivación de usuario.
5. Perfil: visualización de usuario y validación del modal de contraseña.

El bypass E2E está limitado a `import.meta.env.DEV` y se activa solo con `localStorage` desde Cypress.

## Uso de IA

Se usó un agente auxiliar para revisar el repo y proponer:

- candidatos prioritarios para unit/integration tests,
- cinco flujos Cypress sin autenticación,
- riesgos de configuración por Jest, RTL, Cypress, Vite, assets y Firebase.

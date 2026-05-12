# Servel Design System

Sitio de documentación / playground del Design System de Servel, construido con React + TypeScript + Tailwind (shadcn/ui). Sirve como referencia visual y técnica para tokens, tipografías, espaciados, colores y componentes.

## Qué contiene

- Documentación en secciones (bienvenida, tokens, tipografía, colores, spacing, etc.).
- Componentes UI basados en shadcn/ui (en `src/components/ui`).
- Tipografía Switzer y archivos asociados (en `src/Switzer_Complete`).
- Ilustraciones e íconos usados por el sitio (en `src/Ilustraciones` y `src/Icono.svg`).
- Configuración de Tailwind, Vite y tooling (ESLint, Vitest, Playwright).

## Requisitos

- Node.js (recomendado 18+)
- npm

## Uso en local

```bash
git clone <URL_DEL_REPO>
cd servel-design-system

npm ci
npm run dev
```

Luego abre:

- http://localhost:8080/

## Scripts útiles

- `npm run dev`: levanta el servidor de desarrollo.
- `npm run build`: compila para producción.
- `npm run preview`: previsualiza el build.
- `npm run lint`: corre ESLint.
- `npm run test`: corre tests (Vitest).

## Estructura (alto nivel)

- `src/pages`: páginas (home, not-found).
- `src/components/sections`: secciones del sitio de documentación.
- `src/components/ui`: componentes reutilizables (shadcn/ui).
- `src/lib/doc-sections.ts`: configuración/registro de secciones.
- `tailwind.config.ts`: tema y configuración de Tailwind.

## Licencias y terceros

Este repositorio incluye assets de terceros (por ejemplo tipografías). Revisa:

- `src/Switzer_Complete/License/FFL.txt`
- `src/LICENCES-THIRD-PARTY.txt`

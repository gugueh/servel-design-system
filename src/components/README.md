# `src/components`

Componentes React del proyecto. Se dividen en dos grandes grupos:

- [`ui/`](./ui/README.md) — **primitivas reutilizables** de bajo nivel, basadas en [shadcn/ui](https://ui.shadcn.com/) + Radix UI. Son los ladrillos del sistema (Button, Input, Dialog, etc.) y se mantienen **libres de lógica de negocio**.
- [`sections/`](./sections/README.md) — **secciones de la documentación** del Design System. Cada una renderiza un bloque navegable del sitio (Welcome, Color, Typography, etc.).

## Archivos sueltos

Componentes de layout y navegación específicos del sitio (no son primitivas reusables):

| Archivo                                  | Responsabilidad                                                |
| ---------------------------------------- | -------------------------------------------------------------- |
| [`DocSidebar.tsx`](./DocSidebar.tsx)     | Navegación lateral con soporte mobile (drawer animado).        |
| [`DocTopBar.tsx`](./DocTopBar.tsx)       | Barra superior (search, theme toggle, mobile menu).            |
| [`SectionNav.tsx`](./SectionNav.tsx)     | Navegación in-section (anterior / siguiente).                  |
| [`NavLink.tsx`](./NavLink.tsx)           | Link con estado activo y styling consistente.                  |
| [`ServelFooter.tsx`](./ServelFooter.tsx) | Footer del sitio.                                              |
| [`ServelLogo.tsx`](./ServelLogo.tsx)     | Logo Servel (variantes).                                       |
| [`ThemeProvider.tsx`](./ThemeProvider.tsx) | Provider de `next-themes` (light/dark).                      |
| [`ThemeToggle.tsx`](./ThemeToggle.tsx)   | Toggle manual de tema con badge de estado.                     |

## Convenciones

- **Lógica vs. UI:** los componentes de este directorio son de presentación. La lógica de negocio (hooks, fetch, estado) debe vivir en `src/hooks` o en un `features/` específico.
- **Tokens primero:** ningún color, radio o sombra hardcodeado. Usá las variables CSS / utilidades de Tailwind (`bg-primary`, `rounded-lg`, `shadow-elevation-1`, etc.).
- **Variantes con CVA:** los componentes con múltiples variantes usan [`class-variance-authority`](https://cva.style/) para tipar y componer las clases.
- **Accesibilidad:** se priorizan primitivos de Radix (Dialog, Popover, Tabs, etc.) para garantizar foco, teclado y ARIA correctos.

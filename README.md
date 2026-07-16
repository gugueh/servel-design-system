# Servel Design System

Sitio de documentación y playground del **Design System de Servel**: una referencia visual y técnica de tokens, tipografías, colores, espaciados, elevación, motion, ilustraciones, logos y componentes.

Construido con **React 18 + TypeScript + Vite + Tailwind CSS** sobre la base de [shadcn/ui](https://ui.shadcn.com/) y la tipografía [Switzer](https://www.fontsquirrel.com/fonts/switzer).

---

## Stack

- **Framework:** React 18 + TypeScript + Vite 5
- **Estilos:** Tailwind CSS 3 + tailwindcss-animate
- **UI base:** shadcn/ui (Radix UI primitives)
- **Routing:** React Router 6
- **Estado servidor:** TanStack Query 5
- **Animaciones:** Framer Motion 12
- **Iconos:** Lucide React + SVGs propios
- **Tipografía:** Switzer (Fontshare)
- **Tema:** next-themes (light/dark)
- **Tests:** Vitest + Testing Library
- **E2E:** Playwright
- **Linter:** ESLint 9 (flat config)

---

## Quick start

```bash
# 1. Clonar
git clone https://github.com/Guguehh/servel-design-system.git
cd servel-design-system

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

Abrí [http://localhost:8080](http://localhost:8080).

> Si usás `bun`, también funciona: `bun install && bun run dev`.

---

## Scripts

| Script              | Descripción                                       |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Inicia el servidor de desarrollo en `:8080`.      |
| `npm run build`     | Compila a producción (salida en `dist/`).         |
| `npm run build:dev` | Compila en modo desarrollo.                       |
| `npm run preview`   | Previsualiza el build de producción.              |
| `npm run lint`      | Corre ESLint sobre todo el repo.                  |
| `npm run test`      | Ejecuta los tests unitarios con Vitest.           |
| `npm run test:watch`| Vitest en modo watch.                             |

---

## Secciones del sitio

Definidas y registradas en [`src/lib/doc-sections.ts`](src/lib/doc-sections.ts) y consumidas por la `DocSidebar`.

### Getting Started
- **Welcome** — punto de entrada y tour del sistema.
- **Nosotros** — propósito, equipo y contexto.
- **FAQs** — preguntas frecuentes.
- **Emails** — plantillas de email y assets descargables (`src/servel-emails.zip`).

### Styles (Foundations)
- **Design Tokens** — variables base y presets.
- **Color** — paleta semántica (primary, success, warning, error, info, surfaces).
- **Typography** — escala tipográfica con Switzer.
- **Dimensions** — escala de espaciado.
- **Corner Radius** — radios y esquinas.
- **Elevation** — sombras y elevaciones (`elevation-1/2/3`).

### Expression
- **Icons** — set de íconos (`src/Icons`).
- **Illustrations** — ilustraciones (`src/Ilustraciones`).
- **Logos** — variantes de la marca Servel (`src/Logos`).
- **Motion** — principios y presets de animación.

### Content Design
- **Voice & Tone** — personalidad de la marca.
- **Writing** — guía de redacción.

### Product Inclusion
- **Accessibility** — criterios de a11y.

### Components
- **Overview** — catálogo de componentes UI (`src/components/ui`).

### Resources
- **Resources** — descargas, links y referencias.
- **Changelog** — historial de versiones.

---

## Estructura del repositorio

```
servel-design-system/
├─ public/                       # Assets estáticos servidos tal cual
├─ src/
│  ├─ App.tsx                    # Router y providers (QueryClient, Theme, Tooltip, Toaster)
│  ├─ main.tsx                   # Entry point
│  ├─ index.css                  # Estilos globales + variables CSS (tokens)
│  ├─ pages/                     # Páginas: Index (home) y NotFound
│  ├─ components/
│  │  ├─ sections/               # Secciones de la documentación
│  │  ├─ ui/                     # Componentes shadcn/ui (Radix + Tailwind)
│  │  ├─ DocSidebar.tsx          # Navegación lateral (desktop + mobile drawer)
│  │  ├─ DocTopBar.tsx           # Barra superior
│  │  ├─ ServelFooter.tsx        # Footer
│  │  ├─ ServelLogo.tsx          # Logo
│  │  ├─ SectionNav.tsx          # Navegación entre secciones
│  │  ├─ NavLink.tsx             # Link con estado activo
│  │  ├─ ThemeProvider.tsx       # Provider de next-themes
│  │  └─ ThemeToggle.tsx         # Toggle light/dark
│  ├─ hooks/                     # Hooks compartidos
│  ├─ lib/
│  │  ├─ doc-sections.ts         # Registro/agrupación de secciones
│  │  └─ utils.ts                # cn() y helpers
│  ├─ Icons/                     # Set de íconos SVG
│  ├─ Ilustraciones/             # Ilustraciones SVG
│  ├─ Logos/                     # Variantes del logo Servel (SVG/PNG)
│  ├─ Switzer_Complete/          # Familia tipográfica Switzer (ver src/Switzer_Complete/README.md)
│  ├─ test/                      # Setup de Vitest + ejemplo
│  └─ servel-emails.zip          # Bundle descargable de assets de email
├─ tailwind.config.ts            # Tema, tokens, fuentes, sombras, animaciones
├─ vite.config.ts                # Alias `@` → `./src`, port 8080
├─ components.json               # Config de shadcn/ui
├─ playwright.config.ts          # E2E
└─ vitest.config.ts              # Tests unitarios
```

---

## Sistema de tokens

Los tokens viven como **variables CSS** en [`src/index.css`](src/index.css) y se exponen a Tailwind desde [`tailwind.config.ts`](tailwind.config.ts) con el patrón `hsl(var(--token))`.

Categorías principales:

- **Color** — `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `success`, `warning`, `error`, `info`, `surface`, `card`, `popover`, `sidebar`.
- **Tipografía** — familias `display` (Satoshi), `body` (Inter) y `mono` (JetBrains Mono). Switzer se carga como webfont.
- **Border radius** — escala derivada de `--radius` (xs/sm/md/lg).
- **Elevation** — `--elevation-1`, `--elevation-2`, `--elevation-3`.
- **Spacing** — escala de Tailwind extendida según el sistema de dimensions.

> Modificá un valor en `index.css` y se propaga automáticamente a todos los componentes que lo consumen vía `bg-*`, `text-*`, `border-*`, `shadow-elevation-*`, `rounded-*`, etc.

---

## Tema light / dark

Implementado con [`next-themes`](https://github.com/pacocoursey/next-themes). El toggle está en [`ThemeToggle.tsx`](src/components/ThemeToggle.tsx) y se aplica vía la clase `class` en `<html>`.

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  {children}
</ThemeProvider>
```

---

## Componentes UI

Los componentes viven en [`src/components/ui`](src/components/ui/README.md) y son una capa sobre [shadcn/ui](https://ui.shadcn.com/) — no se instalan como paquete, se copian al repo y se customizan. Cada uno combina:

- Un primitivo de **Radix UI** (accesible, sin estilos).
- Estilos con **Tailwind** y `class-variance-authority` (CVA) para variantes.
- `tailwind-merge` + `clsx` vía `cn()` para componer clases sin conflictos.

Para agregar uno nuevo:

```bash
npx shadcn@latest add <componente>
```

---

## Cómo contribuir

1. **Modificaciones visuales (UI):** mantené separadas la lógica y la presentación. No toques hooks ni estado de negocio en refactors visuales.
2. **Nuevos componentes:** usá los existentes como referencia; respetá el patrón `forwardRef` + `cn()` + CVA.
3. **Nuevas secciones:** agregá el item en `docSectionGroups` (en `src/lib/doc-sections.ts`) y creá el componente en `src/components/sections/`.
4. **Tokens:** preferí siempre las variables CSS / utilidades de Tailwind antes que valores hardcodeados.
5. **Tipografía:** usá las familias declaradas en `tailwind.config.ts` (`font-display`, `font-body`, `font-mono`).

Convención de commits (Convencional Commits):

```
feat: nueva sección de Email templates
fix: corrige overflow en DocSidebar mobile
chore: bump tailwind a 3.4
```

---

## Licencias y terceros

Este repositorio incluye assets de terceros. Revisá:

- [`src/Switzer_Complete/License/FFL.txt`](src/Switzer_Complete/License/FFL.txt) — Switzer (SIL Open Font License 1.1).
- [`src/LICENCES-THIRD-PARTY.txt`](src/LICENCES-THIRD-PARTY.txt) — licencias varias.

---

## Links

- Repositorio: [github.com/Guguehh/servel-design-system](https://github.com/Guguehh/servel-design-system)
- Issues: [github.com/Guguehh/servel-design-system/issues](https://github.com/Guguehh/servel-design-system/issues)

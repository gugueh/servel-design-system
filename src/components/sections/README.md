# `src/components/sections`

Cada archivo de esta carpeta es una **sección navegable** del sitio de documentación del Design System. Las secciones se registran y agrupan en [`src/lib/doc-sections.ts`](../../lib/doc-sections.ts) (`docSectionGroups`) y se montan en [`src/pages/Index.tsx`](../../pages/Index.tsx) según el `activeSection` actual.

## Convenciones

- Una sección = un componente default export.
- Recibe props **solo si son de presentación** (variant, dense, etc.). No deben manejar fetch ni estado de negocio.
- Deben poder renderizarse dentro del layout del `Index.tsx` sin acoplarse a él (slot-based).
- Consumir siempre los **tokens** del sistema (`bg-*`, `text-muted-foreground`, `rounded-2xl`, `shadow-elevation-1`).
- Mobile-first: cada sección se ve correctamente desde `sm:` hacia arriba.

## Inventario

### Getting Started

| Sección   | Archivo                                    | Descripción                                       |
| --------- | ------------------------------------------ | ------------------------------------------------- |
| Welcome   | [`WelcomeSection.tsx`](./WelcomeSection.tsx) | Página de bienvenida y tour rápido del sistema.  |
| Nosotros  | [`AboutSection.tsx`](./AboutSection.tsx)     | Propósito, equipo y contexto del DS.            |
| FAQs      | [`GenericSection.tsx`](./GenericSection.tsx) | Render genérico (también usado por otras secciones). |
| Emails    | _(archivo propio)_                           | Plantillas de email y descarga de assets.         |

### Styles (Foundations)

| Sección        | Archivo                                      | Descripción                                              |
| -------------- | -------------------------------------------- | -------------------------------------------------------- |
| Design Tokens  | [`TokensSection.tsx`](./TokensSection.tsx)   | Variables y presets de tokens.                           |
| Color          | [`ColorSection.tsx`](./ColorSection.tsx)     | Paleta semántica (primary, success, warning, error…).    |
| Typography     | [`TypographySection.tsx`](./TypographySection.tsx) | Escala tipográfica con Switzer.                     |
| Dimensions     | [`SpacingSection.tsx`](./SpacingSection.tsx) | Escala de espaciado.                                     |
| Corner Radius  | _(subsección)_                                | Radios y esquinas.                                       |
| Elevation      | [`ElevationSection.tsx`](./ElevationSection.tsx) | Sombras y elevaciones.                               |

### Expression

| Sección       | Archivo                                       | Descripción                                              |
| ------------- | --------------------------------------------- | -------------------------------------------------------- |
| Icons         | _(subsección)_                                 | Set de íconos disponibles en `src/Icons`.                |
| Illustrations | _(subsección)_                                 | Catálogo de ilustraciones en `src/Ilustraciones`.        |
| Logos         | _(subsección)_                                 | Variantes de la marca en `src/Logos`.                    |
| Motion        | [`MotionSection.tsx`](./MotionSection.tsx)     | Principios y presets de animación.                       |

### Components

| Sección  | Archivo                                          | Descripción                                  |
| -------- | ------------------------------------------------ | -------------------------------------------- |
| Overview | [`ComponentsSection.tsx`](./ComponentsSection.tsx) | Catálogo de las primitivas de `src/components/ui`. |

### Resources

| Sección    | Archivo                                          | Descripción                              |
| ---------- | ------------------------------------------------ | ---------------------------------------- |
| Changelog  | [`ChangelogSection.tsx`](./ChangelogSection.tsx) | Historial de versiones del sistema.      |

## Cómo agregar una sección nueva

1. Crear el componente en `src/components/sections/MiSeccionSection.tsx`.
2. Agregar un item en `docSectionGroups` (en `src/lib/doc-sections.ts`) con un `id`, `label` y `icon` (Lucide).
3. Registrar el render en el switch/registry de `src/pages/Index.tsx` (o donde se mapee `activeSection → Component`).
4. Si la sección requiere assets nuevos, agregarlos al directorio correspondiente (`src/Icons`, `src/Ilustraciones`, etc.) y referenciarlos.
5. Verificar mobile, dark mode y contraste.
6. Actualizar este README y la sección correspondiente en el [`README.md`](../../../README.md) raíz.

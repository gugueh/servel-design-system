# `src/components/ui`

Primitivas reutilizables del sistema, construidas sobre [**shadcn/ui**](https://ui.shadcn.com/) y [**Radix UI**](https://www.radix-ui.com/primitives).

> **Importante:** shadcn **no se instala como dependencia**. Los componentes se copian al repo y se modifican in-place. Esto permite customizarlos sin pelearte con un paquete externo.

## Cómo está armado cada componente

Patrón típico (ver [`button.tsx`](./button.tsx)):

1. **Primitivo de Radix** (si aplica) — accesibilidad, focus management, ARIA.
2. **`forwardRef`** para integrarse con `asChild` (Slot) y mantener refs.
3. **`class-variance-authority` (CVA)** — define `variants` y `defaultVariants` con tipado fuerte.
4. **`cn()`** de [`@/lib/utils`](../../lib/utils.ts) — combina `clsx` + `tailwind-merge` para evitar clases duplicadas.
5. **Estilos con Tailwind** — consumen los tokens del sistema (`bg-primary`, `rounded-md`, etc.).

## Inventario

| Componente              | Archivo                                  | Primitivo Radix                  |
| ----------------------- | ---------------------------------------- | -------------------------------- |
| Accordion               | [`accordion.tsx`](./accordion.tsx)       | `@radix-ui/react-accordion`      |
| Alert Dialog            | [`alert-dialog.tsx`](./alert-dialog.tsx) | `@radix-ui/react-alert-dialog`   |
| Alert                   | [`alert.tsx`](./alert.tsx)               | —                                |
| Aspect Ratio            | [`aspect-ratio.tsx`](./aspect-ratio.tsx) | `@radix-ui/react-aspect-ratio`   |
| Avatar                  | [`avatar.tsx`](./avatar.tsx)             | `@radix-ui/react-avatar`         |
| Badge                   | [`badge.tsx`](./badge.tsx)               | —                                |
| Breadcrumb              | [`breadcrumb.tsx`](./breadcrumb.tsx)     | —                                |
| Button                  | [`button.tsx`](./button.tsx)             | `@radix-ui/react-slot`           |
| Calendar                | [`calendar.tsx`](./calendar.tsx)         | `react-day-picker`               |
| Card                    | [`card.tsx`](./card.tsx)                 | —                                |
| Carousel                | [`carousel.tsx`](./carousel.tsx)         | `embla-carousel-react`           |
| Chart                   | [`chart.tsx`](./chart.tsx)               | `recharts`                       |
| Checkbox                | [`checkbox.tsx`](./checkbox.tsx)         | `@radix-ui/react-checkbox`       |
| Collapsible             | [`collapsible.tsx`](./collapsible.tsx)   | `@radix-ui/react-collapsible`    |
| Command (⌘K)            | [`command.tsx`](./command.tsx)           | `cmdk`                           |
| Context Menu            | [`context-menu.tsx`](./context-menu.tsx) | `@radix-ui/react-context-menu`   |
| Dialog                  | [`dialog.tsx`](./dialog.tsx)             | `@radix-ui/react-dialog`         |
| Drawer                  | [`drawer.tsx`](./drawer.tsx)             | `vaul`                           |
| Dropdown Menu           | [`dropdown-menu.tsx`](./dropdown-menu.tsx) | `@radix-ui/react-dropdown-menu` |
| Form                    | [`form.tsx`](./form.tsx)                 | `react-hook-form` + zod          |
| Hover Card              | [`hover-card.tsx`](./hover-card.tsx)     | `@radix-ui/react-hover-card`     |
| Input OTP               | [`input-otp.tsx`](./input-otp.tsx)       | `input-otp`                      |
| Input                   | [`input.tsx`](./input.tsx)               | —                                |
| Label                   | [`label.tsx`](./label.tsx)               | `@radix-ui/react-label`          |
| Menubar                 | [`menubar.tsx`](./menubar.tsx)           | `@radix-ui/react-menubar`        |
| Navigation Menu         | [`navigation-menu.tsx`](./navigation-menu.tsx) | `@radix-ui/react-navigation-menu` |
| Pagination              | [`pagination.tsx`](./pagination.tsx)     | —                                |
| Popover                 | [`popover.tsx`](./popover.tsx)           | `@radix-ui/react-popover`        |
| Progress                | [`progress.tsx`](./progress.tsx)         | `@radix-ui/react-progress`       |
| Radio Group             | [`radio-group.tsx`](./radio-group.tsx)   | `@radix-ui/react-radio-group`    |
| Resizable               | [`resizable.tsx`](./resizable.tsx)       | `react-resizable-panels`         |
| Scroll Area             | [`scroll-area.tsx`](./scroll-area.tsx)   | `@radix-ui/react-scroll-area`    |
| Select                  | [`select.tsx`](./select.tsx)             | `@radix-ui/react-select`         |
| Separator               | [`separator.tsx`](./separator.tsx)       | `@radix-ui/react-separator`      |
| Sheet                   | [`sheet.tsx`](./sheet.tsx)               | `@radix-ui/react-dialog`         |
| Sidebar                 | [`sidebar.tsx`](./sidebar.tsx)           | `@radix-ui/react-slot`           |
| Skeleton                | [`skeleton.tsx`](./skeleton.tsx)         | —                                |
| Slider                  | [`slider.tsx`](./slider.tsx)             | `@radix-ui/react-slider`         |
| Sonner (toasts)         | [`sonner.tsx`](./sonner.tsx)             | `sonner`                         |
| Switch                  | [`switch.tsx`](./switch.tsx)             | `@radix-ui/react-switch`         |
| Table                   | [`table.tsx`](./table.tsx)               | —                                |
| Tabs                    | [`tabs.tsx`](./tabs.tsx)                 | `@radix-ui/react-tabs`           |
| Textarea                | [`textarea.tsx`](./textarea.tsx)         | —                                |
| Toast (legacy)          | [`toast.tsx`](./toast.tsx)               | `@radix-ui/react-toast`          |
| Toaster                 | [`toaster.tsx`](./toaster.tsx)           | `@radix-ui/react-toast`          |
| Toggle                  | [`toggle.tsx`](./toggle.tsx)             | `@radix-ui/react-toggle`         |
| Toggle Group            | [`toggle-group.tsx`](./toggle-group.tsx) | `@radix-ui/react-toggle-group`   |
| Tooltip                 | [`tooltip.tsx`](./tooltip.tsx)           | `@radix-ui/react-tooltip`        |
| `use-toast` hook        | [`use-toast.ts`](./use-toast.ts)         | —                                |

## Agregar un componente nuevo

El proyecto usa [`shadcn`](https://ui.shadcn.com/) con la config en [`components.json`](../../../components.json) en la raíz.

```bash
# Agregar uno existente
npx shadcn@latest add dialog

# O crear uno a mano siguiendo el patrón de button.tsx
```

Después de agregarlo:

1. Verificá que use los **tokens** del sistema (no valores hardcodeados).
2. Si cambia la API, actualizá este README.
3. Corré `npm run lint` y `npm run test` antes de commitear.

## Reglas de uso

- **No** importes `@radix-ui/*` directamente desde un page/section. Pasá siempre por la primitiva de `ui/`.
- Para combinar con un elemento custom usá `asChild` (vía `Slot`).
- Si necesitás una nueva variante, **editala en el archivo del componente** (no crees un wrapper externo).

# Switzer — Tipografía

Familia tipográfica [**Switzer**](https://www.fontshare.com/fonts/switzer) de Fontshare, incluida en este repositorio para uso del Design System y del sitio de documentación.

> Switzer se distribuye bajo la [**SIL Open Font License 1.1**](./License/FFL.txt) (OFL). Es libre para uso comercial y personal, embebido o auto-hospedado.

## Contenido de esta carpeta

```
Switzer_Complete/
├─ Fonts/
│  ├─ OTF/           # OpenType — todos los pesos y estilos
│  ├─ TTF/           # TrueType — versión variable (regular e italic)
│  └─ WEB/           # Listo para la web
│     ├─ css/        # Hojas de estilo (@font-face)
│     └─ fonts/      # EOT / TTF / WOFF / WOFF2 por peso
└─ License/
   └─ FFL.txt        # SIL Open Font License 1.1
```

Pesos disponibles: `Thin`, `Extralight`, `Light`, `Regular`, `Medium`, `Semibold`, `Bold`, `Extrabold`, `Black` (cada uno con su variante `Italic`). Hay además una **versión variable** (`Switzer-Variable.ttf`).

## Uso en el proyecto

Switzer **no** está declarada como `font-display` ni `font-body` en `tailwind.config.ts` (esas siguen siendo Satoshi/Inter); se carga como **recurso local** vía la hoja de estilos incluida.

Para usarla en una sección o componente:

```tsx
// Importar la hoja de estilos una sola vez (idealmente en el entry point)
import "@/Switzer_Complete/Fonts/WEB/css/switzer.css";

// Y aplicar la familia por clase o estilo
<p className="font-sans">…</p>             // si la declarás en tailwind.config.ts
<p style={{ fontFamily: "'Switzer', sans-serif" }}>…</p>
```

## Sugerencia de integración

Si querés usar Switzer como `font-display` en el DS, agregá la familia en `tailwind.config.ts`:

```ts
fontFamily: {
  display: ["Switzer", "Satoshi", "sans-serif"],
  body:    ["Inter", "sans-serif"],
  mono:    ["JetBrains Mono", "monospace"],
},
```

E importá la CSS en [`src/main.tsx`](../../main.tsx) **antes** de `index.css` para que las variables de Tailwind tomen precedencia.

## Créditos

- **Tipo:** Switzer, diseñada por Indian Type Foundry.
- **Distribuidor:** [Fontshare](https://www.fontshare.com/fonts/switzer).
- **Licencia:** [SIL OFL 1.1](./License/FFL.txt).

> Si redistribuís los archivos, mantené intactos los avisos de copyright y la licencia OFL.

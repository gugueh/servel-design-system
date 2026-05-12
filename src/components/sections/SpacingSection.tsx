import { motion } from "framer-motion";
import { Home, User, Heart, Bell } from "lucide-react";

const spacingScale = [
  { name: "2XS", token: "--space-2xs", val: "2px", px: 2, use: "Separación mínima / micro-ajustes" },
  { name: "XS", token: "--space-xs", val: "4px", px: 4, use: "Separación compacta (chips, iconos, listas)" },
  { name: "SM", token: "--space-sm", val: "8px", px: 8, use: "Gap estándar pequeño (icono + texto)" },
  { name: "MD", token: "--space-md", val: "12px", px: 12, use: "Separación entre elementos relacionados" },
  { name: "LG", token: "--space-lg", val: "16px", px: 16, use: "Padding base y márgenes frecuentes" },
  { name: "XL", token: "--space-xl", val: "20px", px: 20, use: "Separación entre bloques dentro de una sección" },
  { name: "2XL", token: "--space-2xl", val: "24px", px: 24, use: "Separación entre secciones o grupos" },
  { name: "3XL", token: "--space-3xl", val: "32px", px: 32, use: "Padding vertical de pantallas" },
  { name: "4XL", token: "--space-4xl", val: "40px", px: 40, use: "Separación entre bloques grandes" },
  { name: "5XL", token: "--space-5xl", val: "48px", px: 48, use: "Hero spacing / respiración amplia" },
  { name: "6XL", token: "--space-6xl", val: "64px", px: 64, use: "Espaciado estructural" },
];

const sectionSpacingScale = [
  { name: "section-sm", token: "--space-section-sm", val: "80px", px: 80, use: "Separación vertical entre secciones (compacta)" },
  { name: "section-md", token: "--space-section-md", val: "96px", px: 96, use: "Separación vertical entre secciones (estándar)" },
  { name: "section-lg", token: "--space-section-lg", val: "120px", px: 120, use: "Separación vertical entre secciones (amplia)" },
  { name: "section-xl", token: "--space-section-xl", val: "160px", px: 160, use: "Separación vertical entre secciones (hero)" },
  { name: "section-2xl", token: "--space-section-2xl", val: "192px", px: 192, use: "Separación vertical entre secciones (máxima)" },
];

const coreSizes = [
  { size: 64, label: "64" },
  { size: 48, label: "48" },
  { size: 36, label: "36" },
  { size: 24, label: "24" },
  { size: 16, label: "16" },
];

const gridSpecs = {
  ios: [
    { device: "iPhone SE", cols: 4, margin: "16px", gutter: "16px" },
    { device: "iPhone 15", cols: 4, margin: "20px", gutter: "16px" },
    { device: "iPhone 15 Pro Max", cols: 4, margin: "24px", gutter: "20px" },
    { device: "iPad (portrait)", cols: 8, margin: "32px", gutter: "20px" },
  ],
  android: [
    { device: "Compact (<600dp)", cols: 4, margin: "16px", gutter: "16px" },
    { device: "Medium (600dp)", cols: 8, margin: "32px", gutter: "20px" },
    { device: "Expanded (840dp+)", cols: 12, margin: "40px", gutter: "24px" },
  ],
};

const SpacingSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* Header */}
    <div className="mb-10">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Styles</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Dimensions</h1>
      <p className="text-muted-foreground leading-relaxed max-w-xl">
        Usamos una escala de spacing definida. Evitar valores arbitrarios fuera de la escala.
      </p>
    </div>

    {/* Core Sizes */}
    <div className="mb-14">
      <h2 className="font-display text-lg mb-2">Core sizes</h2>
      <p className="text-sm text-muted-foreground mb-4 max-w-lg">
        While all increments of 4 are available, designers will use a set of five archetype sizes that will cover 90% of their layouts.
      </p>
      <div className="border-l-2 border-primary/20 pl-4 mb-8">
        <p className="text-sm text-muted-foreground italic">
          Note that not every asset should be displayed in all sizes. We don't show an X-small avatar in this example, as its readability would be compromised.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-secondary/40 border border-border">
        {/* Size labels */}
        <div className="flex items-end justify-center gap-8 sm:gap-12 mb-6">
          {coreSizes.map((s) => (
            <div key={s.size} className="flex flex-col items-center">
              <span className="text-sm font-medium text-primary mb-3">{s.label}</span>
              <div
                className="rounded-sm bg-primary/15"
                style={{ width: s.size, height: s.size }}
              />
            </div>
          ))}
        </div>

        {/* Icons at sizes */}
        <div className="flex items-end justify-center gap-8 sm:gap-12 mb-6 pt-4 border-t border-border/50">
          {coreSizes.map((s) => (
            <div key={`icon-${s.size}`} className="flex flex-col items-center">
              <Home size={s.size} strokeWidth={1.5} className="text-foreground" />
            </div>
          ))}
        </div>

        {/* Avatars at sizes (skip 16) */}
        <div className="flex items-end justify-center gap-8 sm:gap-12 pt-4 border-t border-border/50">
          {coreSizes.filter(s => s.size >= 24).map((s) => (
            <div key={`avatar-${s.size}`} className="flex flex-col items-center">
              <div
                className="rounded-full bg-primary/20 flex items-center justify-center overflow-hidden"
                style={{ width: s.size, height: s.size }}
              >
                <User size={s.size * 0.6} strokeWidth={1.5} className="text-primary/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Spacing Scale */}
    <div className="mb-14">
      <h2 className="font-display text-lg mb-2">Spacing scale</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Escala para consistencia visual y control de ritmo en layouts.
      </p>
      <div className="space-y-1.5">
        {spacingScale.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-4 group py-1.5 px-3 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="w-36 shrink-0">
              <div className="font-mono-code text-xs text-foreground font-medium">{s.name}</div>
              <div className="font-mono-code text-[11px] text-muted-foreground">{s.token}</div>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <div
                className="h-5 bg-primary/20 rounded-xs transition-all duration-150 group-hover:bg-primary/40"
                style={{ width: s.val }}
              />
              <span className="text-xs font-mono-code text-foreground font-medium">{s.val}</span>
              <span className="text-xs text-muted-foreground hidden sm:block">— {s.use}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-14">
      <h2 className="font-display text-lg mb-2">Section spacing</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Valores de separación vertical para definir el ritmo entre secciones completas.
      </p>
      <div className="space-y-1.5">
        {sectionSpacingScale.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-4 group py-1.5 px-3 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="w-36 shrink-0">
              <div className="font-mono-code text-xs text-foreground font-medium">{s.name}</div>
              <div className="font-mono-code text-[11px] text-muted-foreground">{s.token}</div>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <div
                className="h-5 bg-primary/20 rounded-xs transition-all duration-150 group-hover:bg-primary/40"
                style={{ width: s.val }}
              />
              <span className="text-xs font-mono-code text-foreground font-medium">{s.val}</span>
              <span className="text-xs text-muted-foreground hidden sm:block">— {s.use}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Layout Grids — iOS vs Android */}
    <div className="mb-14">
      <h2 className="font-display text-lg mb-2">Layout grids</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Especificaciones de grilla para cada plataforma y tipo de dispositivo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* iOS phone mockup */}
        <div>
          <h3 className="font-display text-sm mb-3">iOS</h3>
          <div className="relative bg-secondary/40 rounded-2xl border border-border p-4 overflow-hidden">
            {/* Status bar */}
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
              <div className="flex gap-1">
                <div className="w-3 h-2 rounded-sm bg-muted-foreground/30" />
                <div className="w-3 h-2 rounded-sm bg-muted-foreground/30" />
                <div className="w-4 h-2 rounded-sm bg-muted-foreground/30" />
              </div>
            </div>
            {/* Nav bar */}
            <div className="flex items-center gap-2 mb-3 px-2">
              <span className="text-muted-foreground text-xs">←</span>
              <span className="text-xs font-medium text-foreground mx-auto">Title</span>
            </div>
            {/* Content with margin indicators */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-primary/10 rounded-l" />
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-primary/10 rounded-r" />
              <div className="px-6 space-y-3">
                <div className="text-sm font-bold text-foreground">Heading</div>
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-primary" />
                  <div>
                    <div className="text-xs font-medium">Label</div>
                    <div className="text-[10px] text-muted-foreground">Paragraph</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-primary" />
                  <div>
                    <div className="text-xs font-medium">Label</div>
                    <div className="text-[10px] text-muted-foreground">Paragraph</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Margin labels */}
            <div className="flex justify-between mt-3 px-1">
              <span className="text-[9px] text-primary font-medium">16px</span>
              <span className="text-[9px] text-primary font-medium">16px</span>
            </div>
          </div>
          {/* Specs */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">Status bar: 44pt</span>
            <span className="text-[10px] text-muted-foreground">·</span>
            <span className="text-[10px] text-muted-foreground">Nav bar: 44pt</span>
          </div>
        </div>

        {/* Android phone mockup */}
        <div>
          <h3 className="font-display text-sm mb-3">Android</h3>
          <div className="relative bg-secondary/40 rounded-2xl border border-border p-4 overflow-hidden">
            {/* Status bar */}
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] text-muted-foreground font-medium">12:30</span>
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                <div className="w-3 h-2 rounded-sm bg-muted-foreground/30" />
                <div className="w-4 h-2 rounded-sm bg-muted-foreground/30" />
                <span className="text-[9px] text-muted-foreground">100%</span>
              </div>
            </div>
            {/* Top app bar */}
            <div className="flex items-center gap-2 mb-3 px-2">
              <span className="text-muted-foreground text-xs">←</span>
              <span className="text-xs font-medium text-foreground">Title</span>
            </div>
            {/* Content with margin indicators */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-primary/10 rounded-l" />
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-primary/10 rounded-r" />
              <div className="px-6 space-y-3">
                <div className="text-sm font-bold text-foreground">Heading</div>
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-primary" />
                  <div>
                    <div className="text-xs font-medium">Label</div>
                    <div className="text-[10px] text-muted-foreground">Paragraph</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-primary" />
                  <div>
                    <div className="text-xs font-medium">Label</div>
                    <div className="text-[10px] text-muted-foreground">Paragraph</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Margin labels */}
            <div className="flex justify-between mt-3 px-1">
              <span className="text-[9px] text-primary font-medium">16px</span>
              <span className="text-[9px] text-primary font-medium">16px</span>
            </div>
          </div>
          {/* Specs */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">Status bar: 24dp</span>
            <span className="text-[10px] text-muted-foreground">·</span>
            <span className="text-[10px] text-muted-foreground">Top app bar: 48dp</span>
          </div>
        </div>
      </div>

      {/* Grid specs tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg border border-border bg-card">
          <h3 className="font-display text-sm mb-3">iOS Grid</h3>
          <div className="space-y-2">
            {gridSpecs.ios.map((g) => (
              <div key={g.device} className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0">
                <span className="text-foreground font-medium">{g.device}</span>
                <div className="flex gap-3 text-muted-foreground">
                  <span>{g.cols} col</span>
                  <span>M {g.margin}</span>
                  <span>G {g.gutter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 rounded-lg border border-border bg-card">
          <h3 className="font-display text-sm mb-3">Android Grid</h3>
          <div className="space-y-2">
            {gridSpecs.android.map((g) => (
              <div key={g.device} className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0">
                <span className="text-foreground font-medium">{g.device}</span>
                <div className="flex gap-3 text-muted-foreground">
                  <span>{g.cols} col</span>
                  <span>M {g.margin}</span>
                  <span>G {g.gutter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Touch Targets */}
    <div className="p-5 rounded-lg border border-border bg-card">
      <h3 className="font-display text-sm mb-2">Touch targets</h3>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        <li>• <strong className="text-foreground">iOS (Apple HIG):</strong> 44×44pt mínimo</li>
        <li>• <strong className="text-foreground">Android (Material):</strong> 48×48dp mínimo</li>
      </ul>
      <p className="text-xs text-muted-foreground mt-3 border-t border-border/50 pt-3">
        Si el elemento visual es más pequeño, ampliar el área táctil con padding o hit slop sin afectar el layout.
      </p>
    </div>
  </motion.div>
);

export default SpacingSection;

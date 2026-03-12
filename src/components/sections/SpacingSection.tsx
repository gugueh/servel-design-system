import { motion } from "framer-motion";

const spacingScale = [
  { token: "--space-1", val: "4px", use: "Gap entre icono y label" },
  { token: "--space-2", val: "8px", use: "Padding interno de chips" },
  { token: "--space-3", val: "12px", use: "Gap entre elementos en listas" },
  { token: "--space-4", val: "16px", use: "Padding horizontal estándar" },
  { token: "--space-5", val: "20px", use: "Padding de cards" },
  { token: "--space-6", val: "24px", use: "Separación entre secciones" },
  { token: "--space-8", val: "32px", use: "Padding vertical de pantallas" },
  { token: "--space-10", val: "40px", use: "Separación entre bloques" },
  { token: "--space-12", val: "48px", use: "Espacios hero" },
  { token: "--space-16", val: "64px", use: "Espacios estructurales" },
];

const radiusScale = [
  { token: "--radius-none", val: "0px", use: "Divisores, full-width" },
  { token: "--radius-xs", val: "4px", use: "Tags, badges, chips" },
  { token: "--radius-sm", val: "6px", use: "Botones small, inputs" },
  { token: "--radius-md", val: "10px", use: "Cards, botones medium" },
  { token: "--radius-lg", val: "16px", use: "Bottom sheets, modales" },
  { token: "--radius-xl", val: "24px", use: "Sheets full-screen" },
  { token: "--radius-full", val: "9999px", use: "Pills, avatares, FAB" },
];

const SpacingSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Styles</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Dimensions</h1>
      <p className="text-muted-foreground leading-relaxed max-w-xl">
        Todos los valores de espacio son múltiplos de 4px. No usar valores arbitrarios.
      </p>
    </div>

    <div className="mb-12">
      <h2 className="font-display text-base mb-6">Spacing scale</h2>
      <div className="space-y-2">
        {spacingScale.map((s) => (
          <div key={s.token} className="flex items-center gap-4 group">
            <span className="font-mono-code text-xs text-muted-foreground w-24 shrink-0">{s.token}</span>
            <div className="flex items-center gap-3 flex-1">
              <div
                className="h-5 bg-primary/20 rounded-xs transition-all duration-150 group-hover:bg-primary/30"
                style={{ width: s.val }}
              />
              <span className="text-xs font-mono-code text-foreground">{s.val}</span>
              <span className="text-xs text-muted-foreground hidden sm:block">— {s.use}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-12">
      <h2 className="font-display text-base mb-6">Corner Radius</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {radiusScale.map((r) => (
          <div key={r.token} className="text-center">
            <div
              className="w-16 h-16 mx-auto mb-2 border-2 border-primary/30 bg-primary/5"
              style={{ borderRadius: r.val }}
            />
            <p className="text-xs font-mono-code font-medium">{r.val}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{r.use}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="p-5 rounded-lg border border-border bg-card">
      <h3 className="font-display text-sm mb-2">Touch targets</h3>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        <li>• <strong className="text-foreground">iOS (Apple HIG):</strong> 44×44pt mínimo</li>
        <li>• <strong className="text-foreground">Android (Material):</strong> 48×48dp mínimo</li>
      </ul>
    </div>
  </motion.div>
);

export default SpacingSection;

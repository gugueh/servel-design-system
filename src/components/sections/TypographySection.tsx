import { motion } from "framer-motion";

const typeScale = [
  { token: "--font-display", size: "36px", weight: "800", lh: "1.1", tracking: "-0.04em", use: "Pantallas de bienvenida" },
  { token: "--font-h1", size: "28px", weight: "700", lh: "1.2", tracking: "-0.02em", use: "Títulos de pantalla" },
  { token: "--font-h2", size: "22px", weight: "600", lh: "1.3", tracking: "-0.01em", use: "Títulos de sección" },
  { token: "--font-h3", size: "18px", weight: "600", lh: "1.4", tracking: "0", use: "Subtítulos" },
  { token: "--font-title", size: "16px", weight: "500", lh: "1.5", tracking: "0", use: "Títulos de componentes" },
  { token: "--font-body", size: "14px", weight: "400", lh: "1.6", tracking: "0", use: "Texto principal" },
  { token: "--font-body-sm", size: "13px", weight: "400", lh: "1.6", tracking: "0", use: "Texto secundario" },
  { token: "--font-caption", size: "12px", weight: "400", lh: "1.5", tracking: "0", use: "Captions, metadata" },
  { token: "--font-label", size: "11px", weight: "500", lh: "1.4", tracking: "+0.05em", use: "Labels, tags, badges" },
];

const TypographySection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Styles</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Typography</h1>
      <p className="text-muted-foreground leading-relaxed max-w-xl">
        Tipografía crisp, técnica y excepcionalmente legible en pantallas pequeñas.
      </p>
    </div>

    <div className="mb-12">
      <h2 className="font-display text-base mb-6">Familias tipográficas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { name: "Satoshi", role: "Display", sample: "Aa Bb Cc", className: "font-display text-3xl" },
          { name: "Inter", role: "Body / UI", sample: "Aa Bb Cc", className: "font-body text-3xl" },
          { name: "JetBrains Mono", role: "Monospace", sample: "Aa Bb Cc", className: "font-mono-code text-3xl" },
        ].map((f) => (
          <div key={f.name} className="p-5 rounded-lg border border-border bg-card">
            <p className={`${f.className} mb-4`}>{f.sample}</p>
            <p className="text-sm font-medium">{f.name}</p>
            <p className="text-xs text-muted-foreground">{f.role}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-12">
      <h2 className="font-display text-base mb-6">Escala tipográfica</h2>
      <div className="space-y-0 border border-border rounded-lg overflow-hidden">
        {typeScale.map((t, i) => (
          <div
            key={t.token}
            className={`flex items-baseline gap-6 px-5 py-4 ${i < typeScale.length - 1 ? "border-b border-border/50" : ""}`}
          >
            <span
              className="shrink-0 min-w-[200px]"
              style={{
                fontSize: t.size,
                fontWeight: Number(t.weight),
                lineHeight: t.lh,
                letterSpacing: t.tracking,
              }}
            >
              Design System
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
              <span className="font-mono-code shrink-0">{t.size} / {t.weight}</span>
              <span className="hidden sm:block">·</span>
              <span>{t.use}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="p-5 rounded-lg border border-border bg-card">
      <h3 className="font-display text-sm mb-3">Reglas de uso</h3>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        <li>• Tamaño mínimo legible: <strong className="text-foreground">12px</strong>. Labels críticos: <strong className="text-foreground">11px</strong>.</li>
        <li>• Máximo <strong className="text-foreground">2 tamaños</strong> por pantalla para jerarquía limpia.</li>
        <li>• Máximo <strong className="text-foreground">3 pesos</strong> distintos por pantalla.</li>
        <li>• Botones: siempre <strong className="text-foreground">font-weight: 500</strong> o superior.</li>
      </ul>
    </div>
  </motion.div>
);

export default TypographySection;

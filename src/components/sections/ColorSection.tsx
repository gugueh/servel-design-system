import { motion } from "framer-motion";

const colors = {
  Primary: [
    { token: "primary-100", hex: "#E8E5FE", hsl: "248 95% 95%" },
    { token: "primary-300", hex: "#C4BBFB", hsl: "250 91% 86%" },
    { token: "primary-400", hex: "#A594F9", hsl: "254 88% 78%" },
    { token: "primary-500", hex: "#7C6AF7", hsl: "254 91% 69%" },
    { token: "primary-600", hex: "#5A47D4", hsl: "254 63% 55%" },
    { token: "primary-700", hex: "#3D2EAA", hsl: "254 57% 42%" },
  ],
  Success: [
    { token: "success-100", hex: "#D1FAE5", hsl: "152 76% 90%" },
    { token: "success-500", hex: "#3DD68C", hsl: "152 64% 54%" },
    { token: "success-700", hex: "#065F46", hsl: "160 90% 20%" },
  ],
  Warning: [
    { token: "warning-100", hex: "#FEF3C7", hsl: "42 96% 89%" },
    { token: "warning-500", hex: "#F5A524", hsl: "36 91% 55%" },
    { token: "warning-700", hex: "#92400E", hsl: "28 83% 31%" },
  ],
  Error: [
    { token: "error-100", hex: "#FFE4EF", hsl: "338 100% 95%" },
    { token: "error-500", hex: "#F54180", hsl: "340 90% 61%" },
    { token: "error-700", hex: "#9D174D", hsl: "336 76% 35%" },
  ],
  Neutrals: [
    { token: "neutral-0", hex: "#FFFFFF", hsl: "0 0% 100%" },
    { token: "neutral-50", hex: "#F8F8FC", hsl: "240 33% 98%" },
    { token: "neutral-100", hex: "#F2F2F8", hsl: "240 33% 96%" },
    { token: "neutral-200", hex: "#D8D8E8", hsl: "240 24% 88%" },
    { token: "neutral-400", hex: "#9898B0", hsl: "240 14% 64%" },
    { token: "neutral-600", hex: "#55556A", hsl: "240 11% 37%" },
    { token: "neutral-800", hex: "#2A2A38", hsl: "240 15% 19%" },
    { token: "neutral-900", hex: "#1E1E25", hsl: "240 14% 13%" },
    { token: "neutral-950", hex: "#0A0A0B", hsl: "240 5% 3%" },
  ],
};

const ColorSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs font-medium tracking-widest uppercase text-primary">Styles</p>
        <span className="px-2 py-0.5 text-[10px] font-medium bg-warning-subtle text-warning rounded-full">Beta</span>
      </div>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Color</h1>
      <p className="text-muted-foreground leading-relaxed max-w-xl">
        Los colores primitivos son los valores base. Siempre referenciar tokens semánticos en componentes.
      </p>
    </div>

    {Object.entries(colors).map(([group, swatches]) => (
      <div key={group} className="mb-10">
        <h2 className="font-display text-base mb-4">{group}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {swatches.map((s) => (
            <div key={s.token} className="group">
              <div
                className="aspect-square rounded-lg mb-2 border border-border transition-transform duration-150 group-hover:scale-[1.03]"
                style={{ backgroundColor: s.hex }}
              />
              <p className="text-xs font-mono-code font-medium text-foreground">{s.token}</p>
              <p className="text-[11px] font-mono-code text-muted-foreground">{s.hex}</p>
            </div>
          ))}
        </div>
      </div>
    ))}

    <div className="mt-12">
      <h2 className="font-display text-base mb-4">Tokens semánticos</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 pr-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Token</th>
              <th className="text-left py-3 pr-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Light</th>
              <th className="text-left py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">Dark</th>
            </tr>
          </thead>
          <tbody>
            {[
              { token: "--color-bg-primary", light: "neutral-0", dark: "neutral-950" },
              { token: "--color-bg-secondary", light: "neutral-50", dark: "neutral-900" },
              { token: "--color-bg-surface", light: "neutral-0", dark: "neutral-900" },
              { token: "--color-text-primary", light: "neutral-950", dark: "neutral-100" },
              { token: "--color-text-secondary", light: "neutral-600", dark: "neutral-400" },
              { token: "--color-border-default", light: "neutral-200", dark: "neutral-800" },
            ].map((row) => (
              <tr key={row.token} className="border-b border-border/50">
                <td className="py-3 pr-4 font-mono-code text-xs">{row.token}</td>
                <td className="py-3 pr-4 text-xs text-muted-foreground">{row.light}</td>
                <td className="py-3 text-xs text-muted-foreground">{row.dark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12 p-5 rounded-lg border border-border bg-card">
      <h3 className="font-display text-sm mb-2">Accesibilidad y contraste</h3>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        <li>• Texto normal (&lt;18px): contraste mínimo <strong className="text-foreground">4.5:1</strong> (WCAG AA)</li>
        <li>• Texto grande (≥18px): contraste mínimo <strong className="text-foreground">3:1</strong> (WCAG AA)</li>
        <li>• Elementos UI: contraste mínimo <strong className="text-foreground">3:1</strong></li>
      </ul>
    </div>
  </motion.div>
);

export default ColorSection;

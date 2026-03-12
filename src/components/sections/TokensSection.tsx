import { motion } from "framer-motion";

const TokensSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Styles</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Design Tokens</h1>
      <p className="text-muted-foreground leading-relaxed max-w-xl">
        Los átomos del sistema: valores nombrados que representan decisiones de diseño.
      </p>
    </div>

    <div className="mb-10 p-5 rounded-lg bg-secondary">
      <h3 className="font-display text-sm mb-3">Estructura de tokens</h3>
      <pre className="font-mono-code text-xs leading-relaxed text-muted-foreground overflow-x-auto">
{`tokens/
├── color/
│   ├── primitives.json
│   ├── semantic.json
│   └── dark.json
├── typography/
│   ├── scale.json
│   └── fonts.json
├── spacing/
│   └── scale.json
├── radius/
│   └── scale.json
├── elevation/
│   └── scale.json
└── motion/
    ├── duration.json
    └── easing.json`}
      </pre>
    </div>

    <div className="mb-10">
      <h2 className="font-display text-base mb-4">Categorías</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 pr-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">Categoría</th>
              <th className="text-left py-3 pr-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">Prefijo</th>
              <th className="text-left py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cat: "Color", prefix: "--color-", example: "--color-bg-primary" },
              { cat: "Tipografía", prefix: "--font-", example: "--font-size-body" },
              { cat: "Espaciado", prefix: "--space-", example: "--space-4" },
              { cat: "Radio", prefix: "--radius-", example: "--radius-md" },
              { cat: "Elevación", prefix: "--elevation-", example: "--elevation-2" },
              { cat: "Duración", prefix: "--duration-", example: "--duration-normal" },
              { cat: "Easing", prefix: "--easing-", example: "--easing-standard" },
            ].map((r) => (
              <tr key={r.cat} className="border-b border-border/50">
                <td className="py-3 pr-4 text-sm">{r.cat}</td>
                <td className="py-3 pr-4 font-mono-code text-xs text-primary">{r.prefix}</td>
                <td className="py-3 font-mono-code text-xs text-muted-foreground">{r.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="p-5 rounded-lg border border-border bg-card">
      <h3 className="font-display text-sm mb-2">Convención de nomenclatura</h3>
      <code className="font-mono-code text-xs text-muted-foreground">
        {"--{categoría}-{escala|rol}-{variante?}"}
      </code>
    </div>
  </motion.div>
);

export default TokensSection;

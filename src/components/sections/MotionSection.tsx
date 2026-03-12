import { motion } from "framer-motion";

const MotionSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Expression</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Motion</h1>
      <p className="text-muted-foreground leading-relaxed max-w-xl">
        La animación refuerza jerarquía, comunica causalidad y respeta al usuario.
      </p>
    </div>

    <div className="mb-12">
      <h2 className="font-display text-base mb-4">Duraciones</h2>
      <div className="space-y-3">
        {[
          { token: "--duration-instant", val: "100ms", use: "Hover, focus, cambio de color" },
          { token: "--duration-fast", val: "200ms", use: "Dismiss de toasts, toggles" },
          { token: "--duration-normal", val: "300ms", use: "Entrada de modales, sheets" },
          { token: "--duration-slow", val: "500ms", use: "Transiciones de pantalla" },
          { token: "--duration-enter", val: "400ms", use: "Onboarding y celebración" },
        ].map((d) => (
          <div key={d.token} className="flex items-center gap-4">
            <span className="font-mono-code text-xs text-muted-foreground w-40 shrink-0">{d.token}</span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(parseInt(d.val) / 500) * 100}%` }}
                transition={{ duration: parseInt(d.val) / 1000, delay: 0.3 }}
              />
            </div>
            <span className="font-mono-code text-xs w-14 text-right">{d.val}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-12">
      <h2 className="font-display text-base mb-4">Curvas de easing</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 pr-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">Token</th>
              <th className="text-left py-3 pr-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">Valor</th>
              <th className="text-left py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">Uso</th>
            </tr>
          </thead>
          <tbody>
            {[
              { token: "--easing-standard", val: "cubic-bezier(0.4, 0, 0.2, 1)", use: "Transiciones de estado" },
              { token: "--easing-decelerate", val: "cubic-bezier(0, 0, 0.2, 1)", use: "Entrada de elementos" },
              { token: "--easing-accelerate", val: "cubic-bezier(0.4, 0, 1, 1)", use: "Salida de elementos" },
              { token: "--easing-spring", val: "cubic-bezier(0.34, 1.56, 0.64, 1)", use: "FAB, feedback táctil" },
            ].map((row) => (
              <tr key={row.token} className="border-b border-border/50">
                <td className="py-3 pr-4 font-mono-code text-xs">{row.token}</td>
                <td className="py-3 pr-4 font-mono-code text-xs text-muted-foreground">{row.val}</td>
                <td className="py-3 text-xs text-muted-foreground">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h2 className="font-display text-base mb-4">Interactive demo</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Button press", scale: 0.97 },
          { label: "Card hover", scale: 1.02 },
          { label: "FAB", scale: 1.05 },
          { label: "List item", scale: 1.01 },
        ].map((demo) => (
          <motion.div
            key={demo.label}
            whileHover={{ scale: demo.scale > 1 ? demo.scale : 1.02 }}
            whileTap={{ scale: demo.scale < 1 ? demo.scale : 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="flex items-center justify-center h-24 rounded-lg border border-border bg-card cursor-pointer select-none hover:shadow-elevation-1 transition-shadow"
          >
            <span className="text-xs font-medium text-muted-foreground">{demo.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default MotionSection;

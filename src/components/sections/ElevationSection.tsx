import { motion } from "framer-motion";

const ElevationSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Styles</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Elevation</h1>
      <p className="text-muted-foreground leading-relaxed max-w-xl">
        Comunica jerarquía Z y la relación entre capas de la interfaz.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
      {[
        { level: 0, label: "Flat", use: "Superficies planas", shadow: "none" },
        { level: 1, label: "Raised", use: "Cards, list items", shadow: "var(--elevation-1)" },
        { level: 2, label: "Floating", use: "Dropdowns, popovers", shadow: "var(--elevation-2)" },
        { level: 3, label: "Modal", use: "Modales, bottom sheets", shadow: "var(--elevation-3)" },
        { level: 4, label: "Max", use: "Full-screen overlays", shadow: "0 20px 60px rgba(0,0,0,0.18)" },
      ].map((e) => (
        <div key={e.level} className="text-center">
          <div
            className="w-full aspect-square rounded-lg bg-card border border-border mb-3 flex items-center justify-center"
            style={{ boxShadow: e.shadow }}
          >
            <span className="font-display text-2xl text-muted-foreground/40">{e.level}</span>
          </div>
          <p className="text-sm font-medium">{e.label}</p>
          <p className="text-xs text-muted-foreground">{e.use}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default ElevationSection;

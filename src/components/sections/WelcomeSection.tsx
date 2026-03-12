import { motion } from "framer-motion";

const WelcomeSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-12">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Getting Started</p>
      <h1 className="font-display-xl text-4xl md:text-5xl leading-[1.1] mb-4">
        Build better,<br />faster.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
        El toolkit definitivo para construir experiencias móviles consistentes, accesibles y escalables en iOS y Android.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
      {[
        { title: "Claridad ante todo", desc: "Cada elemento comunica su función sin fricción." },
        { title: "Consistencia sistemática", desc: "Los mismos tokens, los mismos patrones, el mismo lenguaje." },
        { title: "Inclusión de base", desc: "La accesibilidad no es un add-on; es parte de cada decisión." },
        { title: "Mobile-first real", desc: "Diseñamos para una mano, luz solar e interrupciones." },
      ].map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          className="group p-5 rounded-lg border border-border bg-card hover:shadow-elevation-1 transition-shadow duration-200"
        >
          <h3 className="font-display text-sm mb-1.5">{p.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="space-y-6">
      <h2 className="font-display text-lg">Plataformas soportadas</h2>
      <div className="flex flex-wrap gap-2">
        {["iOS — UIKit", "iOS — SwiftUI", "Android — Compose", "Android — XML", "React Native"].map(p => (
          <span key={p} className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
            {p}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default WelcomeSection;

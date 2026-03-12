import { motion } from "framer-motion";

const ChangelogSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Resources</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Changelog</h1>
    </div>

    <div className="space-y-8">
      {[
        {
          version: "v2.4.0",
          date: "Marzo 2026",
          changes: [
            { type: "new", text: "Documentación de gestos mobile" },
            { type: "new", text: "Guías de Map annotations en Content Design" },
            { type: "updated", text: "Dark mode tokens en todos los componentes" },
            { type: "updated", text: "Word list con 15 nuevos términos" },
            { type: "fix", text: "Comportamiento de foco en modales en Android" },
          ],
        },
        {
          version: "v2.3.0",
          date: "Enero 2026",
          changes: [
            { type: "new", text: "Componente Skeleton loader (Beta)" },
            { type: "new", text: "Motion tokens documentados" },
            { type: "updated", text: "Mejoras de accesibilidad en Bottom navigation y Tabs" },
            { type: "updated", text: "Guías de Emojis revisadas" },
          ],
        },
        {
          version: "v2.0.0",
          date: "Octubre 2025",
          changes: [
            { type: "breaking", text: "Rediseño del sistema de tokens semánticos" },
            { type: "breaking", text: "API de Button y Text field actualizada" },
            { type: "new", text: "Nueva paleta de color completa" },
            { type: "new", text: "Secciones Product Voice y Product Tone" },
            { type: "updated", text: "Migración a escala de espaciado 4px" },
          ],
        },
      ].map((release) => (
        <div key={release.version} className="border-l-2 border-border pl-6 relative">
          <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary" />
          <div className="flex items-baseline gap-3 mb-3">
            <h2 className="font-display text-lg">{release.version}</h2>
            <span className="text-xs text-muted-foreground">{release.date}</span>
          </div>
          <ul className="space-y-1.5">
            {release.changes.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span
                  className={`shrink-0 mt-0.5 px-1.5 py-0.5 text-[10px] font-medium rounded ${
                    c.type === "new"
                      ? "bg-success-subtle text-success"
                      : c.type === "updated"
                      ? "bg-info-subtle text-info"
                      : c.type === "fix"
                      ? "bg-warning-subtle text-warning"
                      : "bg-error-subtle text-error"
                  }`}
                >
                  {c.type === "new" ? "New" : c.type === "updated" ? "Updated" : c.type === "fix" ? "Fix" : "Breaking"}
                </span>
                <span className="text-muted-foreground">{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </motion.div>
);

export default ChangelogSection;

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Users } from "lucide-react";

const AboutSection = () => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <div className="mb-10">
      <p className="mb-3 text-xs font-medium tracking-widest uppercase text-primary">Servel</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Nosotros</h1>
      <p className="text-muted-foreground leading-relaxed max-w-xl">
        Servel es una startup creada para conectar profesionales (prestadores) con clientes. Diseñamos una experiencia
        simple y user friendly, cuidando a ambos lados del servicio: claridad para contratar y confianza para prestar.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {[
        {
          title: "Conectar sin fricción",
          desc: "Menos pasos, más señales claras: encontrar, comparar y coordinar rápido.",
          Icon: Sparkles,
        },
        {
          title: "Cuidar a ambas partes",
          desc: "Reglas, mensajes y estados que protegen la relación cliente–prestador.",
          Icon: ShieldCheck,
        },
        {
          title: "Construir confianza",
          desc: "Información transparente, decisiones guiadas y expectativas alineadas.",
          Icon: Users,
        },
      ].map(({ title, desc, Icon }) => (
        <div key={title} className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="font-display text-sm mb-1.5">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="font-display text-lg">¿Qué es este Design System?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Es la fuente única de verdad para diseñar y construir Servel: tokens, componentes, patrones y contenido. Nos
          ayuda a mantener consistencia, acelerar entregas y mejorar accesibilidad sin sacrificar identidad.
        </p>
        <div className="pt-2 space-y-6 max-w-2xl">
          <div>
            <h3 className="font-display text-sm mb-1">Consistencia</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cuando la interfaz se comporta igual en cada pantalla, las personas no tienen que “aprender de nuevo”.
              Esto reduce dudas, baja errores y hace que contratar o prestar un servicio sea más predecible. La
              consistencia también alinea a producto, diseño y desarrollo con el mismo lenguaje.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm mb-1">Escalabilidad</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Un sistema bien definido permite crecer sin perder control: cambios centralizados, decisiones repetibles y
              componentes que evolucionan con versión. Así evitamos “parches” visuales y mantenemos velocidad incluso
              cuando el producto suma features y equipos.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm mb-1">Accesibilidad</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Diseñamos para más contextos reales: luz solar, una mano, conexiones lentas, lectores de pantalla, tamaños
              de fuente grandes. Integrar accesibilidad desde el sistema no solo incluye a más personas: también mejora
              la claridad para todos.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm mb-1">Calidad</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Estados, variantes y reglas claras evitan sorpresas. La calidad se nota cuando todo responde como se
              espera: feedback inmediato, errores entendibles y una experiencia que transmite confianza. Eso impacta
              directo en conversión, retención y reputación.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg">Principios de experiencia</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Diseñamos para que cada interacción sea clara, predecible y humana. Estos principios guían desde los flujos
          hasta los detalles visuales.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <li>• Primero, entender: textos claros y ayudas en contexto.</li>
          <li>• Decisiones guiadas: estados y feedback en el momento justo.</li>
          <li>• Confianza visible: seguridad, políticas y transparencia a la vista.</li>
          <li>• Respeto por el tiempo: flujos cortos y predecibles.</li>
        </ul>
        <p className="pt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
          <span className="font-medium text-foreground">Tono de Servel:</span> cálido y directo. Acompañamos sin invadir,
          explicamos sin abrumar.
        </p>
      </section>
    </div>
  </motion.div>
);

export default AboutSection;

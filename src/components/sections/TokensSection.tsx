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
        Los Design Tokens son decisiones fundamentales de diseño representadas como datos reutilizables.
      </p>
    </div>

    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Estos tokens se comparten entre todas las plataformas: iOS, Android y Web, y controlan gran parte de la capa
          visual del sistema de diseño.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Su objetivo es asegurar consistencia, escalabilidad y sincronización entre diseño y desarrollo.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-lg">Anatomía</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Cada design token está compuesto por un nombre y un valor. Esta relación funciona de forma similar a una
            estructura de diccionario en programación, donde una clave (key) se asocia a un valor (value). Gracias a
            esto, los tokens pueden almacenarse, reutilizarse y actualizarse fácilmente en todo el sistema.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-elevation-1 p-5 sm:p-6 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-4 sm:gap-y-3">
            <div className="text-[10px] uppercase tracking-wider text-error sm:pt-1">Requerido</div>
            <div className="flex items-start justify-between gap-4">
              <div className="font-medium">Nombre</div>
              <div className="font-mono-code text-xs text-muted-foreground">Primitives.Blue.600</div>
            </div>

            <div className="text-[10px] uppercase tracking-wider text-muted-foreground sm:pt-1">Opcional</div>
            <div className="flex items-start justify-between gap-4">
              <div className="font-medium">Tipo</div>
              <div className="font-mono-code text-xs text-muted-foreground">$color</div>
            </div>

            <div className="text-[10px] uppercase tracking-wider text-error sm:pt-1">Requerido</div>
            <div className="flex items-start justify-between gap-4">
              <div className="font-medium">Valor</div>
              <div className="flex items-center gap-2 font-mono-code text-xs text-muted-foreground">
                <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: "#266EF1" }} />
                #266EF1
              </div>
            </div>

            <div className="text-[10px] uppercase tracking-wider text-muted-foreground sm:pt-1">Opcional</div>
            <div className="flex items-start justify-between gap-4">
              <div className="font-medium">Descripción</div>
              <div className="text-xs text-muted-foreground">Primitivo, usar con moderación</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                  Campo
                </th>
                <th className="text-left py-3 pr-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                  Requerido
                </th>
                <th className="text-left py-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                  ¿Qué aporta?
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { field: "Nombre", required: "Sí", desc: "Identifica y se referencia igual en todas las plataformas." },
                { field: "Tipo", required: "No", desc: "Clasifica la propiedad de diseño que representa." },
                { field: "Valor", required: "Sí", desc: "Define la propiedad visual concreta (color, tamaño, etc.)." },
                { field: "Descripción", required: "No", desc: "Aporta contexto: cuándo usarlo y cuándo evitarlo." },
              ].map((row) => (
                <tr key={row.field} className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium">{row.field}</td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground">{row.required}</td>
                  <td className="py-3 text-xs text-muted-foreground">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg">Nombre (requerido)</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          El nombre es la parte más importante de un design token, ya que es la forma en la que será identificado y
          referenciado en todas las plataformas.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Definir nombres puede ser complejo. Por eso cada tipo de token sigue convenciones específicas documentadas
          dentro del sistema.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Al construir el nombre de un token se consideran principalmente dos propiedades: tier y type.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-lg">Type</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            El tipo de token define qué propiedad de diseño representa. Cada tipo sigue convenciones de nomenclatura y
            buenas prácticas específicas para garantizar que tanto diseñadores como desarrolladores puedan comprenderlos
            y utilizarlos fácilmente.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-medium">Nombre</th>
                <th className="text-left py-3 font-medium">Definición</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Color", def: "Valores de color, incluyendo nombres y valores hexadecimales (HEX) o RGB." },
                { name: "Dimensión", def: "Valores numéricos con unidades, como px, rem o em." },
                { name: "Familia tipográfica", def: "Familias de fuentes, por ejemplo una familia corporativa." },
                { name: "Peso tipográfico", def: "Pesos como 400, 500, 700, o nombres equivalentes." },
                { name: "Duración", def: "Duraciones de tiempo, como 200ms o 0.3s." },
                { name: "Bézier cúbico", def: "Funciones de easing definidas con curvas cubic-bezier." },
                { name: "Número", def: "Valores numéricos simples sin unidad." },
              ].map((row) => (
                <tr key={row.name} className="border-b border-border/50">
                  <td className="py-3 pr-4">{row.name}</td>
                  <td className="py-3 text-muted-foreground">{row.def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg">Tier</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          El tier indica qué tan específico es el token dentro del sistema. Los tokens más fundacionales suelen tener
          nombres más simples. Generalmente están compuestos por el tipo del token seguido de una escala numérica u
          ordinal.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          A medida que un token se vuelve más contextual o específico, su nombre incluye más información para indicar su
          propósito dentro de un componente o contexto determinado.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-lg">Value (requerido)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            El valor define la propiedad visual específica asociada a un token. Dependiendo del tipo de token y su
            complejidad, los valores pueden representarse mediante diferentes tipos de datos.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-medium">Tipo de dato</th>
                <th className="text-left py-3 font-medium">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "String", def: "Secuencia de caracteres que puede representar texto, como nombres de fuentes o colores." },
                { name: "Number", def: "Valor numérico utilizado para propiedades como tamaños, espaciados o duraciones." },
                { name: "Color", def: "Valor que representa un color específico, generalmente en formato hexadecimal o RGB." },
                { name: "Boolean", def: "Valor verdadero o falso que se utiliza para propiedades binarias, como visibilidad o estados." },
                { name: "Object", def: "Conjunto de pares clave/valor para representar propiedades más complejas, como sombras o gradientes." },
                { name: "Array", def: "Colección de valores del mismo tipo, por ejemplo una escala tipográfica o de spacing." },
                { name: "Null", def: "Valor especial que representa la ausencia de un valor." },
              ].map((row) => (
                <tr key={row.name} className="border-b border-border/50">
                  <td className="py-3 pr-4 font-mono-code text-xs">{row.name}</td>
                  <td className="py-3 text-muted-foreground">{row.def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-lg">Composite Tokens</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Los composite tokens son tokens cuyo valor se construye a partir de uno o más tokens hijos. En lugar de
            definir un valor directamente, utilizan cálculos o referencias a otros tokens para generar un nuevo valor.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Este enfoque permite crear propiedades dinámicas, como tamaños derivados, y definir tokens más complejos en
            niveles de componentes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-medium">Token</th>
                <th className="text-left py-3 font-medium">Composición</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Stroke", def: "Composición de un arreglo de anchos (dashArray) y una propiedad de forma (lineCap)." },
                { name: "Border", def: "Composición de un token de color, un valor numérico de ancho y un estilo." },
                { name: "Transition", def: "Composición de duración, delay y una función de timing." },
                { name: "Shadow", def: "Composición de un color, offsets en X e Y, blur y spread." },
                { name: "Gradient", def: "Composición de múltiples tokens de color y sus posiciones dentro del gradiente." },
                { name: "Typography", def: "Composición de familia tipográfica, tamaño, peso, letter spacing y line height." },
              ].map((row) => (
                <tr key={row.name} className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium">{row.name}</td>
                  <td className="py-3 text-muted-foreground">{row.def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </motion.div>
);

export default TokensSection;

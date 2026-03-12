import { useState } from "react";
import DocSidebar from "@/components/DocSidebar";
import WelcomeSection from "@/components/sections/WelcomeSection";
import ColorSection from "@/components/sections/ColorSection";
import TypographySection from "@/components/sections/TypographySection";
import SpacingSection from "@/components/sections/SpacingSection";
import ElevationSection from "@/components/sections/ElevationSection";
import TokensSection from "@/components/sections/TokensSection";
import MotionSection from "@/components/sections/MotionSection";
import ComponentsSection from "@/components/sections/ComponentsSection";
import ChangelogSection from "@/components/sections/ChangelogSection";
import GenericSection from "@/components/sections/GenericSection";

const sectionContent: Record<string, React.ReactNode> = {
  welcome: <WelcomeSection />,
  tokens: <TokensSection />,
  color: <ColorSection />,
  typography: <TypographySection />,
  spacing: <SpacingSection />,
  elevation: <ElevationSection />,
  motion: <MotionSection />,
  components: <ComponentsSection />,
  changelog: <ChangelogSection />,
  faqs: (
    <GenericSection title="FAQs" category="Getting Started">
      <div className="space-y-6">
        {[
          { q: "¿Cómo reporto un bug en un componente?", a: "Abrí un issue en el repositorio con el label bug y el nombre del componente afectado." },
          { q: "¿Cómo propongo un nuevo componente?", a: "Seguí el proceso de RFC (Request for Comments) detallado en la sección Contribuir." },
          { q: "¿Con qué frecuencia se actualiza el sistema?", a: "Releases mensuales de parches y releases trimestrales de features." },
          { q: "¿Los archivos de Figma están sincronizados con el código?", a: "Sí. Los tokens de diseño se exportan desde Figma y se sincronizan automáticamente con el repositorio en cada release." },
          { q: "¿Qué plataformas soporta el sistema?", a: "iOS (UIKit y SwiftUI) y Android (Compose y XML). Los tokens están disponibles también para React Native." },
        ].map((faq, i) => (
          <div key={i} className="p-5 rounded-lg border border-border bg-card">
            <h3 className="font-display text-sm mb-2">{faq.q}</h3>
            <p className="text-sm text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </div>
    </GenericSection>
  ),
  radius: (
    <GenericSection title="Corner Radius" category="Styles">
      <p className="text-muted-foreground mb-4">See the Dimensions section for the complete radius scale.</p>
    </GenericSection>
  ),
  icons: (
    <GenericSection title="Icons" category="Expression">
      <div className="space-y-6">
        <div className="p-5 rounded-lg border border-border bg-card">
          <h3 className="font-display text-sm mb-2">Especificaciones</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• Canvas: <strong className="text-foreground">24×24px</strong></li>
            <li>• Stroke width: <strong className="text-foreground">1.5px</strong></li>
            <li>• Corner: stroke con <strong className="text-foreground">round</strong> join y cap</li>
            <li>• Tamaños: 16px, 20px, 24px</li>
          </ul>
        </div>
        <div className="p-5 rounded-lg border border-border bg-card">
          <h3 className="font-display text-sm mb-2">Reglas</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• No escalar iconos con CSS transform</li>
            <li>• Siempre proveer un <code className="font-mono-code text-xs bg-secondary px-1 py-0.5 rounded">aria-label</code> cuando sea el único indicador</li>
            <li>• No modificar el stroke width fuera de los valores definidos</li>
          </ul>
        </div>
      </div>
    </GenericSection>
  ),
  voice: (
    <GenericSection title="Voice & Tone" category="Content Design">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { attr: "Clara", desc: "Directa y sin ambigüedades.", not: "Vaga o evasiva" },
            { attr: "Confiable", desc: "Segura, precisa. No promete lo que no puede cumplir.", not: "Condescendiente" },
            { attr: "Cercana", desc: "Humana y cálida, sin ser informal en exceso.", not: "Fría o corporativa" },
            { attr: "Eficiente", desc: "Respeta el tiempo del usuario. Va al grano.", not: "Verbosa o repetitiva" },
          ].map((v) => (
            <div key={v.attr} className="p-5 rounded-lg border border-border bg-card">
              <h3 className="font-display text-sm mb-1">{v.attr}</h3>
              <p className="text-sm text-muted-foreground mb-2">{v.desc}</p>
              <p className="text-xs text-error">No es: {v.not}</p>
            </div>
          ))}
        </div>
      </div>
    </GenericSection>
  ),
  writing: (
    <GenericSection title="Writing for Components" category="Content Design">
      <div className="space-y-6">
        {[
          { comp: "Botones", rules: ["Primary: Verbo de acción claro. Máx. 3 palabras.", "Secondary: Complementa al primario.", "Destructive: Describir exactamente lo que se destruye.", "❌ Evitar: \"OK\", \"Sí\", \"No\", \"Click aquí\""] },
          { comp: "Inputs", rules: ["Label: Sustantivo o frase corta.", "Placeholder: Ejemplo del formato esperado.", "Helper text: Información proactiva.", "Error: Describe el problema Y cómo resolverlo."] },
          { comp: "Modales", rules: ["Título: Describe la decisión, no la acción.", "Cuerpo: Explica consecuencias.", "Botón principal: Confirma con el mismo verbo del título."] },
        ].map((group) => (
          <div key={group.comp} className="p-5 rounded-lg border border-border bg-card">
            <h3 className="font-display text-sm mb-3">{group.comp}</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {group.rules.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </GenericSection>
  ),
  a11y: (
    <GenericSection title="Accessibility" category="Product Inclusion">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Incluir desde el comienzo", desc: "La inclusión no se agrega al final. Se diseña desde los primeros wireframes." },
            { title: "Reconocer la exclusión", desc: "Identificar cuándo y por qué excluimos a grupos de usuarios." },
            { title: "Aprender de la diversidad", desc: "Los usuarios con necesidades diversas revelan fricciones que afectan a todos." },
            { title: "Ofrecer alternativas", desc: "Una sola forma de hacer algo excluye. Siempre ofrecer rutas alternativas." },
          ].map((p) => (
            <div key={p.title} className="p-5 rounded-lg border border-border bg-card">
              <h3 className="font-display text-sm mb-1.5">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="p-5 rounded-lg border border-border bg-card">
          <h3 className="font-display text-sm mb-3">Checklist por componente</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>☐ Contraste mínimo de 4.5:1 para texto</li>
            <li>☐ Área táctil mínima de 44×44pt / 48×48dp</li>
            <li>☐ Funcionar con fuentes grandes (hasta 200%)</li>
            <li>☐ Comunicar estados sin depender solo del color</li>
            <li>☐ Labels de accesibilidad descriptivos</li>
            <li>☐ Respetar prefers-reduced-motion</li>
          </ul>
        </div>
      </div>
    </GenericSection>
  ),
  resources: (
    <GenericSection title="Resources" category="Resources">
      <div className="space-y-4">
        {[
          { name: "🎨 UI Kit — Foundations", desc: "Tokens, colores, tipografía, iconos, illicons" },
          { name: "🧱 UI Kit — Components", desc: "Todos los componentes con variantes y estados" },
          { name: "📐 Layouts & Templates", desc: "Templates de pantallas para iOS y Android" },
          { name: "🔁 Patterns Library", desc: "Flujos de UX completos y documentados" },
        ].map((r) => (
          <div key={r.name} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-elevation-1 transition-shadow cursor-pointer">
            <div>
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </GenericSection>
  ),
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("welcome");

  return (
    <div className="flex min-h-screen bg-background">
      <DocSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
          {sectionContent[activeSection] || <WelcomeSection />}
        </div>
      </main>
    </div>
  );
};

export default Index;

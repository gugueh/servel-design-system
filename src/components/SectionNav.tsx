import { ChevronLeft, ChevronRight } from "lucide-react";

const allSections = [
  { id: "welcome", label: "Welcome" },
  { id: "faqs", label: "FAQs" },
  { id: "tokens", label: "Design Tokens" },
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Dimensions" },
  { id: "radius", label: "Corner Radius" },
  { id: "elevation", label: "Elevation" },
  { id: "icons", label: "Icons" },
  { id: "motion", label: "Motion" },
  { id: "voice", label: "Voice & Tone" },
  { id: "writing", label: "Writing" },
  { id: "a11y", label: "Accessibility" },
  { id: "components", label: "Components" },
  { id: "resources", label: "Resources" },
  { id: "changelog", label: "Changelog" },
];

interface SectionNavProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const SectionNav = ({ currentSection, onNavigate }: SectionNavProps) => {
  const currentIndex = allSections.findIndex((s) => s.id === currentSection);
  const prev = currentIndex > 0 ? allSections[currentIndex - 1] : null;
  const next = currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-border">
      <div className="flex items-center justify-between">
        {prev ? (
          <button
            onClick={() => onNavigate(prev.id)}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="underline underline-offset-2">{prev.label}</span>
          </button>
        ) : (
          <div />
        )}
        {next ? (
          <button
            onClick={() => onNavigate(next.id)}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="underline underline-offset-2">{next.label}</span>
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default SectionNav;

import { ChevronLeft, ChevronRight } from "lucide-react";
import { allDocSections } from "@/lib/doc-sections";

interface SectionNavProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const SectionNav = ({ currentSection, onNavigate }: SectionNavProps) => {
  const currentIndex = allDocSections.findIndex((s) => s.id === currentSection);
  const prev = currentIndex > 0 ? allDocSections[currentIndex - 1] : null;
  const next = currentIndex < allDocSections.length - 1 ? allDocSections[currentIndex + 1] : null;

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

import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ServelFooterProps = {
  onNavigate: (section: string) => void;
  className?: string;
};

const ServelFooter = ({ onNavigate, className }: ServelFooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-border", className)}>
      <div className="mx-auto max-w-5xl px-6 lg:px-10 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { label: "Servel Design", onClick: () => onNavigate("welcome") },
              { label: "Privacidad", onClick: () => onNavigate("faqs") },
              { label: "Accesibilidad", onClick: () => onNavigate("a11y") },
              { label: "Términos", onClick: () => onNavigate("faqs") },
            ].map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={l.onClick}
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href="https://servel.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              servel.com
            </a>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("faqs")}
            className="ml-auto inline-flex items-center gap-1 text-sm underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors sm:ml-0"
          >
            FAQs <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">© {year} Servel. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
};

export default ServelFooter;


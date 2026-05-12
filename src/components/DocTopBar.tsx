import { useEffect, useMemo, useState } from "react";
import { Menu, Search, Users } from "lucide-react";

import { allDocSections, docSectionGroups } from "@/lib/doc-sections";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import ServelLogo from "@/components/ServelLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

type DocTopBarProps = {
  onNavigate: (section: string) => void;
  onMenuClick?: () => void;
  className?: string;
};

const DocTopBar = ({ onNavigate, onMenuClick, className }: DocTopBarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const groupedSearch = useMemo(() => {
    const ids = new Set(allDocSections.map((s) => s.id));
    return docSectionGroups
      .map((g) => ({
        title: g.title,
        items: g.items.filter((i) => ids.has(i.id)),
      }))
      .filter((g) => g.items.length > 0);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-10">
        {onMenuClick ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
        ) : null}

        <button
          type="button"
          onClick={() => onNavigate("welcome")}
          className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-accent transition-colors"
          aria-label="Ir al inicio"
        >
          <ServelLogo className="h-7 w-7" />
          <div className="hidden sm:block leading-tight text-left">
            <div className="text-sm font-semibold">Servel</div>
            <div className="text-[11px] text-muted-foreground">Design System</div>
          </div>
        </button>

        <div className="flex-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="group flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-left text-sm text-muted-foreground hover:bg-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Buscar en la documentación"
          >
            <Search className="h-4 w-4 text-muted-foreground/70 group-hover:text-foreground/70" />
            <span className="truncate">Buscar tokens, componentes, guías…</span>
            <span className="ml-auto hidden items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground sm:flex">
              <span className="font-mono">Ctrl</span>
              <span className="font-mono">K</span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            onClick={() => onNavigate("nosotros")}
            className="hidden sm:inline-flex"
          >
            Nosotros
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("nosotros")}
            className="sm:hidden"
            aria-label="Nosotros"
          >
            <Users className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Buscar…" />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          {groupedSearch.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.label}
                  onSelect={() => {
                    setSearchOpen(false);
                    onNavigate(item.id);
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default DocTopBar;

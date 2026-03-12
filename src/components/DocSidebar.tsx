import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Palette, Type, Grid3X3, Box, Layers, 
  Zap, PenTool, Move, FileText, Users, Component,
  LayoutGrid, FolderOpen, ChevronRight, Menu, X
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  {
    title: "Getting Started",
    items: [
      { id: "welcome", label: "Welcome", icon: BookOpen },
      { id: "faqs", label: "FAQs", icon: FileText },
    ],
  },
  {
    title: "Styles",
    items: [
      { id: "tokens", label: "Design Tokens", icon: Layers },
      { id: "color", label: "Color", icon: Palette },
      { id: "typography", label: "Typography", icon: Type },
      { id: "spacing", label: "Dimensions", icon: Grid3X3 },
      { id: "radius", label: "Corner Radius", icon: Box },
      { id: "elevation", label: "Elevation", icon: Layers },
    ],
  },
  {
    title: "Expression",
    items: [
      { id: "icons", label: "Icons", icon: PenTool },
      { id: "motion", label: "Motion", icon: Move },
    ],
  },
  {
    title: "Content Design",
    items: [
      { id: "voice", label: "Voice & Tone", icon: FileText },
      { id: "writing", label: "Writing", icon: PenTool },
    ],
  },
  {
    title: "Product Inclusion",
    items: [
      { id: "a11y", label: "Accessibility", icon: Users },
    ],
  },
  {
    title: "Components",
    items: [
      { id: "components", label: "Overview", icon: Component },
    ],
  },
  {
    title: "Resources",
    items: [
      { id: "resources", label: "Resources", icon: FolderOpen },
      { id: "changelog", label: "Changelog", icon: LayoutGrid },
    ],
  },
];

const DocSidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <nav className="flex flex-col gap-1 py-4">
      {sections.map((group) => (
        <div key={group.title} className="mb-2">
          <p className="px-4 py-1.5 text-[11px] font-medium tracking-widest uppercase text-muted-foreground/60">
            {group.title}
          </p>
          {group.items.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setMobileOpen(false);
                }}
                className={`group w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors duration-150 rounded-md mx-1 ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} className={isActive ? "text-primary" : "text-muted-foreground/50 group-hover:text-foreground/60"} />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight size={14} className="ml-auto text-primary/50" />
                )}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card shadow-elevation-1"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-card z-50 lg:hidden overflow-y-auto border-r border-border"
            >
              <div className="flex items-center justify-between px-4 pt-4">
                <span className="font-display text-sm">Design System</span>
                <button onClick={() => setMobileOpen(false)} className="p-1">
                  <X size={18} />
                </button>
              </div>
              {navContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] min-w-[260px] border-r border-border bg-card h-screen sticky top-0 overflow-y-auto">
        <div className="px-5 pt-6 pb-2">
          <h1 className="font-display text-base tracking-tight">Design System</h1>
          <p className="text-[11px] text-muted-foreground mt-0.5">v2.4.0 · Mobile</p>
        </div>
        {navContent}
      </aside>
    </>
  );
};

export default DocSidebar;

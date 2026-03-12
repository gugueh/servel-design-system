import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const components = [
  {
    cat: "Acciones",
    items: [
      { name: "Button", status: "stable" },
      { name: "FAB", status: "stable" },
      { name: "Link", status: "stable" },
      { name: "Chip / Pill", status: "stable" },
    ],
  },
  {
    cat: "Formularios",
    items: [
      { name: "Text field", status: "stable" },
      { name: "Text area", status: "stable" },
      { name: "Select", status: "stable" },
      { name: "Checkbox", status: "stable" },
      { name: "Radio button", status: "stable" },
      { name: "Switch", status: "stable" },
      { name: "Slider", status: "stable" },
      { name: "Date picker", status: "beta" },
    ],
  },
  {
    cat: "Navegación",
    items: [
      { name: "Bottom navigation", status: "stable" },
      { name: "Top app bar", status: "stable" },
      { name: "Tabs", status: "stable" },
      { name: "Breadcrumb", status: "stable" },
      { name: "Side navigation", status: "stable" },
      { name: "Stepper", status: "beta" },
    ],
  },
  {
    cat: "Contenido",
    items: [
      { name: "Card", status: "stable" },
      { name: "List", status: "stable" },
      { name: "Avatar", status: "stable" },
      { name: "Badge", status: "stable" },
      { name: "Tag", status: "stable" },
      { name: "Empty state", status: "stable" },
      { name: "Skeleton loader", status: "beta" },
    ],
  },
  {
    cat: "Overlays",
    items: [
      { name: "Modal", status: "stable" },
      { name: "Bottom sheet", status: "stable" },
      { name: "Expandable sheet", status: "beta" },
      { name: "Dialog", status: "stable" },
      { name: "Tooltip", status: "stable" },
      { name: "Popover", status: "stable" },
      { name: "Drawer", status: "stable" },
    ],
  },
  {
    cat: "Feedback",
    items: [
      { name: "Snackbar", status: "stable" },
      { name: "Banner", status: "stable" },
      { name: "Progress bar", status: "stable" },
      { name: "Spinner", status: "stable" },
      { name: "Inline alert", status: "stable" },
    ],
  },
];

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full ${
      status === "stable"
        ? "bg-success-subtle text-success"
        : "bg-warning-subtle text-warning"
    }`}
  >
    {status === "stable" ? <Check size={10} /> : null}
    {status === "stable" ? "Stable" : "Beta"}
  </span>
);

const ComponentsSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Components</p>
      <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Overview</h1>
      <p className="text-muted-foreground leading-relaxed max-w-xl">
        37 componentes organizados en categorías funcionales, disponibles para iOS y Android.
      </p>
    </div>

    <div className="flex gap-3 mb-8">
      <div className="px-4 py-3 rounded-lg border border-border bg-card text-center">
        <p className="font-display text-2xl">28</p>
        <p className="text-xs text-muted-foreground">Stable</p>
      </div>
      <div className="px-4 py-3 rounded-lg border border-border bg-card text-center">
        <p className="font-display text-2xl">7</p>
        <p className="text-xs text-muted-foreground">Beta</p>
      </div>
      <div className="px-4 py-3 rounded-lg border border-border bg-card text-center">
        <p className="font-display text-2xl">5</p>
        <p className="text-xs text-muted-foreground">Planned</p>
      </div>
    </div>

    {components.map((group) => (
      <div key={group.cat} className="mb-8">
        <h2 className="font-display text-base mb-3">{group.cat}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {group.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card hover:shadow-elevation-1 transition-shadow duration-150"
            >
              <span className="text-sm font-medium">{item.name}</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="text-[10px] text-muted-foreground"> iOS</span>
                  <span className="text-[10px] text-muted-foreground">And</span>
                </div>
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </motion.div>
);

export default ComponentsSection;

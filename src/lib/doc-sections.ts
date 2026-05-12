import {
  BookOpen,
  Box,
  Component,
  FileText,
  FolderOpen,
  Grid3X3,
  Image,
  Layers,
  LayoutGrid,
  Move,
  Palette,
  PenTool,
  Type,
  Users,
} from "lucide-react";

export const docSectionGroups = [
  {
    title: "Getting Started",
    items: [
      { id: "welcome", label: "Welcome", icon: BookOpen },
      { id: "nosotros", label: "Nosotros", icon: Users },
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
      { id: "illustrations", label: "Illustrations", icon: Image },
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
    items: [{ id: "a11y", label: "Accessibility", icon: Users }],
  },
  {
    title: "Components",
    items: [{ id: "components", label: "Overview", icon: Component }],
  },
  {
    title: "Resources",
    items: [
      { id: "resources", label: "Resources", icon: FolderOpen },
      { id: "changelog", label: "Changelog", icon: LayoutGrid },
    ],
  },
] as const;

export const allDocSections = docSectionGroups.flatMap((g) => g.items.map((i) => ({ id: i.id, label: i.label })));

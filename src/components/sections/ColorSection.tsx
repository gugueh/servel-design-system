import { motion } from "framer-motion";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

type Swatch = {
  token: string;
  hex: string;
};

type ColorGroup = {
  name: string;
  description: string;
  swatches: Swatch[];
};

const colorGroups: ColorGroup[] = [
  {
    name: "Apple",
    description: "Escala vibrante para acentos energéticos, highlights y estados positivos de alto contraste.",
    swatches: [
      { token: "apple-100", hex: "#F5FFD5" },
      { token: "apple-200", hex: "#EBFFAC" },
      { token: "apple-300", hex: "#E2FF82" },
      { token: "apple-400", hex: "#D8FF59" },
      { token: "apple-500", hex: "#CEFF2F" },
      { token: "apple-600", hex: "#A5CC26" },
      { token: "apple-700", hex: "#7C991C" },
      { token: "apple-800", hex: "#526613" },
      { token: "apple-900", hex: "#293309" },
    ],
  },
  {
    name: "Sea",
    description: "Azules principales para identidad, navegación, CTAs y elementos de interacción.",
    swatches: [
      { token: "sea-100", hex: "#D3E0FB" },
      { token: "sea-200", hex: "#A8C1F7" },
      { token: "sea-300", hex: "#7CA1F3" },
      { token: "sea-400", hex: "#5182EF" },
      { token: "sea-500", hex: "#2563EB" },
      { token: "sea-600", hex: "#1E4FBC" },
      { token: "sea-700", hex: "#163B8D" },
      { token: "sea-800", hex: "#0F285E" },
      { token: "sea-900", hex: "#07142F" },
    ],
  },
  {
    name: "Sky",
    description: "Turquesas para acentos secundarios, ilustraciones, estados informativos y fondos vivos.",
    swatches: [
      { token: "sky-100", hex: "#CCF2F4" },
      { token: "sky-200", hex: "#99E5E9" },
      { token: "sky-300", hex: "#66D8DE" },
      { token: "sky-400", hex: "#33CBD3" },
      { token: "sky-500", hex: "#00BEC8" },
      { token: "sky-600", hex: "#0098A0" },
      { token: "sky-700", hex: "#007278" },
      { token: "sky-800", hex: "#004C50" },
      { token: "sky-900", hex: "#002628" },
    ],
  },
  {
    name: "Neutral",
    description: "Base neutra para texto, superficies, separación y contraste general del sistema.",
    swatches: [
      { token: "neutral-black", hex: "#040D2B" },
      { token: "neutral-white", hex: "#F8F8FA" },
    ],
  },
  {
    name: "Dark Mode",
    description: "Colores específicos para lectura, superficie y botones en modo oscuro.",
    swatches: [
      { token: "dark-text", hex: "#C3C5CC" },
      { token: "dark-title", hex: "#E8F2F3" },
      { token: "dark-background", hex: "#011819" },
      { token: "dark-button", hex: "#061D1E" },
    ],
  },
];

const semanticMappings = [
  { token: "--color-brand-primary", light: "sea-500", dark: "sea-400" },
  { token: "--color-brand-accent", light: "sky-500", dark: "sky-400" },
  { token: "--color-brand-highlight", light: "apple-500", dark: "apple-400" },
  { token: "--color-text-primary", light: "neutral-black", dark: "dark-title" },
  { token: "--color-text-secondary", light: "sea-800", dark: "dark-text" },
  { token: "--color-bg-primary", light: "neutral-white", dark: "dark-background" },
  { token: "--color-bg-button-dark", light: "sea-900", dark: "dark-button" },
];

const hexToFlutterColor = (hex: string) => `0xFF${hex.replace("#", "").toUpperCase()}`;

const toDartIdentifier = (token: string) =>
  token.replace(/[-\s]+(.)?/g, (_, char: string | undefined) => (char ? char.toUpperCase() : "")).replace(/^[A-Z]/, (char) => char.toLowerCase());

const flutterFileContents = `import 'package:flutter/material.dart';

class ServelColors {
  const ServelColors._();

${colorGroups
  .flatMap((group) => group.swatches)
  .map((swatch) => `  static const Color ${toDartIdentifier(swatch.token)} = Color(${hexToFlutterColor(swatch.hex)});`)
  .join("\n")}
}
`;

const downloadFlutterTokens = () => {
  const blob = new Blob([flutterFileContents], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "servel_colors.dart";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const ColorSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xs font-medium tracking-widest uppercase text-primary">Styles</p>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-warning-subtle text-warning rounded-full">Updated</span>
        </div>
        <h1 className="font-display-xl text-3xl md:text-4xl mb-3">Color</h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          Paleta primitiva oficial del sistema: Apple, Sea, Sky, Neutral y colores dedicados para Dark Mode.
        </p>
      </div>
      <Button
        type="button"
        onClick={downloadFlutterTokens}
        className="shrink-0 border-0 text-[#002628] hover:opacity-90"
        style={{ backgroundColor: "#00BEC8" }}
      >
        <Download className="h-4 w-4" />
        Descargar para Flutter
      </Button>
    </div>

    {colorGroups.map((group) => (
      <section key={group.name} className="mb-12">
        <div className="mb-5">
          <h2 className="font-display text-base mb-1">{group.name}</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">{group.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {group.swatches.map((swatch) => (
            <div
              key={swatch.token}
              className="group rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:border-primary/40 hover:shadow-elevation-1"
            >
              <div
                className="mb-3 aspect-square rounded-lg border border-border"
                style={{ backgroundColor: swatch.hex }}
              />
              <p className="text-xs font-mono-code font-medium text-foreground">{swatch.token}</p>
              <p className="mt-1 text-[11px] font-mono-code text-muted-foreground">{swatch.hex}</p>
              <p className="mt-1 text-[11px] font-mono-code text-muted-foreground">{hexToFlutterColor(swatch.hex)}</p>
            </div>
          ))}
        </div>
      </section>
    ))}

    <div className="mt-12">
      <h2 className="font-display text-base mb-4">Sugerencia de mapeo semántico</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Token</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Light</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Dark</th>
            </tr>
          </thead>
          <tbody>
            {semanticMappings.map((row) => (
              <tr key={row.token} className="border-b border-border/50 last:border-0">
                <td className="py-3 px-4 font-mono-code text-xs">{row.token}</td>
                <td className="py-3 px-4 text-xs text-muted-foreground">{row.light}</td>
                <td className="py-3 px-4 text-xs text-muted-foreground">{row.dark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12 p-5 rounded-lg border border-border bg-card">
      <h3 className="font-display text-sm mb-2">Exportación</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        El botón <strong className="text-foreground">Descargar para Flutter</strong> genera un archivo{" "}
        <code className="font-mono-code text-xs bg-secondary px-1.5 py-0.5 rounded">servel_colors.dart</code> con
        constantes listas para usar en proyectos Flutter.
      </p>
    </div>
  </motion.div>
);

export default ColorSection;

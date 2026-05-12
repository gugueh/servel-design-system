import { motion } from "framer-motion";
import { Download } from "lucide-react";

import "@/Switzer_Complete/Fonts/WEB/css/switzer.css";
import { Button } from "@/components/ui/button";

type TypographyToken = {
  category: "Heading" | "Text";
  level: string;
  weightLabel: "Bold" | "Semibold" | "Medium" | "Regular" | "Light";
  weight: number;
  size: number;
  lineHeight: number | null;
};

const typographyScale: TypographyToken[] = [
  { category: "Heading", level: "XXXL", weightLabel: "Bold", weight: 700, size: 32, lineHeight: 42 },
  { category: "Heading", level: "XXXL", weightLabel: "Semibold", weight: 600, size: 32, lineHeight: 42 },
  { category: "Heading", level: "XXL", weightLabel: "Bold", weight: 700, size: 28, lineHeight: 38 },
  { category: "Heading", level: "XXL", weightLabel: "Semibold", weight: 600, size: 28, lineHeight: 38 },
  { category: "Heading", level: "XL", weightLabel: "Bold", weight: 700, size: 24, lineHeight: null },
  { category: "Heading", level: "XL", weightLabel: "Semibold", weight: 600, size: 24, lineHeight: 38 },
  { category: "Heading", level: "XL", weightLabel: "Medium", weight: 500, size: 24, lineHeight: null },
  { category: "Heading", level: "L", weightLabel: "Bold", weight: 700, size: 20, lineHeight: 26 },
  { category: "Heading", level: "L", weightLabel: "Semibold", weight: 600, size: 20, lineHeight: 26 },
  { category: "Heading", level: "L", weightLabel: "Medium", weight: 500, size: 20, lineHeight: 26 },
  { category: "Heading", level: "M", weightLabel: "Bold", weight: 700, size: 18, lineHeight: 24 },
  { category: "Heading", level: "M", weightLabel: "Semibold", weight: 600, size: 18, lineHeight: 24 },
  { category: "Heading", level: "M", weightLabel: "Medium", weight: 500, size: 18, lineHeight: 24 },
  { category: "Heading", level: "S", weightLabel: "Bold", weight: 700, size: 16, lineHeight: 22 },
  { category: "Heading", level: "S", weightLabel: "Semibold", weight: 600, size: 16, lineHeight: 22 },
  { category: "Heading", level: "S", weightLabel: "Medium", weight: 500, size: 16, lineHeight: 22 },
  { category: "Text", level: "L", weightLabel: "Regular", weight: 400, size: 18, lineHeight: 28 },
  { category: "Text", level: "L", weightLabel: "Light", weight: 300, size: 18, lineHeight: 28 },
  { category: "Text", level: "M", weightLabel: "Medium", weight: 500, size: 16, lineHeight: 24 },
  { category: "Text", level: "M", weightLabel: "Regular", weight: 400, size: 16, lineHeight: 24 },
  { category: "Text", level: "M", weightLabel: "Light", weight: 300, size: 16, lineHeight: 24 },
  { category: "Text", level: "S", weightLabel: "Medium", weight: 500, size: 14, lineHeight: 20 },
  { category: "Text", level: "S", weightLabel: "Regular", weight: 400, size: 14, lineHeight: 20 },
  { category: "Text", level: "S", weightLabel: "Light", weight: 300, size: 14, lineHeight: 20 },
  { category: "Text", level: "XS", weightLabel: "Medium", weight: 500, size: 12, lineHeight: 16 },
  { category: "Text", level: "XS", weightLabel: "Regular", weight: 400, size: 12, lineHeight: 16 },
  { category: "Text", level: "XS", weightLabel: "Light", weight: 300, size: 12, lineHeight: 16 },
];

const switzerFamily = '"Switzer-Variable", "Switzer-Regular", "Inter", sans-serif';
const headingTokens = typographyScale.filter((token) => token.category === "Heading");
const textTokens = typographyScale.filter((token) => token.category === "Text");
const typographyExamples = [
  {
    title: "Hero / Onboarding",
    label: "Heading XXXL Bold",
    sample: "Activa tu cuenta en minutos",
    size: 32,
    lineHeight: 42,
    weight: 700,
  },
  {
    title: "Título de pantalla",
    label: "Heading XL Semibold",
    sample: "Resumen de movimientos",
    size: 24,
    lineHeight: 38,
    weight: 600,
  },
  {
    title: "Texto principal",
    label: "Text M Regular",
    sample: "Revisa los datos antes de confirmar para evitar errores y asegurar una experiencia clara.",
    size: 16,
    lineHeight: 24,
    weight: 400,
  },
  {
    title: "Texto auxiliar",
    label: "Text XS Medium",
    sample: "Disponible las 24 horas",
    size: 12,
    lineHeight: 16,
    weight: 500,
  },
];

const toFlutterName = (token: TypographyToken) =>
  `${token.category.toLowerCase()}${token.level}${token.weightLabel}`;

const flutterTypographyFile = `import 'package:flutter/widgets.dart';

class ServelTypography {
  const ServelTypography._();

${typographyScale
  .map((token) => {
    const lineHeight = token.lineHeight ? `, height: ${(token.lineHeight / token.size).toFixed(4)}` : "";
    return `  static const TextStyle ${toFlutterName(token)} = TextStyle(fontFamily: 'Switzer', fontFamilyFallback: ['Inter'], fontSize: ${token.size}, fontWeight: FontWeight.w${token.weight}${lineHeight});`;
  })
  .join("\n")}
}
`;

const downloadFlutterTypography = () => {
  const blob = new Blob([flutterTypographyFile], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "servel_typography.dart";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const TypographySection = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">Styles</p>
        <h1 className="text-3xl md:text-4xl mb-3 font-semibold" style={{ fontFamily: switzerFamily }}>
          Typography
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          La app utiliza una sola familia tipográfica: <strong className="text-foreground">Switzer</strong>. La
          escala documentada aquí refleja los tamaños y pesos reales usados en producto.
        </p>
      </div>
      <Button
        type="button"
        onClick={downloadFlutterTypography}
        className="shrink-0 border-0 text-[#002628] hover:opacity-90"
        style={{ backgroundColor: "#00BEC8" }}
      >
        <Download className="h-4 w-4" />
        Descargar para Flutter
      </Button>
    </div>

    <div className="mb-12">
      <h2 className="text-base mb-6 font-semibold" style={{ fontFamily: switzerFamily }}>
        Familia tipográfica
      </h2>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 text-5xl font-semibold tracking-tight" style={{ fontFamily: switzerFamily }}>
              Aa Bb Cc
            </p>
            <p className="text-lg text-foreground" style={{ fontFamily: switzerFamily }}>
              Switzer
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Única familia para headings y textos de la app. Pesos usados: Light, Regular, Medium, Semibold y Bold.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Fuente:</strong> Switzer Variable</p>
              <p><strong className="text-foreground">Origen:</strong> `src/Switzer_Complete`</p>
              <p><strong className="text-foreground">Uso:</strong> Heading + Text</p>
              <p><strong className="text-foreground">Contingencia:</strong> Inter como fallback si Switzer no carga</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-12">
      <h2 className="text-base mb-6 font-semibold" style={{ fontFamily: switzerFamily }}>
        Ejemplos de uso
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {typographyExamples.map((example) => (
          <div key={example.title} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-elevation-1">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: switzerFamily }}>
                {example.title}
              </h3>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
                {example.label}
              </span>
            </div>
            <div
              className="text-foreground"
              style={{
                fontFamily: switzerFamily,
                fontSize: `${example.size}px`,
                fontWeight: example.weight,
                lineHeight: `${example.lineHeight}px`,
              }}
            >
              {example.sample}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-12">
      <h2 className="text-base mb-6 font-semibold" style={{ fontFamily: switzerFamily }}>
        Escala tipográfica
      </h2>

      <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border bg-background px-5 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: switzerFamily }}>
                Heading
              </h3>
              <p className="text-xs text-muted-foreground">Jerarquías para títulos, headers y destacados</p>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
              {headingTokens.length} estilos
            </span>
          </div>
        </div>
        <div className="divide-y divide-border/50">
          {headingTokens.map((token) => (
            <div
              key={`${token.category}-${token.level}-${token.weightLabel}`}
              className="grid gap-4 px-5 py-4 lg:grid-cols-[90px_110px_1fr_140px] lg:items-center"
            >
              <div className="text-xs font-medium text-foreground">{token.level}</div>
              <div className="text-xs text-muted-foreground">{token.weightLabel}</div>
              <div
                className="text-foreground"
                style={{
                  fontFamily: switzerFamily,
                  fontSize: `${token.size}px`,
                  fontWeight: token.weight,
                  lineHeight: token.lineHeight ? `${token.lineHeight}px` : "normal",
                }}
              >
                Servel Design System
              </div>
              <div className="text-xs font-mono-code text-muted-foreground">
                {token.size}/{token.lineHeight ?? "Auto"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border bg-background px-5 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: switzerFamily }}>
                Text
              </h3>
              <p className="text-xs text-muted-foreground">Lectura continua, descripciones, captions y soporte</p>
            </div>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
              {textTokens.length} estilos
            </span>
          </div>
        </div>
        <div className="divide-y divide-border/50">
          {textTokens.map((token) => (
            <div
              key={`${token.category}-${token.level}-${token.weightLabel}`}
              className="grid gap-4 px-5 py-4 lg:grid-cols-[90px_110px_1fr_140px] lg:items-center"
            >
              <div className="text-xs font-medium text-foreground">{token.level}</div>
              <div className="text-xs text-muted-foreground">{token.weightLabel}</div>
              <div
                className="text-foreground"
                style={{
                  fontFamily: switzerFamily,
                  fontSize: `${token.size}px`,
                  fontWeight: token.weight,
                  lineHeight: token.lineHeight ? `${token.lineHeight}px` : "normal",
                }}
              >
                Confirma tus datos antes de continuar.
              </div>
              <div className="text-xs font-mono-code text-muted-foreground">
                {token.size}/{token.lineHeight ?? "Auto"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="p-5 rounded-lg border border-border bg-card">
      <h3 className="text-sm mb-3 font-semibold" style={{ fontFamily: switzerFamily }}>
        Modo de uso
      </h3>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        <li>• La familia oficial es <strong className="text-foreground">Switzer</strong> para toda la app.</li>
        <li>• Usar <strong className="text-foreground">Heading</strong> para títulos y <strong className="text-foreground">Text</strong> para lectura y soporte.</li>
        <li>• Tamaño mínimo legible: <strong className="text-foreground">12px</strong>.</li>
        <li>• Pesos habilitados: <strong className="text-foreground">300, 400, 500, 600 y 700</strong>.</li>
        <li>• Cuando el line-height es <strong className="text-foreground">Auto</strong>, se deja comportamiento nativo del render.</li>
        <li>• Si Switzer no está disponible, la contingencia visual es <strong className="text-foreground">Inter</strong>.</li>
      </ul>
    </div>

    <div className="mt-6 p-5 rounded-lg border border-border bg-card">
      <h3 className="text-sm mb-3 font-semibold" style={{ fontFamily: switzerFamily }}>
        Exportación
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        El botón <strong className="text-foreground">Descargar para Flutter</strong> genera un archivo{" "}
        <code className="font-mono-code text-xs bg-secondary px-1.5 py-0.5 rounded">servel_typography.dart</code> con
        estilos tipográficos listos para usar con <strong className="text-foreground">fontFamily: 'Switzer'</strong> y
        fallback a <strong className="text-foreground">'Inter'</strong>.
      </p>
    </div>

    <div className="mt-6 p-5 rounded-lg border border-border bg-card">
      <h3 className="text-sm mb-3 font-semibold" style={{ fontFamily: switzerFamily }}>
        Créditos y Licencias de Recursos
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Este sistema de diseño integra recursos de terceros bajo licencias de uso comercial permitidas:
      </p>
      <div className="mt-3">
        <a
          href="https://www.fontshare.com/licenses/itf-ffl"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary hover:underline underline-offset-4 break-all"
        >
          https://www.fontshare.com/licenses/itf-ffl
        </a>
      </div>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        Tipografía: Se utiliza la familia <strong className="text-foreground">Switzer</strong>, propiedad de{" "}
        <strong className="text-foreground">Indian Type Foundry (ITF)</strong>. Su uso se rige por la{" "}
        <strong className="text-foreground">ITF Free Font License</strong>, que permite su implementación gratuita en
        entornos digitales y comerciales.
      </p>
    </div>
  </motion.div>
);

export default TypographySection;

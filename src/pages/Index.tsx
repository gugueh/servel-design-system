import { useState } from "react";
import DocSidebar from "@/components/DocSidebar";
import SectionNav from "@/components/SectionNav";
import DocTopBar from "@/components/DocTopBar";
import ServelFooter from "@/components/ServelFooter";
import WelcomeSection from "@/components/sections/WelcomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ColorSection from "@/components/sections/ColorSection";
import TypographySection from "@/components/sections/TypographySection";
import SpacingSection from "@/components/sections/SpacingSection";
import ElevationSection from "@/components/sections/ElevationSection";
import TokensSection from "@/components/sections/TokensSection";
import MotionSection from "@/components/sections/MotionSection";
import ComponentsSection from "@/components/sections/ComponentsSection";
import ChangelogSection from "@/components/sections/ChangelogSection";
import GenericSection from "@/components/sections/GenericSection";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Copy, Download, MoreHorizontal, Star } from "lucide-react";
import licencesThirdPartyUrl from "@/LICENCES-THIRD-PARTY.txt?url";

const illustrationModules = import.meta.glob("../Ilustraciones/*.svg", { eager: true }) as Record<string, { default: string }>;
const logoModules = import.meta.glob("../Logos/*.{svg,png}", { eager: true }) as Record<string, { default: string }>;
const iconModules = import.meta.glob("../Icons/*.svg", { eager: true }) as Record<string, { default: string }>;

const PNG_EXPORT_MAX_DIMENSION = 2048;
const PNG_EXPORT_PIXEL_RATIO = 3;

const toTitleCase = (value: string) =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const illustrations = Object.entries(illustrationModules)
  .map(([path, mod]) => {
    const fileName = path.split("/").pop() ?? "illustration.svg";
    const baseName = fileName.replace(/\.svg$/i, "");
    const title = toTitleCase(baseName);

    return {
      fileName,
      baseName,
      title,
      url: mod.default,
      tag: "Ilustracion SVG",
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

type IconItem = {
  fileName: string;
  baseName: string;
  title: string;
  url: string;
  tag: string;
};

const icons = Object.entries(iconModules)
  .map(([path, mod]) => {
    const fileName = path.split("/").pop() ?? "icon.svg";
    const baseName = fileName.replace(/\.svg$/i, "");

    return {
      fileName,
      baseName,
      title: toTitleCase(baseName),
      url: mod.default,
      tag: "Icono SVG",
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

type LogoItem = {
  key: string;
  title: string;
  tag: string;
  displayUrl: string;
  svgUrl?: string;
  pngUrl?: string;
  downloadBaseName: string;
};

const normalizeLogoBaseName = (fileName: string) =>
  fileName
    .replace(/\.(svg|png)$/i, "")
    .replace(/\s+\d+$/i, "")
    .trim();

const logos = (() => {
  const grouped = new Map<string, Omit<LogoItem, "displayUrl" | "tag"> & { svgUrl?: string; pngUrl?: string }>();

  Object.entries(logoModules).forEach(([path, mod]) => {
    const fileName = path.split("/").pop() ?? "logo";
    const baseKey = normalizeLogoBaseName(fileName);
    const title = toTitleCase(baseKey);
    const entry = grouped.get(baseKey) ?? {
      key: baseKey,
      title,
      downloadBaseName: baseKey,
    };

    if (/\.svg$/i.test(fileName)) {
      entry.svgUrl = mod.default;
    }

    if (/\.png$/i.test(fileName)) {
      entry.pngUrl = mod.default;
    }

    grouped.set(baseKey, entry);
  });

  return Array.from(grouped.values())
    .map((entry) => ({
      ...entry,
      tag: "Logo",
      displayUrl: entry.svgUrl ?? entry.pngUrl ?? "",
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
})();

const fetchSvgText = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("No se pudo leer el archivo SVG.");
  }
  return response.text();
};

const parseSvgDimensions = (svgText: string) => {
  const svgTagMatch = svgText.match(/<svg\b[^>]*>/i);
  if (!svgTagMatch) {
    return null;
  }

  const svgTag = svgTagMatch[0];
  const widthMatch = svgTag.match(/\bwidth\s*=\s*["']([^"']+)["']/i);
  const heightMatch = svgTag.match(/\bheight\s*=\s*["']([^"']+)["']/i);

  const parseLength = (raw: string) => {
    const cleaned = raw.trim();
    if (!cleaned || cleaned.endsWith("%")) {
      return null;
    }
    const numberMatch = cleaned.match(/-?\d+(\.\d+)?/);
    if (!numberMatch) {
      return null;
    }
    const value = Number.parseFloat(numberMatch[0]);
    return Number.isFinite(value) && value > 0 ? value : null;
  };

  const width = widthMatch ? parseLength(widthMatch[1]) : null;
  const height = heightMatch ? parseLength(heightMatch[1]) : null;
  if (width && height) {
    return { width, height };
  }

  const viewBoxMatch = svgTag.match(/\bviewBox\s*=\s*["']([^"']+)["']/i);
  if (!viewBoxMatch) {
    return null;
  }

  const parts = viewBoxMatch[1].trim().split(/[,\s]+/).map((value) => Number.parseFloat(value));
  if (parts.length !== 4) {
    return null;
  }

  const viewBoxWidth = parts[2];
  const viewBoxHeight = parts[3];
  if (!Number.isFinite(viewBoxWidth) || !Number.isFinite(viewBoxHeight) || viewBoxWidth <= 0 || viewBoxHeight <= 0) {
    return null;
  }

  return { width: viewBoxWidth, height: viewBoxHeight };
};

const triggerDownload = (href: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const downloadPngFromSvg = async (svgUrl: string, fileName: string) => {
  const svgText = await fetchSvgText(svgUrl);
  const svgDimensions = parseSvgDimensions(svgText);
  const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const blobUrl = URL.createObjectURL(svgBlob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("No se pudo convertir el SVG."));
      img.src = blobUrl;
    });

    const sourceWidth = svgDimensions?.width ?? image.naturalWidth ?? image.width ?? 512;
    const sourceHeight = svgDimensions?.height ?? image.naturalHeight ?? image.height ?? 512;
    const safeSourceWidth = Number.isFinite(sourceWidth) && sourceWidth > 0 ? sourceWidth : 512;
    const safeSourceHeight = Number.isFinite(sourceHeight) && sourceHeight > 0 ? sourceHeight : 512;

    const maxSourceDimension = Math.max(safeSourceWidth, safeSourceHeight);
    const scale = maxSourceDimension > 0 ? PNG_EXPORT_MAX_DIMENSION / maxSourceDimension : 1;
    const outputWidth = Math.max(1, Math.round(safeSourceWidth * scale));
    const outputHeight = Math.max(1, Math.round(safeSourceHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = outputWidth * PNG_EXPORT_PIXEL_RATIO;
    canvas.height = outputHeight * PNG_EXPORT_PIXEL_RATIO;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("No se pudo preparar la descarga PNG.");
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.setTransform(PNG_EXPORT_PIXEL_RATIO, 0, 0, PNG_EXPORT_PIXEL_RATIO, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, outputWidth, outputHeight);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("No se pudo generar el archivo PNG."));
        }
      }, "image/png");
    });

    const pngUrl = URL.createObjectURL(pngBlob);
    triggerDownload(pngUrl, `${fileName}.png`);
    URL.revokeObjectURL(pngUrl);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
};

const downloadSvgFromPng = async (pngUrl: string, fileName: string) => {
  const response = await fetch(pngUrl);
  if (!response.ok) {
    throw new Error("No se pudo leer el archivo PNG.");
  }

  const pngBlob = await response.blob();
  const blobUrl = URL.createObjectURL(pngBlob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("No se pudo convertir el logo."));
      img.src = blobUrl;
    });

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("No se pudo preparar la descarga SVG."));
      reader.readAsDataURL(pngBlob);
    });

    const width = image.naturalWidth || image.width || 512;
    const height = image.naturalHeight || image.height || 512;
    const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image href="${dataUrl}" width="${width}" height="${height}"/></svg>`;
    const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    triggerDownload(svgUrl, `${fileName}.svg`);
    URL.revokeObjectURL(svgUrl);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
};

const handleCopySvg = async (svgUrl: string, title: string) => {
  const svgText = await fetchSvgText(svgUrl);
  await navigator.clipboard.writeText(svgText);
  toast({
    title: "SVG copiado",
    description: `${title} se copio al portapapeles.`,
  });
};

const handleDownloadSvg = (svgUrl: string, fileName: string, title: string) => {
  triggerDownload(svgUrl, `${fileName}.svg`);
  toast({
    title: "Descarga iniciada",
    description: `Se esta descargando ${title} en formato SVG.`,
  });
};

const handleDownloadPng = async (svgUrl: string, fileName: string, title: string) => {
  await downloadPngFromSvg(svgUrl, fileName);
  toast({
    title: "Descarga iniciada",
    description: `Se esta descargando ${title} en formato PNG.`,
  });
};

const handleDownloadLogoSvg = async (logo: LogoItem) => {
  try {
    if (logo.svgUrl) {
      triggerDownload(logo.svgUrl, `${logo.downloadBaseName}.svg`);
    } else if (logo.pngUrl) {
      await downloadSvgFromPng(logo.pngUrl, logo.downloadBaseName);
    } else {
      throw new Error("No hay archivo disponible para descargar.");
    }

    toast({
      title: "Descarga iniciada",
      description: `Se esta descargando ${logo.title} en formato SVG.`,
    });
  } catch (error) {
    toast({
      title: "No se pudo descargar",
      description: error instanceof Error ? error.message : "Error desconocido.",
      variant: "destructive",
    });
  }
};

const handleDownloadLogoPng = async (logo: LogoItem) => {
  try {
    if (logo.svgUrl) {
      await downloadPngFromSvg(logo.svgUrl, logo.downloadBaseName);
    } else if (logo.pngUrl) {
      triggerDownload(logo.pngUrl, `${logo.downloadBaseName}.png`);
    } else {
      throw new Error("No hay archivo disponible para descargar.");
    }

    toast({
      title: "Descarga iniciada",
      description: `Se esta descargando ${logo.title} en formato PNG.`,
    });
  } catch (error) {
    toast({
      title: "No se pudo descargar",
      description: error instanceof Error ? error.message : "Error desconocido.",
      variant: "destructive",
    });
  }
};

const IllustrationCard = ({
  title,
  tag,
  url,
  fileName,
}: {
  title: string;
  tag: string;
  url: string;
  fileName: string;
}) => (
  <div className="group rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-elevation-2">
    <div className="relative flex min-h-[220px] items-center justify-center rounded-t-xl bg-muted/40 p-6">
      <img src={url} alt={title} className="max-h-40 w-full object-contain" loading="lazy" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-3 top-3 h-9 w-9 rounded-full opacity-90 shadow-sm"
            aria-label={`Acciones para ${title}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => void handleCopySvg(url, title)}>
            <Copy className="h-4 w-4" />
            Copy SVG
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleDownloadSvg(url, fileName.replace(/\.svg$/i, ""), title)}>
            <Download className="h-4 w-4" />
            Download SVG
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => void handleDownloadPng(url, fileName.replace(/\.svg$/i, ""), title)}>
            <Download className="h-4 w-4" />
            Download PNG
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div className="flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{tag}</p>
      </div>
    </div>
  </div>
);

const LogoCard = ({ logo }: { logo: LogoItem }) => (
  <div className="group rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-elevation-2">
    <div className="relative flex min-h-[220px] items-center justify-center rounded-t-xl bg-muted/40 p-6">
      <img src={logo.displayUrl} alt={logo.title} className="max-h-28 w-full object-contain" loading="lazy" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-3 top-3 h-9 w-9 rounded-full opacity-90 shadow-sm"
            aria-label={`Acciones para ${logo.title}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => void handleDownloadLogoSvg(logo)}>
            <Download className="h-4 w-4" />
            Download SVG
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => void handleDownloadLogoPng(logo)}>
            <Download className="h-4 w-4" />
            Download PNG
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div className="flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-foreground">{logo.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{logo.tag}</p>
      </div>
    </div>
  </div>
);

const IconCard = ({ icon }: { icon: IconItem }) => (
  <div className="group rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-elevation-2">
    <div className="relative flex min-h-[220px] items-center justify-center rounded-t-xl bg-muted/40 p-6">
      <img src={icon.url} alt={icon.title} className="h-16 w-16 object-contain" loading="lazy" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-3 top-3 h-9 w-9 rounded-full opacity-90 shadow-sm"
            aria-label={`Acciones para ${icon.title}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => handleDownloadSvg(icon.url, icon.baseName, icon.title)}>
            <Download className="h-4 w-4" />
            Download SVG
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div className="flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-foreground">{icon.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{icon.tag}</p>
      </div>
    </div>
  </div>
);

const IllustrationsSection = () => (
  <GenericSection title="Illustrations" category="Expression">
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Biblioteca de ilustraciones SVG disponibles para producto, empty states, confirmaciones y momentos de marca.
          Cada tarjeta permite copiar el SVG original o descargarlo en formato SVG y PNG.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {illustrations.map((illustration) => (
          <IllustrationCard
            key={illustration.fileName}
            title={illustration.title}
            tag={illustration.tag}
            url={illustration.url}
            fileName={illustration.fileName}
          />
        ))}
      </div>
    </div>
  </GenericSection>
);

const LogosSection = () => (
  <GenericSection title="Logos" category="Expression">
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Biblioteca de logos disponibles para producto y comunicaciones. Cada tarjeta permite descargar el asset en formato SVG y PNG.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {logos.map((logo) => (
          <LogoCard key={logo.key} logo={logo} />
        ))}
      </div>
    </div>
  </GenericSection>
);

const sectionContent: Record<string, React.ReactNode> = {
  welcome: <WelcomeSection />,
  nosotros: <AboutSection />,
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
      <p className="text-muted-foreground leading-relaxed max-w-xl mb-10">
        La escala de radio define el nivel de “suavidad” de los componentes. Mantenerla consistente ayuda a que el
        producto se sienta cohesivo y que los estados (hover, focus, selected) no “cambien de forma” sin intención.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
        {[
          { name: "xs", token: "--radius-xs", px: 4, val: "4px", use: "Elementos compactos" },
          { name: "sm", token: "--radius-sm", px: 6, val: "6px", use: "Inputs y botones" },
          { name: "md", token: "--radius-md", px: 8, val: "8px", use: "Cards y contenedores" },
          { name: "lg", token: "--radius-lg", px: 12, val: "12px", use: "Superficies principales" },
          { name: "xl", token: "--radius-xl", px: 16, val: "16px", use: "Sheets y módulos grandes" },
          { name: "2xl", token: "--radius-2xl", px: 20, val: "20px", use: "Banners / contenedores amplios" },
          { name: "3xl", token: "--radius-3xl", px: 24, val: "24px", use: "Secciones destacadas" },
          { name: "soft", token: "--radius-soft", px: 32, val: "32px", use: "Estética suave" },
          { name: "semi-pill", token: "--radius-semi-pill", px: 64, val: "64px", use: "Chips grandes" },
          { name: "pill", token: "--radius-pill", px: 999, val: "999px", use: "Pills y avatares" },
        ].map((r) => (
          <div key={r.token} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-baseline justify-between gap-2 mb-3">
              <div>
                <div className="font-mono-code text-xs font-medium text-foreground">{r.name}</div>
                <div className="font-mono-code text-[11px] text-muted-foreground">{r.token}</div>
              </div>
              <div className="font-mono-code text-xs text-muted-foreground">{r.val}</div>
            </div>

            <div className="space-y-3">
              <div className="border border-border bg-background p-3" style={{ borderRadius: r.px }}>
                <div className="flex items-center justify-between">
                  <div className="h-2 w-16 rounded bg-muted" />
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-3 h-2 w-24 rounded bg-muted" />
                <div className="mt-2 h-2 w-14 rounded bg-muted" />
                <div className="mt-3">
                  <div
                    className="inline-flex h-7 items-center justify-center bg-primary/10 text-primary px-2.5 text-[10px] font-medium"
                    style={{ borderRadius: r.px }}
                  >
                    Acción
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-muted-foreground leading-relaxed">{r.use}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg mb-2">Width</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-xl">
        Anchos para bordes y trazos. Útiles para jerarquía visual, foco y estados.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "xs", token: "--width-xs", px: 1, val: "1px", use: "Bordes sutiles / divisores" },
          { name: "s", token: "--width-s", px: 1.5, val: "1.5px", use: "Bordes en foco / énfasis" },
          { name: "m", token: "--width-m", px: 2, val: "2px", use: "Bordes fuertes / contornos" },
          { name: "l", token: "--width-l", px: 4, val: "4px", use: "Indicadores / highlights" },
        ].map((w) => (
          <div key={w.token} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-baseline justify-between gap-2 mb-3">
              <div>
                <div className="font-mono-code text-xs font-medium text-foreground">{w.name}</div>
                <div className="font-mono-code text-[11px] text-muted-foreground">{w.token}</div>
              </div>
              <div className="font-mono-code text-xs text-muted-foreground">{w.val}</div>
            </div>
            <div className="rounded-md border border-border bg-background p-4">
              <div
                className="w-full"
                style={{
                  borderTopWidth: w.px,
                  borderTopStyle: "solid",
                  borderTopColor: "hsl(var(--foreground))",
                  opacity: 0.6,
                }}
              />
              <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Divider</span>
                <span>{w.use}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GenericSection>
  ),
  icons: (
    <GenericSection title="Icons" category="Expression">
      <div className="space-y-8">
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Biblioteca de iconos (SVG) para navegación, acciones y estados. Cada tarjeta permite descargar el asset en formato SVG.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {icons.map((icon) => (
            <IconCard key={icon.fileName} icon={icon} />
          ))}
        </div>

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
        <div className="p-5 rounded-lg border border-border bg-card">
          <h3 className="font-display text-sm mb-2">Créditos y Licencias</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Los iconos utilizados en este sistema de diseño forman parte de la librería <strong className="text-foreground">IconPark</strong>,
              desarrollada por <strong className="text-foreground">ByteDance</strong>.
            </p>
            <p>
              Estos recursos se distribuyen bajo la <strong className="text-foreground">Apache License, Versión 2.0</strong>. Podés utilizar, modificar
              y distribuir estos iconos en proyectos comerciales y personales siempre que se respeten los términos de la licencia original.
            </p>
            <p>Copyright © 2023–2026 ByteDance Inc.</p>
            <p>
              Consulta el texto completo de la licencia:{" "}
              <a
                href="https://www.apache.org/licenses/LICENSE-2.0"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline underline-offset-4 break-all"
              >
                https://www.apache.org/licenses/LICENSE-2.0
              </a>
            </p>
            <p>
              Repositorio oficial:{" "}
              <a
                href="https://github.com/bytedance/IconPark"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline underline-offset-4 break-all"
              >
                https://github.com/bytedance/IconPark
              </a>
            </p>
          </div>
        </div>
      </div>
    </GenericSection>
  ),
  illustrations: <IllustrationsSection />,
  logos: <LogosSection />,
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
          {
            name: "📄 Licencias de terceros",
            desc: "Archivo descargable con licencias usadas en el sistema",
            href: licencesThirdPartyUrl,
            download: "LICENCES-THIRD-PARTY.txt",
          },
        ].map((r) =>
          "href" in r ? (
            <a
              key={r.name}
              href={r.href}
              download={r.download}
              className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-elevation-1 transition-shadow cursor-pointer"
            >
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </a>
          ) : (
            <div
              key={r.name}
              className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-elevation-1 transition-shadow cursor-pointer"
            >
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </GenericSection>
  ),
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DocSidebar
        activeSection={activeSection}
        onSectionChange={handleNavigate}
        mobileOpen={mobileSidebarOpen}
        onMobileOpenChange={setMobileSidebarOpen}
      />
      <main className="flex min-w-0 flex-1 flex-col">
        <DocTopBar onNavigate={handleNavigate} onMenuClick={() => setMobileSidebarOpen(true)} />
        <div className="flex-1">
          <div className="mx-auto max-w-3xl px-6 py-12 lg:px-10 lg:py-16">
            {sectionContent[activeSection] || <WelcomeSection />}
            <SectionNav currentSection={activeSection} onNavigate={handleNavigate} />
          </div>
        </div>
        <ServelFooter onNavigate={handleNavigate} />
      </main>
    </div>
  );
};

export default Index;

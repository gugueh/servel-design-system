import { useEffect, useRef, useState } from "react";
import { Copy, Download, ExternalLink, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import MotionFoundations from "./MotionFoundations";
import { flutterExample, kotlinExample, motionUrl, type MotionAsset } from "@/lib/motion-integration";

const splashVersions = [
  { entry: "v1", exit: "c", label: "Aparición por piezas y encuentro del punto" },
  { entry: "v1", exit: "a", label: "Aparición por piezas y salida suave" },
  { entry: "v1", exit: "b", label: "Aparición por piezas y recorrido de la S" },
  { entry: "v3", exit: "c", label: "Trazo continuo y encuentro del punto" },
  { entry: "v3", exit: "a", label: "Trazo continuo y salida suave" },
  { entry: "v3", exit: "b", label: "Trazo continuo y recorrido de la S" },
] as const;
const formatSeconds = (value: number) => `${value.toLocaleString("es", { maximumFractionDigits: 1 })} s`;

function MotionPlayer({ asset, onUse }: { asset: MotionAsset; onUse: (asset: MotionAsset) => void }) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const hovered = useRef(false);
  const hoverPlayback = useRef(false);
  const send = (command: string, value?: number | boolean) =>
    iframe.current?.contentWindow?.postMessage({ source: "servel-motion-control", command, value }, window.location.origin);

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== iframe.current?.contentWindow || event.data?.source !== "servel-motion") return;
      if (event.data.manual) hoverPlayback.current = false;
      setPlaying(Boolean(event.data.playing));
      setTime(Number(event.data.time) || 0);
      setReady(true);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);

  return (
    <article
      className="overflow-hidden rounded-xl border border-border bg-card"
      aria-label={asset.title}
      onPointerEnter={event => {
        if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        hovered.current = true;
        if (ready && !failed && !playing) {
          hoverPlayback.current = true;
          send("restart");
        }
      }}
      onPointerLeave={() => {
        hovered.current = false;
        if (hoverPlayback.current) {
          hoverPlayback.current = false;
          send("pause");
          send("seek", asset.kind === "splash" ? 1.8 : 0);
        }
      }}
    >
      <div className={`flex items-center justify-center bg-muted/35 px-4 py-6 ${asset.kind === "splash" ? "min-h-72" : asset.kind === "interaction" ? "h-[580px]" : "h-[360px]"}`}>
        <div
          className={`relative w-full overflow-hidden ${asset.kind === "splash" ? "max-w-[200px] rounded-[24px] border border-border bg-white shadow-elevation-1" : "h-full max-w-[340px] rounded-lg"}`}
          style={asset.kind === "splash" ? { aspectRatio: `${asset.width} / ${asset.height}` } : undefined}
        >
          {asset.kind === "splash" && <img src={motionUrl("home-preview.png")} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: time >= 2.25 ? 1 : 0 }} />}
          {failed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background p-4 text-center text-xs">
              No se pudo cargar la animación.
              <Button variant="outline" size="sm" onClick={() => { setFailed(false); if (iframe.current) iframe.current.src = motionUrl(`${asset.id}.html?autoplay=0`); }}>Reintentar</Button>
            </div>
          ) : (
            <iframe
              ref={iframe}
              src={motionUrl(`${asset.id}.html?autoplay=0`)}
              title={`Animación: ${asset.title}`}
              className={`${asset.kind === "interaction" ? "pointer-events-auto" : "pointer-events-none"} absolute inset-0 h-full w-full border-0`}
              tabIndex={asset.kind === "interaction" ? 0 : -1}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
              onLoad={() => {
                setReady(true);
                send("loop", asset.kind !== "interaction");
                if (hovered.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                  hoverPlayback.current = true;
                  send("restart");
                }
              }}
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <h3 className="text-sm font-semibold">{asset.kind === "interaction" ? <a className="inline-flex items-center gap-2 hover:underline" href={motionUrl(`${asset.id}.html`)} target="_blank" rel="noreferrer" aria-label={`Abrir ${asset.title}`} title="Abrir la demostración"><span>{asset.title}</span><ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a> : asset.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {asset.kind === "splash" ? "Entrada + reposo + salida · 5 s" : asset.kind === "interaction" ? "Giro de 460 ms · tocá la tarjeta o elegí Reseñas" : `${formatSeconds(asset.movement)} de movimiento + 8 s de pausa`}
          </p>
        </div>
        <div className="flex items-center gap-1 border-t border-border pt-3">
          <Button size="icon" variant="secondary" className="h-8 w-8 shrink-0" disabled={!ready || failed} onClick={() => { hoverPlayback.current = false; send(playing ? "pause" : "play"); }} aria-label={`${playing ? "Pausar" : "Reproducir"} ${asset.title}`} title={playing ? "Pausar" : "Reproducir"}>
            {playing ? <Pause /> : <Play />}
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-1.5 text-xs" onClick={() => onUse(asset)}>Usar en app</Button>
          <Button size="sm" variant="ghost" className="h-8 px-1.5 text-xs" asChild><a href={motionUrl(`${asset.id}.${asset.kind === "interaction" ? "html" : "svg"}`)} download aria-label={`Descargar ${asset.kind === "interaction" ? "HTML" : "SVG"} de ${asset.title}`}><Download /> {asset.kind === "interaction" ? "HTML" : "SVG"}</a></Button>
        </div>
      </div>
    </article>
  );
}

function Integration({ assets, selected, onSelect }: { assets: MotionAsset[]; selected: string; onSelect: (id: string) => void }) {
  const asset = assets.find(a => a.id === selected) ?? assets[0];
  const [platform, setPlatform] = useState("kotlin");
  const [copied, setCopied] = useState(false);
  const code = platform === "kotlin" ? kotlinExample(asset) : flutterExample(asset);
  useEffect(() => { setCopied(false); }, [selected, platform]);
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({ title: "Código copiado", description: "Descargá también el HTML de esta animación." });
    } catch {
      toast({ title: "No se pudo copiar", description: "Podés seleccionar el código o descargar el paquete completo.", variant: "destructive" });
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg">Llevar una animación a tu app</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Cada archivo reúne el diseño y la animación para reproducirlos con un WebView local, sin conexión.</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" id="motion-asset-label">Animación</label>
        <Select value={asset.id} onValueChange={onSelect}><SelectTrigger aria-labelledby="motion-asset-label"><SelectValue /></SelectTrigger><SelectContent>{assets.map(a => <SelectItem key={a.id} value={a.id}>{a.kind === "splash" ? `${a.title} · ${a.entry?.toUpperCase()} + ${a.exit?.toUpperCase()}` : a.title}</SelectItem>)}</SelectContent></Select>
      </div>
      <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
        <li>Descargá el HTML de la animación. Incluye el dibujo y el reproductor.</li>
        <li>Copialo a <code className="break-all text-xs">{platform === "kotlin" ? "app/src/main/assets/motion/" : "assets/motion/"}</code>.</li>
        <li>Agregá las dependencias indicadas en el ejemplo y copiá el reproductor.</li>
      </ol>
      <div className="flex flex-wrap gap-3">
        <Button asChild><a href={motionUrl(`${asset.id}.html`)} download><Download /> Descargar HTML</a></Button>
        <Button variant="outline" asChild><a href={motionUrl("servel-motion.zip")} download><Download /> Paquete completo</a></Button>
      </div>
      <Tabs value={platform} onValueChange={setPlatform}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList aria-label="Plataforma de integración"><TabsTrigger value="kotlin">Kotlin · Compose</TabsTrigger><TabsTrigger value="flutter">Flutter</TabsTrigger></TabsList>
          <Button variant="outline" size="sm" onClick={copyCode}><Copy /> <span aria-live="polite">{copied ? "Copiado" : "Copiar código"}</span></Button>
        </div>
        <pre className="mt-4 max-h-[520px] overflow-auto rounded-xl border border-border bg-muted/40 p-4 text-xs leading-relaxed" tabIndex={0} aria-label={`Ejemplo de integración en ${platform}`}><code>{code}</code></pre>
      </Tabs>
      <div className="space-y-3 rounded-xl border border-border p-5 text-sm leading-relaxed text-muted-foreground">
        <p><strong className="text-foreground">Entrada y salida juntas.</strong> El splash se reproduce una vez. Al terminar la salida envía <code>completed</code>; usá ese evento para mostrar la Home, el registro o el destino que corresponda. La Home de las muestras es solo una referencia; los 5 s incluyen ese reposo final.</p>
        <p><strong className="text-foreground">Tarjeta del especialista.</strong> La demostración inicial gira una vez y vuelve al frente. Después, tocar la tarjeta, Servicios o Reseñas cambia de cara. Usá este HTML como referencia de interacción; en una app real, conectá sus datos y acciones al perfil.</p>
        <p><strong className="text-foreground">Ilustraciones.</strong> Repiten el movimiento después de una pausa de ocho segundos. Podés pausarlas con <code>window.ServelMotion.pause()</code>.</p>
        <p><strong className="text-foreground">Movimiento reducido.</strong> El reproductor muestra una pose estática y permite continuar. Los ejemplos móviles trasladan esa preferencia al reproductor.</p>
        <p>En Android 12 o posterior, esta secuencia de marca va dentro de la aplicación, después del splash del sistema. No reemplaza la API SplashScreen.</p>
        <p>Integración mediante WebView, no Lottie ni AnimatedVectorDrawable. Los ejemplos deben verificarse en tu proyecto y dispositivos de destino.</p>
        <div className="flex flex-wrap gap-4 text-xs"><a className="underline underline-offset-4" href="https://developer.android.com/develop/ui/views/layout/webapps/load-local-content" target="_blank" rel="noreferrer">Documentación Android</a><a className="underline underline-offset-4" href="https://pub.dev/packages/webview_flutter" target="_blank" rel="noreferrer">Documentación Flutter</a><a className="underline underline-offset-4" href={motionUrl("README.md")} download>Guía de descarga</a></div>
      </div>
    </div>
  );
}

export default function MotionSection() {
  const [assets, setAssets] = useState<MotionAsset[]>([]);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [tab, setTab] = useState("library");
  const [selected, setSelected] = useState("splash-v1-c-perla");
  const integrationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    setError(false);
    fetch(motionUrl("manifest.json"), { signal: controller.signal }).then(r => { if (!r.ok) throw new Error("manifest"); return r.json(); }).then(data => {
      if (!Array.isArray(data) || data.length === 0) throw new Error("empty");
      setAssets(data);
    }).catch(e => { if (e.name !== "AbortError") setError(true); });
    return () => controller.abort();
  }, [retry]);
  const useAsset = (asset: MotionAsset) => {
    setSelected(asset.id); setTab("integration");
    requestAnimationFrame(() => integrationRef.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  };
  return (
    <div>
      <div className="mb-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">Expression</p>
        <h1 className="font-display-xl mb-3 text-3xl md:text-4xl">Motion</h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">Las animaciones de Servel, reunidas en un solo lugar. Reproducí cada versión o llevala a tu app.</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-8" aria-label="Contenido de Motion"><TabsTrigger value="library">Biblioteca</TabsTrigger><TabsTrigger value="integration">Kotlin / Flutter</TabsTrigger><TabsTrigger value="foundations">Fundamentos</TabsTrigger></TabsList>
        <TabsContent value="library" className="space-y-12">
          {error ? <div role="alert" className="space-y-3 rounded-xl border border-border p-6"><p>No se pudo cargar la biblioteca.</p><Button variant="outline" onClick={() => setRetry(v => v + 1)}>Reintentar</Button></div> : assets.length === 0 ? <p role="status" className="text-sm text-muted-foreground">Cargando animaciones…</p> : <>
            <section className="space-y-5" aria-labelledby="profile-motion-heading">
              <div><h2 id="profile-motion-heading" className="font-display text-lg">Interacciones de perfiles</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Reproducí la demostración de primera visita o tocá la tarjeta para alternar entre servicios y reseñas. El título abre la vista completa.</p></div>
              <div className="grid gap-4 sm:grid-cols-2">{assets.filter(a => a.kind === "interaction").map(a => <MotionPlayer key={a.id} asset={a} onUse={useAsset} />)}</div>
            </section>
            <section className="space-y-8" aria-labelledby="splash-heading">
              <div><h2 id="splash-heading" className="font-display text-lg">Splashes</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Cada versión incluye la entrada y la salida en una sola animación.</p></div>
              {splashVersions.map((version, index) => (
                <div key={`${version.entry}-${version.exit}`} className="space-y-4">
                  <h3 className="text-sm font-medium"><span className="mr-2 text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>{version.label}</h3>
                  <div className="grid gap-4 min-[540px]:grid-cols-2 lg:grid-cols-3">{assets.filter(a => a.kind === "splash" && a.entry === version.entry && a.exit === version.exit).map(a => <MotionPlayer key={a.id} asset={a} onUse={useAsset} />)}</div>
                </div>
              ))}
            </section>
            <section className="space-y-5" aria-labelledby="illustration-heading"><div><h2 id="illustration-heading" className="font-display text-lg">Ilustraciones</h2><p className="mt-2 text-sm text-muted-foreground">Movimiento breve, regreso a la pose y ocho segundos de pausa antes de repetir.</p></div><div className="grid gap-4 sm:grid-cols-2">{assets.filter(a => a.kind === "illustration").map(a => <MotionPlayer key={a.id} asset={a} onUse={useAsset} />)}</div></section>
          </>}
        </TabsContent>
        <TabsContent value="integration"><div ref={integrationRef} className="scroll-mt-24">{assets.length > 0 ? <Integration assets={assets} selected={selected} onSelect={setSelected} /> : <p className="text-sm text-muted-foreground">Abrí la biblioteca para cargar las animaciones.</p>}</div></TabsContent>
        <TabsContent value="foundations"><MotionFoundations /></TabsContent>
      </Tabs>
    </div>
  );
}

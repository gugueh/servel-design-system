import { useEffect, useRef, useState } from "react";
import { Download, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motionUrl } from "@/lib/motion-integration";

export default function SpecialistCardMotion() {
  const frame = useRef<HTMLIFrameElement>(null);
  const hovered = useRef(false);
  const hoverPlayback = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [side, setSide] = useState("front");
  const send = (command: string) => frame.current?.contentWindow?.postMessage({ source: "servel-profile-card-control", command }, window.location.origin);

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || event.data?.source !== "servel-profile-card") return;
      setSide(event.data.side === "back" ? "back" : "front");
      if (event.data.ready) {
        setReady(true);
        if (hovered.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          hoverPlayback.current = true;
          setPlaying(true);
          send("demo");
        }
      }
      if (event.data.completed) setPlaying(false);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);

  return (
    <section className="space-y-5" aria-labelledby="interaction-heading">
      <div>
        <h2 id="interaction-heading" className="font-display text-lg">Interacciones</h2>
        <p className="mt-2 text-sm text-muted-foreground">Movimientos que ayudan a explorar la información.</p>
      </div>
      <article className="overflow-hidden rounded-xl border border-border bg-card md:grid md:grid-cols-[minmax(250px,340px)_1fr]"
        onPointerEnter={event => {
          if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          hovered.current = true;
          if (ready && !playing) { hoverPlayback.current = true; setPlaying(true); send("demo"); }
        }}
        onPointerLeave={() => {
          hovered.current = false;
          if (hoverPlayback.current) { hoverPlayback.current = false; setPlaying(false); send("pause"); }
        }}>
        <div className="flex items-center justify-center bg-muted/35 p-5">
          <div className="relative w-full max-w-[270px] overflow-hidden rounded-[25px] border border-border bg-[#f8ffff] shadow-elevation-1" style={{ aspectRatio: "393 / 910" }}>
            {failed ? <div role="alert" className="p-5 text-sm">No se pudo cargar la muestra. <a className="underline" href={motionUrl("specialist-card.html")}>Abrir interacción</a></div> :
              <iframe ref={frame} title="Perfil del especialista: tarjeta reversible y reseñas" src={motionUrl("specialist-card.html?autoplay=0")} className="absolute inset-0 h-full w-full border-0" sandbox="allow-scripts allow-same-origin" onError={() => setFailed(true)} />}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 p-6 md:p-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Tarjeta del especialista</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Tocá la tarjeta para girarla y explorar el perfil. La puntuación abre las reseñas con el mismo movimiento.</p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">En la primera visita, una demostración breve muestra el reverso y vuelve al frente. Pasá el cursor o presioná reproducir para verla.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={side === "front" ? "secondary" : "ghost"} disabled={!ready || failed} onClick={() => { hoverPlayback.current = false; setPlaying(false); send("showServices"); }}>Ver servicios</Button>
            <Button size="sm" variant={side === "back" ? "secondary" : "ghost"} disabled={!ready || failed} onClick={() => { hoverPlayback.current = false; setPlaying(false); send("showReviews"); }}>Ver reseñas</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <Button size="icon" variant="secondary" disabled={!ready || failed} aria-label={playing ? "Pausar demostración de la tarjeta" : "Reproducir demostración de la tarjeta"} onClick={() => { hoverPlayback.current = false; send(playing ? "pause" : "demo"); setPlaying(!playing); }}>{playing ? <Pause /> : <Play />}</Button>
            <Dialog>
              <DialogTrigger asChild><Button variant="ghost" size="sm">Usar en app</Button></DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>Tarjeta reversible</DialogTitle><DialogDescription>Una muestra autónoma de la interacción, con los recursos originales del perfil.</DialogDescription></DialogHeader>
                <p className="text-sm leading-relaxed">Descargá el HTML para abrirlo sin conexión o reproducirlo en un WebView local. Incluye el frente, el reverso, las reseñas y el giro.</p>
                <p className="text-sm leading-relaxed text-muted-foreground">Es una muestra visual con contenido de ejemplo. Para el perfil real, conectá los datos y las acciones de tu aplicación. El HTML no es un componente nativo de Kotlin o Flutter.</p>
                <p className="text-sm leading-relaxed text-muted-foreground">Controles disponibles: <code>window.ServelProfileCard.flip()</code>, <code>showReviews()</code>, <code>showServices()</code> y <code>demo()</code>. Respeta la preferencia de movimiento reducido.</p>
                <Button asChild><a href={motionUrl("specialist-card.html")} download><Download /> Descargar HTML</a></Button>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" asChild><a href={motionUrl("specialist-card.html")} download><Download /> HTML</a></Button>
          </div>
          <a className="w-fit text-xs text-muted-foreground underline underline-offset-4" href={motionUrl("specialist-card.html")} target="_blank" rel="noreferrer">Abrir muestra completa</a>
        </div>
      </article>
    </section>
  );
}

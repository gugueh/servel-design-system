import html from "../../public/motion/specialist-card.html?raw";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";



function player(reduced = false) {
  let now = 0;
  let nextId = 0;
  const callbacks = new Map<number, FrameRequestCallback>();
  const messages: { playing: boolean; manual: boolean }[] = [];
  const dom = new JSDOM(html, { url: "https://example.test/motion/specialist-card.html?autoplay=0", runScripts: "outside-only" });
  const win = dom.window;
  Object.defineProperty(win.performance, "now", { value: () => now });
  Object.defineProperty(win, "matchMedia", { value: () => ({ matches: reduced, addEventListener() {} }) });
  win.requestAnimationFrame = callback => { callbacks.set(++nextId, callback); return nextId; };
  win.cancelAnimationFrame = id => { callbacks.delete(id); };
  win.postMessage = message => { messages.push(message); };
  win.eval(html.match(/<script>([\s\S]*?)<\/script>/)![1]);
  const api = (win as unknown as { ServelMotion: { restart(): void } }).ServelMotion;
  const get = (id: string) => win.document.getElementById(id)!;
  const advance = (ms: number) => {
    for (let elapsed = 0; elapsed < ms;) {
      const step = Math.min(16, ms - elapsed);
      elapsed += step; now += step;
      const batch = [...callbacks.values()]; callbacks.clear();
      batch.forEach(callback => callback(now));
    }
  };
  return { api, get, advance, messages, close: () => win.close() };
}

describe("tarjeta interactiva del especialista", () => {
  it("abrir Reseñas cancela la demostración y conserva esa cara", () => {
    const p = player();
    try {
      p.api.restart(); p.advance(300);
      p.get("reviews-tab").click(); p.advance(5000);
      expect(p.get("reviews").hidden).toBe(false);
      expect(p.get("services").hidden).toBe(true);
      expect(p.get("profile-card").getAttribute("aria-pressed")).toBe("true");
      expect(p.messages[p.messages.length - 1]).toMatchObject({ playing: false, manual: true });
      p.get("services-tab").click(); p.advance(500);
      expect(p.get("services").hidden).toBe(false);
      expect(p.get("back-face").getAttribute("aria-hidden")).toBe("true");
    } finally { p.close(); }
  });

  it("la entrada muestra el reverso, regresa al frente y termina sin bloquear el clic", () => {
    const p = player();
    try {
      p.api.restart(); p.advance(1250);
      expect(p.get("reviews").hidden).toBe(false);
      p.advance(1500);
      expect(p.get("services").hidden).toBe(false);
      expect(p.messages[p.messages.length - 1].playing).toBe(false);
      p.get("profile-card").click(); p.advance(500);
      expect(p.get("reviews").hidden).toBe(false);
      p.get("profile-card").click(); p.advance(500);
      expect(p.get("services").hidden).toBe(false);
    } finally { p.close(); }
  });

  it("movimiento reducido conserva el cambio manual sin animación", () => {
    const p = player(true);
    try {
      p.api.restart();
      expect(p.get("services").hidden).toBe(false);
      expect(p.messages[p.messages.length - 1].playing).toBe(false);
      p.get("reviews-tab").click();
      expect(p.get("reviews").hidden).toBe(false);
      expect(p.get("rotator").style.transform).toBe("rotateY(180deg)");
      p.get("profile-card").click();
      expect(p.get("services").hidden).toBe(false);
      expect(p.get("rotator").style.transform).toBe("rotateY(0deg)");
    } finally { p.close(); }
  });
});

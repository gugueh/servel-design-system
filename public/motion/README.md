# Servel · Motion

21 splashes completos: entradas V1/V3, salidas A/B/C, fondos Perla/Seda ajustada/Original.
15 ilustraciones, con mail y teléfono ampliados un 60 %. Selfie, Servicio en pausa y Error al cargar mantienen movimiento continuo. Una idea para continuar se reproduce una vez; las demás incluyen una pausa de ocho segundos.

## Kotlin / Flutter
Copiá los HTML que necesites en app/src/main/assets/motion/ (Android) o assets/motion/ (Flutter).
Cada HTML es autónomo: SVG, temporización y reproductor están incluidos. No usa Internet ni un CDN.
ServelMotion.kt y servel_motion.dart contienen los reproductores de ejemplo y sus instrucciones.
Son integraciones mediante WebView local, no Lottie ni vectores animados nativos.
En Flutter agregá webview_flutter con flutter pub add webview_flutter y declará assets/motion/ en pubspec.yaml.
En Kotlin agregá AndroidX WebKit y Compose UI mediante el catálogo de versiones de tu proyecto.

## API del reproductor
window.ServelMotion.play(), pause(), restart(), seek(segundos), setLoop(boolean), setReducedMotion(boolean).
El splash envía "completed" al finalizar la salida (2,94 / 3,10 / 3,36 s según la variante; 3,78 s en la propuesta 04 suavizada), para abrir el destino sin esperar el reposo de demostración de la web.
Los splash se reproducen una sola vez. Las ilustraciones repiten según su duración y pausa indicadas en manifest.json.
La preferencia de movimiento reducido muestra la pose estática y permite continuar el flujo.
La pantalla de destino la controla tu app: el HTML del splash termina transparente.
La Home de la web es únicamente una referencia visual, no forma parte del asset descargado.
En Android 12+ este splash de marca se usa dentro de la aplicación, después del splash del sistema.

## Fuentes de integración
https://developer.android.com/develop/ui/views/layout/webapps/load-local-content
https://developer.android.com/develop/ui/views/launch/splash-screen
https://pub.dev/packages/webview_flutter

Validación: reproducción web y compilación del design system. Los ejemplos móviles deben verificarse en el proyecto y dispositivos de destino.

## V4 · Original y mejorada
La propuesta 04 conserva ambas animaciones, cada una con Perla, Seda ajustada y Original.
- Original: splash-v3-c-*.html / .svg, salida a los 3,36 s.
- Mejorada / más suave: splash-v3-c-smooth-*.html / .svg, salida a los 3,78 s.
Ambas incluyen entrada, reposo y salida. La alternativa de repliegue fue retirada.

## Ritmos de las ilustraciones
- Selfie: movimiento continuo y flash cada 6 s. Servicio en pausa: ciclo continuo de 4,2 s.
- Error al cargar: galaxia continua de 16 s dentro del pelo; estrellas con deriva y brillo variable, planeta giratorio. Las líneas, la cabeza y las manos permanecen estáticas.
- Una idea para continuar: una reproducción de 3,6 s. Los tres destellos desaparecen y regresan escalonados; se conserva la pose final. Se puede repetir con Play, sin reinicio automático ni al salir del hover.
- Aviso importante: oscilación más visible del teléfono y énfasis del signo.
- Sin conexión a internet: giro rígido de las piernas desde la cadera, mayor movimiento de pies y estrellas.
- Productos adicionales: gesto y apertura más amplios; zona central de la ropa corregida a gris #DEDFEA, también en el SVG estático del catálogo.
- Activar notificaciones, Salir del registro, En camino y el resto de propuestas conservan sus versiones anteriores.
- En camino gira 12° desde la cadera, sin cambiar la forma de la pierna. Se incluyen cuatro poses SVG: 0°, 4°, 8° y 12°.
Todas las animaciones respetan movimiento reducido. Las descargas HTML incluyen su ritmo; la idea usa playback: once.
Los cambios están en local; su incorporación en Figma sigue pendiente por el límite de la conexión.

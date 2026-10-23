# Servel · Motion

18 splashes completos: entradas V1/V3, salidas A/B/C, fondos Perla/Seda ajustada/Original.
4 ilustraciones, con mail y teléfono ampliados un 60 %. Todas descansan ocho segundos antes de repetir.

## Kotlin / Flutter
Copiá los HTML que necesites en app/src/main/assets/motion/ (Android) o assets/motion/ (Flutter).
Cada HTML es autónomo: SVG, temporización y reproductor están incluidos. No usa Internet ni un CDN.
ServelMotion.kt y servel_motion.dart contienen los reproductores de ejemplo y sus instrucciones.
Son integraciones mediante WebView local, no Lottie ni vectores animados nativos.
En Flutter agregá webview_flutter con flutter pub add webview_flutter y declará assets/motion/ en pubspec.yaml.
En Kotlin agregá AndroidX WebKit y Compose UI mediante el catálogo de versiones de tu proyecto.

## API del reproductor
window.ServelMotion.play(), pause(), restart(), seek(segundos), setLoop(boolean), setReducedMotion(boolean).
El splash envía "completed" al finalizar la salida (2,94 / 3,10 / 3,36 s), para abrir el destino sin esperar el reposo de demostración de la web.
Los splash se reproducen una sola vez. Las ilustraciones repiten con pausa de 8 s.
La preferencia de movimiento reducido muestra la pose estática y permite continuar el flujo.
La pantalla de destino la controla tu app: el HTML del splash termina transparente.
La Home de la web es únicamente una referencia visual, no forma parte del asset descargado.
En Android 12+ este splash de marca se usa dentro de la aplicación, después del splash del sistema.

## Fuentes de integración
https://developer.android.com/develop/ui/views/layout/webapps/load-local-content
https://developer.android.com/develop/ui/views/launch/splash-screen
https://pub.dev/packages/webview_flutter

Validación: reproducción web y compilación del design system. Los ejemplos móviles deben verificarse en el proyecto y dispositivos de destino.

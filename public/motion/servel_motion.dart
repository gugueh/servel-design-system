// Ejecutá: flutter pub add webview_flutter
// Guardá splash-v1-c-perla.html en assets/motion/ y declaralo:
// flutter:
//   assets:
//     - assets/motion/
// Uso: ServelMotion(asset: 'assets/motion/splash-v1-c-perla.html', onFinished: () { /* abrir destino */ })
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class ServelMotion extends StatefulWidget {
  const ServelMotion({super.key, required this.asset, this.onFinished});
  final String asset;
  final VoidCallback? onFinished;
  @override
  State<ServelMotion> createState() => _ServelMotionState();
}

class _ServelMotionState extends State<ServelMotion> with WidgetsBindingObserver {
  late final WebViewController _controller;
  bool _ready = false;
  bool _reducedMotion = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..addJavaScriptChannel('ServelFlutter', onMessageReceived: (message) {
        if (mounted && message.message == 'completed') widget.onFinished?.call();
      })
      ..setNavigationDelegate(NavigationDelegate(onPageFinished: (_) {
        _ready = true;
        _controller.runJavaScript(
          'window.ServelMotion.setReducedMotion($_reducedMotion);window.ServelMotion.restart();',
        );
      }))
      ..loadFlutterAsset(widget.asset);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _reducedMotion = MediaQuery.of(context).disableAnimations;
    if (_ready) {
      _controller.runJavaScript('window.ServelMotion.setReducedMotion($_reducedMotion);');
    }
  }

  @override
  void didUpdateWidget(covariant ServelMotion oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.asset != widget.asset) {
      _ready = false;
      _controller.loadFlutterAsset(widget.asset);
    }
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (_ready && state != AppLifecycleState.resumed) {
      _controller.runJavaScript('window.ServelMotion.pause();');
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => WebViewWidget(controller: _controller);
}

export type MotionAsset = {
  id: string;
  title: string;
  kind: "splash" | "illustration" | "interaction";
  entry?: "v1" | "v3";
  exit?: "a" | "b" | "c";
  width: number;
  height: number;
  duration: number;
  movement: number;
  pause: number;
  figma: string;
};

export const motionUrl = (file: string) => `${import.meta.env.BASE_URL}motion/${file}`;

export function kotlinExample(asset: MotionAsset) {
  return `// Dependencias: Compose UI + AndroidX WebKit (androidx.webkit:webkit).
// Guardá ${asset.id}.html en app/src/main/assets/motion/.
// Uso: ServelMotion("${asset.id}.html", Modifier.fillMaxSize()) { ${asset.kind === "interaction" ? "/* demostración terminada: conservar el perfil */" : "/* abrir destino */"} }
package com.servel.motion

import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Build
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import androidx.webkit.WebViewAssetLoader

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun ServelMotion(
    assetName: String,
    modifier: Modifier = Modifier,
    onFinished: () -> Unit = {}
) {
    require(Regex("[a-z0-9-]+[.]html").matches(assetName))
    val context = LocalContext.current
    val onFinishedNow by rememberUpdatedState(onFinished)
    val webView = remember(context) {
        val loader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context))
            .build()
        WebView(context).apply {
            setBackgroundColor(Color.TRANSPARENT)
            isVerticalScrollBarEnabled = false
            isHorizontalScrollBarEnabled = false
            settings.javaScriptEnabled = true
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            addJavascriptInterface(object {
                @JavascriptInterface
                fun completed() { post { onFinishedNow() } }
            }, "ServelAndroid")
            webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(
                    view: WebView, request: WebResourceRequest
                ): WebResourceResponse? = loader.shouldInterceptRequest(request.url)

                override fun shouldOverrideUrlLoading(
                    view: WebView, request: WebResourceRequest
                ) = request.url.host != "appassets.androidplatform.net"

                override fun onPageFinished(view: WebView, url: String) {
                    val reduced = Build.VERSION.SDK_INT >= 26 && !ValueAnimator.areAnimatorsEnabled()
                    view.evaluateJavascript(
                        "window.ServelMotion.setReducedMotion(" + reduced + ");" +
                        "window.ServelMotion.restart();", null
                    )
                }
            }
        }
    }
    DisposableEffect(webView) {
        onDispose {
            webView.removeJavascriptInterface("ServelAndroid")
            webView.stopLoading()
            webView.destroy()
        }
    }
    AndroidView(
        factory = { webView },
        modifier = modifier,
        update = { view ->
            val url = "https://appassets.androidplatform.net/assets/motion/" + assetName + "?autoplay=0"
            if (view.url != url) view.loadUrl(url)
        }
    )
}
// En una pantalla persistente, pausá el WebView al pasar a segundo plano.
// El splash del sistema Android 12+ se configura por separado.
`;
}

export function flutterExample(asset: MotionAsset) {
  return `// Ejecutá: flutter pub add webview_flutter
// Guardá ${asset.id}.html en assets/motion/ y declaralo:
// flutter:
//   assets:
//     - assets/motion/
// Uso: ServelMotion(asset: 'assets/motion/${asset.id}.html', onFinished: () { ${asset.kind === "interaction" ? "/* demostración terminada: conservar el perfil */" : "/* abrir destino */"} })
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
`;
}

// Dependencias: Compose UI + AndroidX WebKit (androidx.webkit:webkit).
// Guardá splash-v1-c-perla.html en app/src/main/assets/motion/.
// Uso: ServelMotion("splash-v1-c-perla.html", Modifier.fillMaxSize()) { /* abrir destino */ }
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

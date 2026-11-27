# PoPMusic Web Download

Landing page oscura para presentar y distribuir **PoPMusic para Android**. No requiere dependencias ni build: abre `index.html` o sirve la carpeta con cualquier servidor estático.

## Qué incluye

- **Hero** con tres capturas reales de la app dentro de marcos de celular, con flotación y parallax.
- **Galería de 13 capturas reales** (`assets/screenshots/`): Inicio, Buscar, Biblioteca, Reproductor, Letras, Salas, Ajustes, Descargas, Importar playlists, Cuentas de música, Cuenta, Gustos y Sync de playlists. Se puede recorrer con flechas, arrastrando, con los puntos o con scroll/táctil. Reproductor y Letras se tomaron sin barra de estado; en Ajustes y Cuenta se pixelaron la foto, el usuario y el correo.
- **Info real del proyecto** (Kotlin + Jetpack Compose, sin anuncios, letras sincronizadas, descargas offline, salas en vivo, tendencias, importación y sincronización de playlists). En móvil las 10 características viven dentro de **un botón desplegable maestro** con sub-botones por función y su miniatura; en escritorio están **todas visibles** como en la versión original. El bloque "Conoce PoPMusic" muestra el logo oficial junto al título, sin marco. El footer acredita al creador: **@4lexzx**. Cifras animadas (0 anuncios, Android 15+, 18,9 MB, 100 % gratis).
- **Descarga siempre actualizada (APK y EXE)**: los botones de Android apuntan a `/api/download` y los de Windows a `/api/download?platform=windows` (`api/download.js`). El primero redirige al APK del release `latest`; el segundo busca el release de PC (tag `pc-*`) y redirige a su `.exe`. Si GitHub falla, el APK usa la copia local y el exe usa la página de Releases. `vercel.json` sirve la APK con `Content-Disposition: attachment` y `X-Content-Type-Options: nosniff`. En preview local el script usa la APK incluida y enlaza a Releases para el PC.
- **Sección de PC**: capturas reales de la app de escritorio abierta en Windows (`assets/screenshots/pc-*.png`: inicio, búsqueda, biblioteca y letras karaoke) en marcos de ventana, apartado específico de letras y botón de descarga del instalador Windows con icono de laptop en el header.

> Nota: los avisos del navegador/Play Protect al descargar o instalar APKs fuera de Google Play son una protección del sistema, no algo que el sitio pueda desactivar. Se mitiga con HTTPS, cabeceras correctas, firma y huella publicada; la única forma de eliminarlos por completo es publicar en Google Play.
- **Botón a GitHub**: https://github.com/4lexzx/PoPMusic (y el release directo en https://github.com/4lexzx/PoPMusic/releases/latest).
- **Animaciones**: aparición al hacer scroll, contadores, barra de progreso, ecualizador, shine del botón, toast al descargar. Respetan `prefers-reduced-motion`.
- Diseño responsive probado a 1280, 1024, 768, 390 y 320 px: los **3 teléfonos del hero se mantienen en abanico** también en tablet y móvil (no se ocultan los laterales), el menú se compacta en tablet y pasa a hamburguesa en móvil.

## Estructura

```
index.html                      Plantilla + contenido real
styles.css                      Estilos base + secciones/animaciones nuevas
script.js                       Menú, reveal, parallax, galería, contadores, toast
assets/
  popmusic-logo-original.png    Logo oficial (sin modificar)
  popmusic-logo.png             Logo alternativo
  screenshots/                  13 capturas reales optimizadas (540 px)
downloads/
  PoPMusic-v0.1.0.apk           APK firmada lista para descargar
```

## Ejecutar en local

```bash
python -m http.server 8099
# abre http://localhost:8099
```

También funciona abriendo `index.html` directamente en el navegador.

## Publicado

- **Web (Vercel):** https://popmusic-webdescarga.vercel.app
- **Repositorio:** https://github.com/4lexzx/PoPMusic_webDescarga

Para volver a desplegar tras un cambio:

```bash
git add . && git commit -m "cambios" && git push
npx vercel --prod --yes
```

La carpeta ya está vinculada al proyecto de Vercel (`prj_ZJuNOoikfAGf8ZT7tr5RGOI8u9oJ`). La APK se sirve de forma dinámica mediante la función `api/download.js`; `downloads/PoPMusic-v0.1.0.apk` queda solo como respaldo (verificado: responde 200 con 18 922 529 bytes).

## Actualizar la APK

**No hace falta tocar esta web.** Publica la nueva APK como asset en un release de https://github.com/4lexzx/PoPMusic/releases:

- `/api/download` detecta automáticamente el primer `.apk` del release `latest` y redirige allí (inmediato).
- `.github/workflows/sync-apk.yml` comprueba cada 30 min (y en cada push a `main`) la SHA-256 de ese asset contra la copia `downloads/PoPMusic-v0.1.0.apk`. Si cambió, reemplaza el archivo y hace commit; como Vercel está conectado a `main`, ese push dispara el deploy automáticamente. El job se salta sus propios commits (`github.actor != github-actions[bot]`) para no entrar en bucle.

El texto de la web ya no muestra versión ni tamaño fijos, así que no se queda desactualizado.

## Enlaces del proyecto

- Repo: https://github.com/4lexzx/PoPMusic
- Web del proyecto: https://4lexzx.github.io/PoPMusic/
- Privacidad y términos: páginas publicadas en esa misma web
- Contacto: solisumboalexander@hotmail.com

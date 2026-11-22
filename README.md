# PoPMusic Web Download

Landing page oscura para presentar y distribuir **PoPMusic para Android**. No requiere dependencias ni build: abre `index.html` o sirve la carpeta con cualquier servidor estático.

## Qué incluye

- **Hero** con tres capturas reales de la app dentro de marcos de celular, con flotación y parallax.
- **Galería de 13 capturas reales** (`assets/screenshots/`): Inicio, Buscar, Biblioteca, Reproductor, Letras, Salas, Ajustes, Descargas, Importar playlists, Cuentas de música, Cuenta, Gustos y Sync de playlists. Se puede recorrer con flechas, arrastrando, con los puntos o con scroll/táctil. Reproductor y Letras se tomaron sin barra de estado; en Ajustes se pixelaron la foto y el correo de la cuenta.
- **Info real del proyecto** (Kotlin + Jetpack Compose, sin anuncios, letras sincronizadas, descargas offline, salas en vivo, tendencias, importación y sincronización de playlists). Las 10 características son **tarjetas desplegables** con su miniatura; el bloque "Conoce PoPMusic" muestra el logo oficial junto al título, sin marco. Cifras animadas (0 anuncios, Android 15+, 18,9 MB, 100 % gratis).
- **Descarga funcional**: `downloads/PoPMusic-v0.1.0.apk` es la APK firmada de release (18 922 529 bytes, v0.1.0). Todos los enlaces con `download` apuntan a ese archivo.
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

La carpeta ya está vinculada al proyecto de Vercel (`prj_ZJuNOoikfAGf8ZT7tr5RGOI8u9oJ`). El proyecto está en GitHub Pages/Vercel como sitio estático: la APK y las capturas se sirven desde el propio deploy (verificado: `downloads/PoPMusic-v0.1.0.apk` responde 200 con 18 922 529 bytes).

## Actualizar la APK

Copia el nuevo `app-release.apk` a `downloads/PoPMusic-v0.1.0.apk` (o cambia el nombre en los `href` de `index.html`, hay varios: nav, hero, sección de descarga y footer) y actualiza la versión, el tamaño y las cifras visibles.

## Enlaces del proyecto

- Repo: https://github.com/4lexzx/PoPMusic
- Web del proyecto: https://4lexzx.github.io/PoPMusic/
- Privacidad y términos: páginas publicadas en esa misma web
- Contacto: solisumboalexander@hotmail.com

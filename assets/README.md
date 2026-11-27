# Recursos visuales

- `popmusic-logo-original.png`: logo oficial entregado, sin recortes ni modificaciones (también se muestra en "Conoce PoPMusic").
- `popmusic-logo.png`: variante del logo incluida en la plantilla original.
- `screenshots/`: 13 capturas reales de PoPMusic tomadas en un Samsung Galaxy A34 (Android 15), optimizadas a 540 px de ancho:

| Archivo | Pantalla |
| --- | --- |
| `01-inicio.png` | Inicio (hero, acceso rápido, estados de ánimo, tendencias) |
| `02-buscar.png` | Buscar (tendencias y artistas) |
| `03-biblioteca.png` | Biblioteca (favoritos, descargas, playlists) |
| `04-reproductor.png` | Reproductor (sin barra de estado) |
| `05-letras.png` | Letras sincronizadas (sin barra de estado) |
| `06-salas.png` | Salas “Todos controlan” |
| `07-ajustes.png` | Ajustes (audio, apariencia, descargas) |
| `08-descargas.png` | Configuración de descargas y Wi-Fi |
| `09-importar.png` | Importar playlist desde YouTube o Spotify |
| `10-sincronizacion.png` | Cuentas de música (YouTube vinculado, Spotify) |
| `11-cuenta.png` | Perfil con favoritos, playlists y descargas |
| `12-gustos.png` | Géneros y artistas favoritos |
| `13-sync-playlist.png` | Sincronización al crear una playlist |
| `pc-01-inicio.png` | PoPMusic para PC: Inicio (capturada de la app abierta en Windows) |
| `pc-02-buscar.png` | PoPMusic para PC: búsqueda y géneros |
| `pc-03-biblioteca.png` | PoPMusic para PC: biblioteca y listas |

Para regenerarlas: activa modo inmersivo (`adb shell settings put global policy_control immersive.full=com.popmusic.app`), abre la app, navega a cada pantalla y usa `adb exec-out screencap -p > archivo.png`. Restaura con `adb shell settings put global policy_control null` y redimensiona a 540 px de ancho.

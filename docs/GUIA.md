# Guía para editar y publicar la web

La web tiene dos páginas:

| Página | Dirección | Archivos |
|---|---|---|
| Kodex Studio (portada) | https://ikeruuu.github.io/kodex_studio/ | `index.html`, `css/studio.css`, `js/studio-data.js`, `js/studio.js` |
| Sobre Iker | https://ikeruuu.github.io/kodex_studio/iker/ | `iker/index.html`, `css/site.css`, `js/data.js`, `js/site.js` |

Lo que cambia a menudo está en los dos archivos de datos: `js/studio-data.js` (planes,
precios y textos del estudio) y `js/data.js` (proyectos y fotos de Iker). No hace falta
instalar nada: se edita el archivo, se sube a GitHub y la web se actualiza sola en uno
o dos minutos.

## 0. Cambiar planes, precios y plazos de Kodex Studio

Todo está en `js/studio-data.js`:

- `PLANS`: los tres planes. `price` es el precio, `time` el plazo de entrega, `for` la
  frase de para quién es e `items` la lista de lo que incluye. `featured:1` marca el
  plan destacado.
- `CARE`: la cuota mensual de mantenimiento y lo que cubre.
- `EXTRAS`: los extras con precio fijo.
- `STEPS`: los pasos de «Cómo trabajamos».
- `FAQ`: las preguntas habituales.
- `TRACE` y `LAYERS`: los ejemplos de «Bajo el capó» y las tecnologías por capa.

Cada texto lleva su versión `en` y su versión `es`; cambia siempre las dos. Los precios
son números sin símbolo: la web pone el € y el formato según el idioma.

Para cambiar las dos fotos del antes y después, sustituye
`assets/photos/ba-before.jpg` y `assets/photos/ba-after.jpg` por otras dos del mismo
tamaño y con el mismo encuadre (900 × 1200 px).

Los apartados siguientes (1 y 2) son de la página «Sobre Iker».

## 1. Añadir un proyecto

En `js/data.js`, dentro de `PROJECTS`, añade un bloque como este (el orden de la lista
es el orden en pantalla):

```js
{id:'mi-proyecto', cat:['ai','web'], award:0, title:'Mi proyecto',
 ev:{en:'Where it was made', es:'Dónde se hizo'},
 d:{en:'One or two lines.', es:'Una o dos líneas.'},
 more:{en:'Extra detail shown on "More details".', es:'Detalle extra al pulsar «Más detalles».'},
 tags:['Python','FastAPI'],
 links:[{en:'Code', es:'Código', u:'https://github.com/Ikeruuu/mi-proyecto'}]},
```

- `id`: nombre corto, sin espacios y que no se repita.
- `cat`: en qué filtros aparece. Valores: `ai`, `data`, `web`, `hw`, `biz`.
- `award:1` pone la medalla ámbar de premio.
- `big:1` hace la tarjeta más ancha (media fila). Las tarjetas normales ocupan un tercio:
  si la última fila queda coja, marca como `big` las dos últimas.
- `titleEs`: opcional, si el título cambia en español.
- `links`: déjalo en `[]` si no hay enlaces. No enlaces repos vacíos.

Para quitar un proyecto, borra su bloque entero.

## 2. Añadir una foto o un vídeo al carrete

1. Prepara el archivo:
   - Foto: JPG de unos 1600 px en el lado largo.
   - Vídeo: MP4 sin sonido y una imagen de portada. Con ffmpeg:
     ```bash
     ffmpeg -i original.mp4 -an -c:v libx264 -crf 27 -pix_fmt yuv420p -movflags +faststart v4.mp4
     ffmpeg -ss 1 -i original.mp4 -frames:v 1 v4.jpg
     ```
2. Cópialo a `assets/photos/`.
3. Añade una entrada en `PHOTOS` (`js/data.js`):

```js
// foto
{src:P+'12-bilbao.jpg', w:4, h:3, cat:{en:'City',es:'Ciudad'}, place:{en:'Bilbao',es:'Bilbao'},
 alt:{en:'What the photo shows', es:'Qué se ve en la foto'}},
// vídeo
{src:P+'v4.mp4', poster:P+'v4.jpg', video:1, w:16, h:9, cat:{en:'Video',es:'Vídeo'},
 alt:{en:'What the clip shows', es:'Qué se ve en el clip'}},
```

- `w` y `h` son la proporción de la imagen (4 y 3, 3 y 4, 16 y 9, o los píxeles reales).
- `place` es opcional.
- `alt` describe la imagen para quien no puede verla. No lo dejes vacío.
- Si cambias una foto por otra, usa un nombre de archivo nuevo: así nadie ve la antigua
  guardada en su navegador.

## 3. Cambiar textos fijos o el CV

Los textos fijos de Kodex Studio están en `index.html` y los de la página de Iker, con
el CV, en `iker/index.html`. Cada texto aparece dos veces seguidas:

```html
<span class="en">Text in English</span><span class="es">Texto en español</span>
```

Cambia siempre las dos. El CV es el bloque `<section id="cv">`: cada puesto es un
`<div class="job">`. El botón «Guardar como PDF» imprime solo esa hoja.

## 4. Colores y tipografías

Cada página tiene sus variables al principio de su hoja de estilos. En `css/site.css`
(página de Iker): `--paper` (fondo claro), `--ink` (texto), `--code` (azul), `--film`
(ámbar), `--night` (fondo oscuro). En `css/studio.css` (Kodex Studio): `--bg` (fondo),
`--text`, `--amber` y `--blue`. Cambiar una variable cambia toda la página. Los colores de la escena 3D están al principio de
`js/scene.js`, en el objeto `C`.

## 5. Probar antes de publicar

```bash
python -m http.server 8000
```

y abre `http://localhost:8000` (Kodex Studio) o `http://localhost:8000/iker/` (Sobre
Iker). Ábrela siempre así y no con doble clic en el archivo: el paso de una página a
otra necesita el servidor. Para ver la versión de móvil, en Chrome: F12 y el icono
del teléfono.

## 6. Publicar

```bash
git add .
git commit -m "Describe el cambio"
git push
```

GitHub Pages publica lo que haya en la rama `main`. Las direcciones son
https://ikeruuu.github.io/kodex_studio/ y https://ikeruuu.github.io/kodex_studio/iker/

Si alguna vez hay que activarlo de nuevo: en GitHub, **Settings → Pages → Source:
Deploy from a branch → `main` y `/ (root)` → Save**.

## 7. Dominio propio (opcional)

1. Compra el dominio (por ejemplo `kodexstudio.dev`).
2. En GitHub: **Settings → Pages → Custom domain**, escribe el dominio y guarda.
3. En tu proveedor de dominio, crea el registro DNS que indique GitHub.
4. En `index.html` y en `iker/index.html`, cambia la dirección en `canonical`, `og:url`
   y `og:image`.

## 8. Compartir en LinkedIn

Al pegar el enlace, LinkedIn muestra la imagen `assets/og.png`, el título y la
descripción que hay en la cabecera de la página enlazada (`index.html` o
`iker/index.html`). Si cambias esa imagen y LinkedIn
sigue enseñando la antigua, pasa el enlace por el
[Post Inspector](https://www.linkedin.com/post-inspector/) para que la vuelva a leer.

## 9. Si algo no se ve

| Qué pasa | Qué mirar |
|---|---|
| No aparece el fondo 3D | El navegador no tiene WebGL o no cargó three.js. La web sigue funcionando con fondo liso. |
| Una foto no sale | Que el nombre en `PHOTOS` sea idéntico al del archivo, mayúsculas incluidas. |
| La web se queda en blanco tras editar `data.js` o `studio-data.js` | Falta una coma o una llave. Abre la consola (F12) y mira la línea del error. |
| La pantalla de carga tarda en irse | Espera a que termine de cargar la página; si algo falla, se retira sola a los pocos segundos. |
| El cambio no aparece | Espera dos minutos y recarga con Ctrl+F5. |

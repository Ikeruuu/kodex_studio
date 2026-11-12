# Guía para editar y publicar la web

Todo lo que cambia a menudo está en `js/data.js`. Los textos fijos y el CV están en
`index.html`. No hace falta instalar nada: se edita el archivo, se sube a GitHub y la
web se actualiza sola en uno o dos minutos.

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

## 3. Cambiar textos, el CV o los servicios

Están en `index.html`. Cada texto aparece dos veces seguidas:

```html
<span class="en">Text in English</span><span class="es">Texto en español</span>
```

Cambia siempre las dos. El CV es el bloque `<section id="cv">`: cada puesto es un
`<div class="job">`. El botón «Guardar como PDF» imprime solo esa hoja.

## 4. Colores y tipografías

Al principio de `css/site.css` están las variables: `--paper` (fondo claro), `--ink`
(texto), `--code` (azul), `--film` (ámbar), `--night` (fondo oscuro). Cambiar una
variable cambia toda la web. Los colores de la escena 3D están al principio de
`js/scene.js`, en el objeto `C`.

## 5. Probar antes de publicar

```bash
python -m http.server 8000
```

y abre `http://localhost:8000`. Para ver la versión de móvil, en Chrome: F12 y el icono
del teléfono.

## 6. Publicar

```bash
git add .
git commit -m "Describe el cambio"
git push
```

GitHub Pages publica lo que haya en la rama `main`. La dirección es
https://ikeruuu.github.io/kodex_studio/

Si alguna vez hay que activarlo de nuevo: en GitHub, **Settings → Pages → Source:
Deploy from a branch → `main` y `/ (root)` → Save**.

## 7. Dominio propio (opcional)

1. Compra el dominio (por ejemplo `kodexstudio.dev`).
2. En GitHub: **Settings → Pages → Custom domain**, escribe el dominio y guarda.
3. En tu proveedor de dominio, crea el registro DNS que indique GitHub.
4. En `index.html`, cambia la dirección en `canonical`, `og:url` y `og:image`.

## 8. Compartir en LinkedIn

Al pegar el enlace, LinkedIn muestra la imagen `assets/og.png`, el título y la
descripción que hay en la cabecera de `index.html`. Si cambias esa imagen y LinkedIn
sigue enseñando la antigua, pasa el enlace por el
[Post Inspector](https://www.linkedin.com/post-inspector/) para que la vuelva a leer.

## 9. Si algo no se ve

| Qué pasa | Qué mirar |
|---|---|
| No aparece el fondo 3D | El navegador no tiene WebGL o no cargó three.js. La web sigue funcionando con fondo liso. |
| Una foto no sale | Que el nombre en `PHOTOS` sea idéntico al del archivo, mayúsculas incluidas. |
| La web se queda en blanco tras editar `data.js` | Falta una coma o una llave. Abre la consola (F12) y mira la línea del error. |
| El cambio no aparece | Espera dos minutos y recarga con Ctrl+F5. |

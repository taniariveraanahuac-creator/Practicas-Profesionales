# Evaluación de Prácticas Profesionales · ADE

Plataforma de evaluación de las presentaciones finales de Prácticas Profesionales de la Licenciatura en Administración y Dirección de Empresas, Escuela Internacional de Negocios, Universidad Anáhuac Cancún.

Coordinación: Mtra. Tania Rivera Lozano.

## Qué hace

- **Programa:** horario de las 10 presentaciones con coffee break y avance de firmas por practicante.
- **Evaluar:** rúbrica de 7 criterios y 4 niveles con letra grande y colores de alto contraste (el nivel elegido se rellena de color), botones **A− / A+** para ajustar el tamaño de letra, **Guardar avance** para terminar después, firma con folio, **Editar evaluación** después de firmar (con **Cancelar edición** para dejarla como estaba), avance automático al siguiente alumno y cambio de evaluador en un toque.
- **Evaluador invitado:** el representante de cada empresa evalúa con su nombre y cargo desde su propio QR.
- **Resultados:** tabla con las calificaciones firmadas y el promedio, exportable a Excel (.csv).
- **Reportes:** un reporte por practicante en Word (.docx), uno por uno o todos en .zip.
- **Rúbrica:** criterios y niveles en vista de alto contraste, con letra más grande.
- **Corregir elecciones:** se puede tocar otro nivel o el mismo para quitarlo, o usar **Quitar** en cada criterio; si la evaluación ya estaba firmada entra sola en modo edición.
- **Cartas:** invitaciones en Word para empresas y evaluadores, con su liga de acceso.
- **Accesos:** liga y código QR personal para cada evaluador y para cada empresa invitada.
- **Tutorial paso a paso:** se abre solo la primera vez que alguien entra a Evaluar (6 pasos con dibujos; 5 para el invitado de la empresa). Se puede volver a ver desde Evaluar o desde la Guía de uso.
- **Fecha y horario (solo coordinación):** cambiar la fecha de todos, recorrer el horario, nueva hora de inicio o ajustar practicante por practicante, y publicarlo para todos con `programa.json`.
- **Seguimiento y Coordinación (solo coordinación):** qué evalúa cada quien en vivo, reapertura de firmas, edición de practicantes, jurado, rúbrica y horarios, y respaldo en .json.

## Contenido

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La plataforma completa en un solo archivo: programa, evaluación con rúbrica, resultados, reportes, cartas, accesos con QR, seguimiento y coordinación. |
| `nube.json` | Dirección de la Hoja de Google donde se guardan las evaluaciones (ver «Guardado en la nube»). |
| `Code.gs` | Código del servidor para pegar en Apps Script de la Hoja de Google. |
| `programa.json` | Programa publicado (fechas, horarios, lugar, coffee break y demás ajustes de coordinación) que ven todos los visitantes. |
| `.nojekyll` | Le indica a GitHub Pages que publique el archivo tal cual. |
| `README.md` | Estas instrucciones. |

## Publicar en GitHub Pages

1. Crea un repositorio nuevo, por ejemplo `evaluacion-practicas-ade`.
2. Sube `index.html`, `.nojekyll` y `README.md` a la raíz del repositorio.
3. En el repositorio entra a **Settings → Pages**.
4. En **Source** elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
5. En uno o dos minutos la página queda en `https://TU-USUARIO.github.io/evaluacion-practicas-ade/`.

## Ligas personales y códigos QR

Las ligas y los QR se generan solos con la dirección donde esté publicada la página:

- Jurado: `…/evaluacion-practicas-ade/#eval-maryfer`, `#eval-jose`, `#eval-carlos`, `#eval-xareni`, `#eval-tania`
- Invitado de empresa por practicante: `…/#eval-invitado-adriana`, `#eval-invitado-zeltzin`, etc.

Descárgalos desde la pestaña **Accesos** con **Descargar todos los QR (.zip)**.

## Activar la coordinación en tu navegador

En la versión de GitHub la pestaña **Coordinación** y **Seguimiento** están ocultas. Para activarlas en tu computadora abre una vez:

```
https://TU-USUARIO.github.io/evaluacion-practicas-ade/#coordinacion
```

Desde ese momento ese navegador muestra el panel de control y el interruptor **Editar**. No compartas esa liga con el jurado.

## Cambiar la fecha y el horario para todos

1. Abre la página en tu navegador de coordinación y entra a **Coordinación → Fecha y horario**.
2. Usa **Cambiar la fecha de todos**, **Recorrer el horario**, **Nueva hora de inicio**, o edita practicante por practicante.
3. Toca **Descargar programa.json**.
4. En GitHub entra a **Add file → Upload files**, arrastra `programa.json` (reemplaza al anterior) y toca **Commit changes**.
5. En 1 o 2 minutos todos ven la nueva fecha y horario. Mientras no lo publiques, la página te muestra el aviso «Tienes cambios sin publicar».

## Guardado en la nube (Hoja de Google)

Con la nube activada, cada calificación, firma y corrección se sube sola a una Hoja de Google de la coordinación, y todos los equipos ven las firmas de todo el jurado y el promedio.

1. Crea una Hoja de Google nueva.
2. **Extensiones → Apps Script**, borra lo que aparezca y pega todo el archivo `Code.gs` de este repositorio. Guarda.
3. **Implementar → Nueva implementación → Aplicación web**. Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier usuario**. Toca **Implementar** y autoriza.
4. Copia la **URL de la aplicación web** (termina en `/exec`).
5. En GitHub abre `nube.json`, toca el lápiz y deja: `{ "url": "https://script.google.com/macros/s/…/exec" }`. Toca **Commit changes**.

En 1 o 2 minutos la página muestra «Guardado en la nube». Si falla el internet, lo capturado se queda en el navegador y se sube solo al reconectar. Mientras `nube.json` esté vacío, cada navegador guarda lo suyo.

## Requisitos

Navegador actualizado (Chrome, Edge, Safari o Firefox). La página carga tipografías de Google Fonts y la librería JSZip desde cdnjs; los códigos QR se generan dentro de la página sin conexión externa.

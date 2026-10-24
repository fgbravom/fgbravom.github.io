# Legacy

Archivos que el sitio ya no utiliza. Se conservan por referencia histórica y **no forman parte del build** ni se publican.

Movidos aquí el 24 de octubre de 2026.

| Ruta | Motivo |
| --- | --- |
| `js/data.js` | Versión antigua de los datos de proyectos/técnologías, reemplazada por `js/modules/data/projects.js`. No se importaba en ninguna página. |
| `js/navigation.js` | Duplicado de `js/modules/components/navigation.js`; `js/main.js` ya inicializa la navegación. No se cargaba en ningún HTML. |
| `js/modules/data/technologies.js` | Datos de tecnologías sin ningún import. La página `tecnologias.html` es estática. |
| `components/` | Partials HTML (`footer`, `hero`, `navigation`, `sections`) de una versión anterior; el contenido se inlineó en los HTML. |
| `docs/CONTINUACION.md` | Guía de la refactorización a Vite, ya completada. |
| `docs/design-proposals.md` | Propuestas de diseño descartadas, antes en `.claude/`. |
| `assets/images/helpdaia*` | Capturas del proyecto `help.daia.cl`, retirado del portfolio. |
| `assets/images/daia.cl*` | Capturas antiguas de `daia.cl`; el proyecto actual usa `daiacl-home*`. |

## Restaurar un archivo

```bash
git mv legacy/js/data.js js/data.js
```

Los archivos de esta carpeta no se copian a `public/` ni se procesan con `optimize-images.js`.

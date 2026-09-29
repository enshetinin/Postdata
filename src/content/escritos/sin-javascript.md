---
title: Un blog que no necesita JavaScript para leerse
description: Por qué este sitio es HTML estático y dónde hace una excepción.
date: 2026-09-10
tema: desarrollo
---

Un texto no necesita un framework en el navegador para mostrarse. Este blog se genera como HTML estático: cada página existe antes de que nadie la pida.

## La excepción: buscar

El buscador sí usa JavaScript. El índice se construye al generar el sitio y el navegador solo descarga los fragmentos que necesita para cada búsqueda.

```sh
npm run build   # genera el sitio y el índice de búsqueda
```

Todo lo demás funciona igual con JavaScript desactivado.

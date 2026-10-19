# DESIGN.md — Magui Acrylics

> Fuente de verdad visual de la landing de Magui Acrylics (maguiacrylics.com).
> Cualquier agente o persona que modifique la web lee este archivo primero.
> Si choca con `design-system/magui-acrylics/MASTER.md` (salida automática de UI UX Pro Max), **manda este archivo**:
> de MASTER se toman la estructura, los efectos y el checklist; los colores y las fuentes son los de aquí.

## 1. Tema visual

- **Marca:** Magui Acrylics · by Margarita Estrada. Uñas acrílicas a domicilio en Quito y los valles.
- **Concepto:** «Uñas que vuelan». Naturaleza viva: mariposas, hojas, flores; colores vivos con el rojo como protagonista.
- **Estilo base (UI UX Pro Max):** Soft UI Evolution — superficies claras, sombras suaves, bordes redondeados, buen contraste. Patrón de página: Hero centrado en conversión + pasos + CTA final.
- **Sensación:** cálida, femenina, alegre, cercana. Nada de neón, nada de modo oscuro, nada de animaciones bruscas.

## 2. Logo

| Archivo | Uso |
| --- | --- |
| `assets/logo/magui-logo-horizontal.svg` | Cabecera de la web (fondo claro) |
| `assets/logo/magui-logo-horizontal-blanco.svg` | Pie de página y fondos rojo/tinta |
| `assets/logo/magui-logo.svg` | Logo completo, fondo crema |
| `assets/logo/magui-logo-blanco.svg` | Logo completo sobre rojo o verde |
| `assets/logo/magui-isotipo.svg` | Foto de perfil, sellos |
| `assets/logo/favicon.svg`, `apple-touch-icon.png` | Pestaña del navegador e icono del celular |
| `assets/logo/magui-mariposa.svg` | Mariposa suelta para decorar |

Reglas: no deformar, no recolorear, no poner el logo rojo sobre coral o rosa. Aire alrededor igual a la altura de la «M».

## 3. Paleta (tokens CSS)

| Token | HEX | Rol | Contraste verificado |
| --- | --- | --- | --- |
| `--crema` | #FFF8F1 | Fondo principal | — |
| `--rubor` | #FDE9E3 | Fondo de secciones alternas | — |
| `--rojo` | #D7263D | Color de marca: botón principal, mariposas, bandas | crema sobre rojo 4.7:1 |
| `--rojo-texto` | #B81E33 | Rojo cuando es texto sobre claro | 6.1:1 sobre crema |
| `--coral` | #FF7A59 | Acentos, alas, detalles; texto encima en tinta | tinta sobre coral 6.5:1 |
| `--rosa` | #F7B2B7 | Fondos suaves decorativos | tinta sobre rosa 9.6:1 |
| `--verde` | #2F8F5B | Hojas, ramitas, detalles de naturaleza (decorativo) | — |
| `--verde-texto` | #246F47 | Verde cuando es texto | 5.8:1 sobre crema |
| `--dorado` | #E0A93B | Brillos, filetes, cuerpo de la mariposa | decorativo |
| `--tinta` | #3A0D17 | Texto principal | 16:1 sobre crema |
| `--tinta-suave` | #6B4A50 | Texto secundario | 7.3:1 sobre crema, 6.6:1 sobre rubor |
| `--whatsapp` | #25D366 | Botón flotante y botones «Agenda por WhatsApp»; texto en verde oscuro #0B3B24 | 6.4:1 |

Proporción: 60 % crema/rubor · 20 % tinta · 15 % rojo · 5 % coral, verde y dorado.
Prohibido: texto rojo `--rojo` sobre rubor (4.2:1), texto blanco sobre `--verde` (4.0:1), degradados morados/azules.

## 4. Tipografía

| Rol | Fuente | Peso | Tamaño (móvil → escritorio) |
| --- | --- | --- | --- |
| Titular H1 | Playfair Display, cursiva | 600 | 44 → 76 px, interlineado 1.02 |
| Títulos H2 | Playfair Display, cursiva | 600 | 34 → 52 px |
| Subtítulos H3 | Playfair Display | 600 | 22 → 26 px |
| Texto | Jost | 400 | 17 px, interlineado 1.6 |
| Rótulos / botones | Jost, MAYÚSCULAS, espaciado 0.16 em | 500 | 13–15 px |
| Firma / acento | Great Vibes | 400 | solo palabras sueltas («Magui», «gracias») ≥ 32 px |

Fuentes de Google Fonts, con `display=swap`. Nunca Great Vibes en párrafos ni botones.

## 5. Componentes

- **Botón principal:** fondo `--rojo`, texto `--crema`, forma píldora (radio 999 px), alto mínimo 52 px, icono de WhatsApp a la izquierda. Hover: sube 2 px y sombra rojiza suave (200 ms). Siempre lleva a WhatsApp.
- **Botón secundario:** borde 1.5 px `--tinta`, texto `--tinta`, fondo transparente.
- **Tarjeta de servicio:** fondo blanco cálido (#FFFFFF), radio 24 px, sombra `0 10px 30px -12px rgba(58,13,23,.18)`, borde 1 px #F3DCD3.
- **Foto de diseño:** radio 28 px, `object-fit: cover`, `loading="lazy"`, WebP con respaldo JPG, texto alternativo que describe el diseño.
- **Paso numerado:** número en Playfair cursiva dentro de un círculo `--rosa`.
- **Botón flotante de WhatsApp:** abajo a la derecha, 60 px, `--whatsapp`, icono `--tinta`, etiqueta accesible «Escribir a Magui por WhatsApp», respeta el área segura del celular.
- **Iconos:** SVG en línea, trazo 1.6 px, estilo Lucide. Nunca emojis como iconos.

## 6. Movimiento

- **Portada:** mariposas SVG que revolotean despacio (ciclos de 9–16 s), pétalos/hojas que caen en diagonal, titular que entra con un fundido de 600 ms.
- **Scroll:** las secciones aparecen con fundido + 16 px de subida, escalonado 60 ms (patrón «Stagger List» de UI UX Pro Max), una sola vez.
- **Máximo 2 elementos animándose a la vez por pantalla.**
- `prefers-reduced-motion: reduce` → sin revoloteo, sin caída, todo visible de entrada.
- Solo se animan `transform` y `opacity`.

## 7. Layout

- Mobile first. Probar a 360, 768, 1024 y 1440 px. Sin scroll horizontal.
- Contenedor máximo 1160 px, márgenes laterales 20 px en celular.
- Espaciado entre secciones: 80 px celular, 120 px escritorio.
- Orden de secciones: Cabecera → Portada → Diseños (galería) → Servicios → Cómo agendar → Sobre mí → Llamada final → Pie. Botón flotante de WhatsApp en todas.

## 8. Contenido fijo

- WhatsApp: **098 976 0050** → `https://wa.me/593989760050?text=Hola%20Magui%2C%20quiero%20agendar%20mis%20u%C3%B1as%20%F0%9F%A6%8B`
- Zona: Quito y los valles · A domicilio.
- Precios: servicios **desde $10**. El precio exacto se cotiza por WhatsApp según diseño y largo.
- Agenda: con **1 a 2 días** de anticipación.
- Voz: tutea, primera persona («te llevo», «mis diseños»), español de Ecuador, frases cortas.

## 9. Lo que no se hace

- No inventar testimonios, cifras ni años de experiencia.
- No publicar fotos con marca de agua de otras manicuristas ni personajes con derechos de autor.
- No usar Inter, Roboto ni Arial como fuente visible.
- No poner texto sobre fotos sin una capa que asegure 4.5:1.

## 10. Checklist antes de publicar (UI UX Pro Max + Ecnexo)

- [ ] Contraste ≥ 4.5:1 en todo el texto
- [ ] Foco visible al navegar con teclado
- [ ] `prefers-reduced-motion` respetado
- [ ] Botones ≥ 44 × 44 px
- [ ] Imágenes WebP, con `width`/`height` y `loading="lazy"` (menos la portada)
- [ ] Sin scroll horizontal a 360 px
- [ ] Enlaces de WhatsApp probados en Android y iPhone
- [ ] Title, description, Open Graph y datos estructurados `BeautySalon`
- [ ] Favicon y vista previa al compartir

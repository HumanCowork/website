# 🎨 Sistema de Diseño & Tokens Globales — Human Cowork (`human-cowork-web`)

> **Propósito:** Documento canónico de tokens de diseño, geometría, jerarquía tipográfica y accesibilidad para el sitio institucional de **Human Cowork** (Córdoba, Argentina).
> **Principio Rector:** Moderno suave & chill, accesible (WCAG AA/AAA), sin estridencias, alineado a la identidad de una comunidad técnica de *builders*.

---

## 1. 🌈 Paleta Semántica & Estados de Color

Todos los colores están anclados a variables CSS nativas en `src/app/globals.css`.

| Token CSS | Valor HEX | Uso en la Interfaz | Validación de Contraste |
| :--- | :--- | :--- | :--- |
| `--background` | `#ffffff` | Fondo principal del sitio. Blanco puro, sin grises pesados. | 21:1 vs negro |
| `--foreground` | `#0f172a` | Texto principal (carbón pizarra profundo). | 17.85:1 vs blanco (WCAG AAA) |
| `--primary` | `#1271b7` | Celeste institucional de marca Human Cowork. | 5.16:1 vs blanco (Pasa WCAG AA) |
| `--primary-hover` | `#0e5b94` | Estado hover / activo de botones primarios (~15% más oscuro). | Mayor a 6:1 (Feedback óptico claro) |
| `--primary-subtle`| `#f0f7fc` | Fondo sutil para chips activos, badges o hover de enlaces. | Superficie descansada |
| `--muted` | `#f8fafc` | Fondo de tarjetas secundarias, paneles debossed o barras. | Contraste suave de plano |
| `--muted-foreground` | `#475569` | Bajadas, subtítulos, párrafos de lectura y metadatos. | 7.58:1 vs blanco (WCAG AAA) |
| `--border` | `#e2e8f0` | Borde sutil de 1px para delimitar contenedores sin saturar. | Estándar de delimitación |

> ⚠️ **Regla de Accesibilidad para `#1271b7`:**  
> Cuando el celeste institucional se utilice como color de texto sobre fondo blanco, debe acompañarse de peso seminegrita (`font-semibold`) o tamaños superiores a 18px para garantizar lectura descansada.

---

## 2. 📐 Geometría y Radios de Curvatura (Estética Chill / Soft Modern)

Se adopta la regla de diseño *"The Pill Contract"*:

| Token Semántico | Valor CSS / Tailwind | Aplicación Estricta |
| :--- | :--- | :--- |
| `--radius-button` | `0.75rem` (`12px` / `rounded-xl`) | Botones interactivos principales y secundarios. Curva amigable y sólida sin perder compostura técnica. |
| `--radius-card` | `1rem` (`16px` / `rounded-2xl`) | Tarjetas de contenido, módulos y paneles flotantes. |
| `--radius-pill` | `9999px` (`rounded-full`) | Exclusivo para Badges de estado, tags de tecnología y chips informativos. |

---

## 3. ✍️ Jerarquía Tipográfica (Geist Sans)

| Rol | Clases Tailwind recomendadas | Peso | Tracking | Uso |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | `text-4xl md:text-5xl lg:text-6xl` | `font-bold` (700) | `tracking-tight` (-0.03em) | Título principal de impacto. |
| **Sección (H2)** | `text-2xl md:text-3xl` | `font-semibold` (600) | `tracking-tight` (-0.02em) | Encabezados de módulos. |
| **Subtítulo (H3)** | `text-lg md:text-xl` | `font-medium` (500) | Normal | Títulos de tarjetas / pilares. |
| **Cuerpo (Body)** | `text-base` (16px) | `font-normal` (400) | Normal / `leading-relaxed` | Párrafos y descripciones. |
| **Microcopy / Badge** | `text-xs` (12px) | `font-medium` (500) | `tracking-wide` | Etiquetas, chips y metadatos. |

---

## 4. 🧱 Sistema de Botones (Lego Atómico)

1. **Primario (`Primary`):**  
   Fondo `--primary`, texto `#ffffff`, hover `--primary-hover`, curvatura `rounded-xl`, transición `duration-200 ease-out`.
2. **Secundario / Outline (`Secondary`):**  
   Fondo transparente o blanco, borde `--border`, texto `--foreground`, hover `--muted` con borde `--primary/30`, curvatura `rounded-xl`.
3. **Ghost / Link (`Ghost`):**  
   Sin fondo ni borde, texto `--muted-foreground`, hover `--foreground`, padding compacto.

---

## 5. 🛡️ Protocolo de Gobernanza de Tokens
- Si una propuesta de diseño o requerimiento introduce un color, sombra, radio o espaciado no documentado aquí, **se debe evaluar elevarlo a este archivo y a `globals.css`** antes de aplicarlo en componentes particulares.
- Cero valores mágicos sueltos en el código.

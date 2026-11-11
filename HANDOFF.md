# 🏛️ Human Cowork Website (`human-cowork-web`) — Contexto & Handoff Operativo

> **Propósito:** Sitio web institucional oficial y responsivo para la comunidad **Human Cowork** (Córdoba, Argentina).
> **Repositorio Oficial:** `https://github.com/HumanCowork/website` (Público, rama `main`).
> **Despliegue Previsto:** Cloudflare Pages (a cargo de Facundo Aramayo) con dominio oficial de NIC.ar (`.com.ar` / `.ar`).

---

## 🧭 ¿Qué es Human Cowork? (Contexto de Existencia de la Web)
- **Definición Real:** Es una comunidad abierta de personas que construyen software, agencias, proyectos de inteligencia artificial aplicada y tecnología en Córdoba, Argentina.
- **Filosofía Fundamental:**
  - **Cero humo ni discursos corporativos inflados:** No es una aceleradora de Silicon Valley ni una asociación burocrática. Es un espacio genuino de constructores de software (*builders*).
  - **Foco en lo Tangible:** Un lugar para traer una idea incipiente o un proyecto en marcha y potenciarlo con la mirada técnica, la experiencia y el feedback constructivo de los pares. Bajar ideas a código y productos que funcionen.
  - **La Inteligencia Artificial como Herramienta:** Se exploran modelos, agentes y automatizaciones como herramientas pragmáticas de trabajo diario, con el criterio humano siempre al mando.
- **Hito Actual que Motiva la Creación de la Web:**
  - Se proyecta el establecimiento de una sede física fija para el próximo año en **La Casa Universitaria** (fundación y espacio de 200 m² en Nueva Córdoba).
  - La web institucional brinda una cara visible, formal y seria para la comunidad frente a nuevos miembros, alianzas con espacios físicos e instituciones, y proyectos que quieran sumarse.

---

## 🔒 Principio Rector: Localhost 100% Limpio & Construcción Bloque a Bloque
- **Cero Elementos Rotos, Spam Visual o Banners Invasivos:** La plantilla inicial está en blanco puro (`#FFFFFF`). Prohibido inyectar librerías pesadas, carruseles rotos o layouts que no hayan sido pedidos.
- **Arquitectura Basada en Componentes Lego:** Cada sección se construye en su propio archivo desacoplado dentro de `src/components/`, testeable de forma aislada y responsiva.
- **Control Humano Estricto (Jesús al mando):** Se avanza componente por componente, validando responsive (mobile, tablet, desktop) y tokens antes de pasar al siguiente.

---

## 🎨 Tokens de Diseño y Paleta Oficial
Establecidos en `src/app/globals.css` (Tailwind CSS v4):
- **Fondo Principal:** `#FFFFFF` (Blanco puro).
- **Acento de Marca:** `#1271b7` (Celeste institucional Human Cowork).
- **Texto Principal:** `#0F172A` (Gris carbón oscuro de alto contraste).
- **Texto Secundario:** `#475569` (Gris pizarra medio).
- **Superficies Secundarias (Cards/Badges):** `#F8FAFC` o fondo blanco con borde `#E2E8F0`.
- **Bordes:** `#E2E8F0` (Bordes delgados de 1px).
- **Tipografía:** Sans-serif geométrica moderna (Inter / Geist).

---

## 🏗️ Estructura de Secciones Acordada (Hoja de Ruta)
1. **`Navbar` (`src/components/Navbar.tsx`):**
   - Logo "Human Cowork" (color `#1271b7`).
   - Links horizontales simples (*Qué hacemos*, *Encuentros*, *Aliados*).
   - Botón CTA directo: *"Sumate al Discord"*.
   - Menú colapsable / hamburguesa para mobile.
2. **`Hero` (`src/components/Hero.tsx`):**
   - Badge superior: `Comunidad Tech · Córdoba, Argentina`.
   - Título honesto: *"Donde los builders de software nos encontramos para validar y construir."*
   - Subtítulo breve (2 líneas) sobre compartir código, feedback honesto y transformar ideas en proyectos tangibles.
   - Botones gemelos: Primario en `#1271b7` (*"Sumarme a la comunidad"*) + Secundario outline (*"Próximos Encuentros"*).
3. **`Pilares / Qué Hacemos` (`src/components/Features.tsx`):**
   - Grilla de 3 tarjetas modulares limpias (Demos & Feedback, De la idea a la realidad, Criterio Técnico & IA).
4. **`Encuentros` (`src/components/Events.tsx`):**
   - Ficha del próximo encuentro mensual (sede física en Córdoba + virtual vía Google Meet).
5. **`Aliados / Impulsado por` (`src/components/Partners.tsx`):**
   - Grilla sobria de logos monocromáticos: proyectos y software factories de miembros activos (Fcode, etc.) y espacios amigos (La Casa Universitaria).
6. **`Footer` (`src/components/Footer.tsx`):**
   - Enlaces directos a Instagram (`@humancoworkcba`), GitHub (`HumanCowork`) y Discord.

---

## 🚀 Estado Actual del Entorno
- **Localhost:** Servidor Next.js 16 (Turbopack) corriendo limpio en `http://localhost:3000`.
- **Página Inicial (`src/app/page.tsx`):** Limpia, sin elementos basura de templates.
- **Git:** Sincronizado con `origin/main` en GitHub (`HumanCowork/website`).
- **Fuentes de Verdad de la Comunidad:** Para profundizar en contexto, revisar `/home/jesus/projects/p-human-cowork/docs/context/informacion-general.md` y `p-human-cowork_master_notes.md`.

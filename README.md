# LAMA Travelers — Website Supabase v2

Sitio público de LAMA Travelers para San Pedro de Atacama, construido con Next.js App Router y alimentado por el catálogo real de Supabase.

## Arquitectura

**Supabase → catálogo público seguro → Next.js → pasajero**

- `public.product_catalog`: fuente interna de productos y variantes comerciales.
- `public.catalog_images`: relación entre producto, cover, galería y láminas editoriales.
- Storage `catalog-images`: fuente visual del sitio.
- RPC `get_public_products`: capa pública de lectura. Consolida variantes por `product_slug` y **no devuelve precios, costos, comisiones ni variantes Low cost**.
- `/api/products`: capa reutilizable del sitio para consultar el catálogo público.

La web nunca necesita consultar directamente los campos financieros de `product_catalog`.

## Lógica visual

### Covers
Se usan en tarjetas y encabezados de fichas. Ejemplos:

- `valle_de_la_luna/cover.jpg`
- `geiser_del_tatio/cover.jpg`
- `piedras_rojas/cover.jpg`
- `transporte/trf_aeropuerto/cover.jpg`

### Galerías
Se muestran dentro de cada ficha cuando existen, respetando el aspecto de la imagen.

### Láminas editoriales
Las láminas de Turismo Experiencial, Wellness y Transporte se muestran como piezas editoriales completas. No se fuerzan a un `aspect-ratio` fijo ni a `object-fit: cover`.

Se renderizan con:

```css
width: 100%;
height: auto;
object-fit: contain;
```

Esto permite conservar exactamente la composición original de cada lámina.

## Rutas principales

- `/` — Home editorial + productos destacados.
- `/experiencias` — Catálogo invocado desde Supabase con búsqueda y filtros.
- `/experiencias/[slug]` — Ficha dinámica por producto.
- `/colecciones` — Láminas y narrativa de Atacama Inmersivo.
- `/wellness` — Wellness, salud y procedimientos.
- `/transfers` — Transporte y logística.
- `/alta-montana` — Productos de montaña disponibles en catálogo.
- `/viajes-a-medida` — Captación para itinerarios personalizados.
- `/nosotros` — Marca y operación.
- `/contacto` — Conversión.
- `/api/products` — JSON público seguro.

### API

```text
GET /api/products
GET /api/products?slug=valle_de_la_luna
GET /api/products?category=Desierto
```

## Variables de entorno

Crear `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

La repo incluye como fallback la publishable key actual del proyecto para que funcione al desplegarla inmediatamente. No es una secret key: está diseñada para uso cliente. Las variables de entorno pueden sobrescribirla y son recomendables en producción para facilitar rotación. Los permisos reales dependen de RLS y de las funciones públicas controladas en Supabase.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Deploy en Vercel

1. Importar la repo.
2. Configurar las dos variables `NEXT_PUBLIC_SUPABASE_*`.
3. Deploy.
4. Verificar `/api/products` antes de validar las páginas visuales.

## Migración incluida

`supabase/migrations/20260822_public_catalog_rpc_for_lama_site.sql`

La migración ya fue aplicada al proyecto Supabase actual. Se conserva en la repo para que GitHub vuelva a ser la fuente de verdad de la arquitectura.

## Qué NO publica esta versión

- costos de operador;
- precios base internos;
- comisiones;
- modalidad `Low cost / regular`;
- modalidad `Low cost / transporte`;
- reglas financieras internas.

Los precios públicos podrán agregarse después mediante una vista/RPC específica cuando definamos qué tarifa es efectivamente publicable.

## Próxima iteración

La base ya permite iterar en UX sin rehacer arquitectura: jerarquía de home, selección de láminas, orden de productos, textos comerciales, formulario de viaje y finalmente creación automática del lead `LAM-YYMM-###` en HOTEL EXPERIENCE.

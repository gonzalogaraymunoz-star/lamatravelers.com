# Supabase ↔ LAMA Travelers

## Proyecto usado

Proyecto operativo de HOTEL EXPERIENCE/LAMA con catálogo e imágenes en Storage.

## Datos públicos consumidos por la web

La web consume dos superficies:

1. `catalog_images` — SELECT público únicamente para filas activas.
2. `get_public_products(p_slug)` — RPC pública de solo lectura.

## Motivo del RPC

`product_catalog` contiene información que no debe exponerse indiscriminadamente en una web pública, incluyendo variantes y precios internos. Por eso la web no recibe la fila completa; recibe una proyección explícita y consolidada.

## Resolución de variantes

Por cada `product_slug`, el RPC prioriza:

1. Tour Lama
2. Clásico
3. Bienestar
4. Transporte
5. Regular

Y elimina cualquier origen que comience con `Low cost`.

## Resolución de imágenes

- `image_role = cover`: portada de producto.
- `image_role = gallery`: detalle de producto.
- `image_role = editorial`: lámina narrativa sin necesidad de producto asociado.

Todas las URLs se construyen desde el bucket público `catalog-images`.

## Seguridad

La función pública es `SECURITY DEFINER` de manera intencional porque `product_catalog` no tiene lectura anónima. Su retorno está limitado a campos no financieros y la función no acepta SQL libre ni realiza escrituras.

El Security Advisor de Supabase la marcará como función `SECURITY DEFINER` ejecutable por `anon`; en este caso ese acceso es el comportamiento esperado de la capa pública. Esto no vuelve públicas las tablas financieras subyacentes.

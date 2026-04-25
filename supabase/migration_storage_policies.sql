-- ============================================================
-- Políticas RLS para el bucket de imágenes de productos
-- Ejecuta en: supabase.com → SQL Editor → New query
-- ============================================================

-- Eliminar políticas previas si existen
DROP POLICY IF EXISTS "public_read_images"   ON storage.objects;
DROP POLICY IF EXISTS "public_insert_images" ON storage.objects;
DROP POLICY IF EXISTS "public_update_images" ON storage.objects;
DROP POLICY IF EXISTS "public_delete_images" ON storage.objects;

-- Permitir lectura pública de imágenes
CREATE POLICY "public_read_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Permitir subir imágenes
CREATE POLICY "public_insert_images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images');

-- Permitir reemplazar imágenes
CREATE POLICY "public_update_images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'product-images');

-- Permitir eliminar imágenes
CREATE POLICY "public_delete_images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images');

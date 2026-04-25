-- ============================================================
-- Ejecuta en: supabase.com → SQL Editor → New query
-- ============================================================

-- 1. Agregar columna enabled (todos activos por defecto)
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS enabled BOOLEAN NOT NULL DEFAULT true;

-- 2. Corregir RLS — reemplazar la política FOR ALL por políticas separadas
--    (FOR ALL con WITH CHECK tiene un bug conocido en UPDATE)
DROP POLICY IF EXISTS "public_write" ON products;
DROP POLICY IF EXISTS "public_read"  ON products;
DROP POLICY IF EXISTS "allow_all"    ON products;

CREATE POLICY "select_all" ON products FOR SELECT USING (true);
CREATE POLICY "insert_all" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "update_all" ON products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "delete_all" ON products FOR DELETE USING (true);

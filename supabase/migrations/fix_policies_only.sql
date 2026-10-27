-- ==============================================================================
-- FIX CEPAT: PERBARUI SELURUH RLS POLICIES SUPABASE (AMAN DIJALANKAN ULANG)
-- Gunakan script ini jika tabel-tabel sudah ada dan Anda hanya ingin 
-- memperbarui / memperbaiki policy yang error "already exists".
-- ==============================================================================

-- 1. PROFILES
drop policy if exists "Public can view own profile" on public.profiles;
drop policy if exists "Admin can manage profiles" on public.profiles;

create policy "Public can view own profile" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "Admin can manage profiles" on public.profiles
  for all using (public.is_admin());

-- 2. TICKETS
drop policy if exists "Public can insert tickets" on public.tickets;
drop policy if exists "Public can view own tickets" on public.tickets;
drop policy if exists "Admin can manage tickets" on public.tickets;

create policy "Public can insert tickets" on public.tickets
  for insert with check (true);
create policy "Public can view own tickets" on public.tickets
  for select using (true);
create policy "Admin can manage tickets" on public.tickets
  for all using (public.is_admin());

-- 3. PRODUCTS
drop policy if exists "Public can read active products" on public.products;
drop policy if exists "Admin can manage products" on public.products;

create policy "Public can read active products" on public.products
  for select using (is_active = true or public.is_admin());
create policy "Admin can manage products" on public.products
  for all using (public.is_admin());

-- 4. ORDERS
drop policy if exists "Public can insert orders" on public.orders;
drop policy if exists "Public can view order by code" on public.orders;
drop policy if exists "Admin can manage orders" on public.orders;

create policy "Public can insert orders" on public.orders
  for insert with check (true);
create policy "Public can view order by code" on public.orders
  for select using (true);
create policy "Admin can manage orders" on public.orders
  for all using (public.is_admin());

-- 5. ORDER ITEMS
drop policy if exists "Public can insert order items" on public.order_items;
drop policy if exists "Public can read order items" on public.order_items;
drop policy if exists "Admin can manage order items" on public.order_items;

create policy "Public can insert order items" on public.order_items
  for insert with check (true);
create policy "Public can read order items" on public.order_items
  for select using (true);
create policy "Admin can manage order items" on public.order_items
  for all using (public.is_admin());

-- 6. COMPETITIONS
drop policy if exists "Public can read active competitions" on public.competitions;
drop policy if exists "Admin can manage competitions" on public.competitions;

create policy "Public can read active competitions" on public.competitions
  for select using (is_active = true or public.is_admin());
create policy "Admin can manage competitions" on public.competitions
  for all using (public.is_admin());

-- 7. REGISTRATIONS
drop policy if exists "Public can insert registrations" on public.registrations;
drop policy if exists "Admin can manage registrations" on public.registrations;

create policy "Public can insert registrations" on public.registrations
  for insert with check (true);
create policy "Admin can manage registrations" on public.registrations
  for all using (public.is_admin());

-- 8. SPONSORS
drop policy if exists "Public can read sponsors" on public.sponsors;
drop policy if exists "Admin can manage sponsors" on public.sponsors;

create policy "Public can read sponsors" on public.sponsors
  for select using (is_active = true or public.is_admin());
create policy "Admin can manage sponsors" on public.sponsors
  for all using (public.is_admin());

-- 9. SCHEDULES
drop policy if exists "Public can read schedules" on public.schedules;
drop policy if exists "Admin can manage schedules" on public.schedules;

create policy "Public can read schedules" on public.schedules
  for select using (true);
create policy "Admin can manage schedules" on public.schedules
  for all using (public.is_admin());

-- 10. FAQS
drop policy if exists "Public can read faqs" on public.faqs;
drop policy if exists "Admin can manage faqs" on public.faqs;

create policy "Public can read faqs" on public.faqs
  for select using (is_active = true or public.is_admin());
create policy "Admin can manage faqs" on public.faqs
  for all using (public.is_admin());

-- 11. SITE SETTINGS
drop policy if exists "Public can read settings" on public.site_settings;
drop policy if exists "Admin can manage settings" on public.site_settings;

create policy "Public can read settings" on public.site_settings
  for select using (true);
create policy "Admin can manage settings" on public.site_settings
  for all using (public.is_admin());

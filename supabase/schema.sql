-- Jalankan di Supabase Dashboard -> SQL Editor
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  due_date timestamp with time zone,
  score integer default 0,
  status text default 'Pending',
  duration integer,
  user_id uuid references auth.users(id) not null default auth.uid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tasks enable row level security;

create policy "Users can view their own tasks" on public.tasks for select using (auth.uid() = user_id);
create policy "Users can insert their own tasks" on public.tasks for insert with check (auth.uid() = user_id);
create policy "Users can update their own tasks" on public.tasks for update using (auth.uid() = user_id);
create policy "Users can delete their own tasks" on public.tasks for delete using (auth.uid() = user_id);

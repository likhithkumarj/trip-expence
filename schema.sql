-- Supabase Schema for Trip Expense Tracker
-- Run this in your Supabase Project's SQL Editor (Dashboard -> SQL Editor -> New Query)

-- 1. Create Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    paid_by TEXT NOT NULL,
    split_type TEXT NOT NULL DEFAULT 'equal', -- 'equal', 'custom', 'individual'
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Expense Splits Table (who shares what part of an expense)
CREATE TABLE IF NOT EXISTS expense_splits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_id UUID REFERENCES expenses(id) ON DELETE CASCADE,
    person_name TEXT NOT NULL,
    share_amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Settlements Table (record direct payments between friends)
CREATE TABLE IF NOT EXISTS settlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_person TEXT NOT NULL,
    to_person TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    notes TEXT DEFAULT 'Settlement payment',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE settlements ENABLE ROW LEVEL SECURITY;

-- Allow public access for simple group trip sharing (or restrict per user if using Auth)
CREATE POLICY "Public read expenses" ON expenses FOR SELECT USING (true);
CREATE POLICY "Public insert expenses" ON expenses FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update expenses" ON expenses FOR UPDATE USING (true);
CREATE POLICY "Public delete expenses" ON expenses FOR DELETE USING (true);

CREATE POLICY "Public read expense_splits" ON expense_splits FOR SELECT USING (true);
CREATE POLICY "Public insert expense_splits" ON expense_splits FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete expense_splits" ON expense_splits FOR DELETE USING (true);

CREATE POLICY "Public read settlements" ON settlements FOR SELECT USING (true);
CREATE POLICY "Public insert settlements" ON settlements FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete settlements" ON settlements FOR DELETE USING (true);

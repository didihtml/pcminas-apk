BEGIN;
CREATE TABLE IF NOT EXISTS student_contacts (
  card_id TEXT PRIMARY KEY REFERENCES cards(id) ON DELETE CASCADE,
  email TEXT NOT NULL CHECK (length(trim(email)) > 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS student_bills (
  id UUID PRIMARY KEY,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  description TEXT NOT NULL CHECK (length(trim(description)) > 0),
  due_date DATE NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  status TEXT NOT NULL CHECK (status IN ('PENDENTE', 'PAGO', 'CANCELADO')),
  payment_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS student_bills_card_idx ON student_bills(card_id);
COMMIT;

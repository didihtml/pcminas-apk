-- Execute somente após validar o fluxo em um banco de teste.
BEGIN;
CREATE TABLE IF NOT EXISTS card_payment_access (
  card_id TEXT PRIMARY KEY REFERENCES cards(id),
  exempt BOOLEAN NOT NULL DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS card_payment_orders (
  id UUID PRIMARY KEY,
  card_id TEXT NOT NULL REFERENCES cards(id),
  transaction_id TEXT UNIQUE,
  amount_cents INTEGER NOT NULL CHECK (amount_cents = 1490),
  status TEXT NOT NULL DEFAULT 'CREATING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS card_payment_orders_card_id_idx ON card_payment_orders(card_id);
COMMIT;

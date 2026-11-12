import pg from "pg";

let pool: pg.Pool | undefined;
export function paymentDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL não configurada");
  return pool ??= new pg.Pool({ connectionString: process.env.DATABASE_URL });
}

export async function hasCardAccess(cardId: string): Promise<boolean> {
  const result = await paymentDb().query(
    "SELECT 1 FROM card_payment_access WHERE card_id = $1 AND (exempt OR paid_at IS NOT NULL)",
    [cardId],
  );
  return (result.rowCount ?? 0) > 0;
}

import 'dotenv/config'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error('Configure DATABASE_URL antes de executar o script.')

const apply = process.argv.includes('--apply')
const client = new pg.Client({ connectionString })
await client.connect()
try {
  await client.query('BEGIN')
  await client.query('LOCK TABLE cards IN ACCESS EXCLUSIVE MODE')

  const existing = await client.query("SELECT to_regclass('public.card_access_code_counter') AS name")
  if (existing.rows[0].name) {
    throw new Error('A numeração automática já está instalada. Nenhuma alteração foi realizada.')
  }

  const result = await client.query('SELECT count(*)::int AS total FROM cards')
  const total = result.rows[0].total
  if (!apply) {
    await client.query('ROLLBACK')
    console.log(`${total} carteirinhas seriam numeradas a partir de 1547954. Use --apply para aplicar.`)
  } else {
    await client.query(`
      WITH numbered AS (
        SELECT id, 1547953 + row_number() OVER (ORDER BY "createdAt", id) AS access_code
        FROM cards
      )
      UPDATE cards SET "codigoAcesso" = numbered.access_code::text
      FROM numbered WHERE cards.id = numbered.id
    `)
    await client.query('CREATE TABLE public.card_access_code_counter (id boolean PRIMARY KEY DEFAULT true CHECK (id), next_code bigint NOT NULL)')
    await client.query('INSERT INTO public.card_access_code_counter (id, next_code) VALUES (true, $1)', [1547954 + total])
    await client.query('CREATE UNIQUE INDEX cards_codigo_acesso_unique ON cards ("codigoAcesso")')
    await client.query(`
      CREATE FUNCTION public.assign_card_access_code() RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE public.card_access_code_counter SET next_code = next_code + 1
          WHERE id = true RETURNING (next_code - 1)::text INTO NEW."codigoAcesso";
        ELSE
          NEW."codigoAcesso" := OLD."codigoAcesso";
        END IF;
        RETURN NEW;
      END;
      $$
    `)
    await client.query('CREATE TRIGGER cards_assign_access_code BEFORE INSERT OR UPDATE OF "codigoAcesso" ON cards FOR EACH ROW EXECUTE FUNCTION public.assign_card_access_code()')
    await client.query('COMMIT')
    console.log(`${total} carteirinhas atualizadas. Próximo código: ${1547954 + total}.`)
  }
} catch (error) {
  await client.query('ROLLBACK')
  throw error
} finally {
  await client.end()
}

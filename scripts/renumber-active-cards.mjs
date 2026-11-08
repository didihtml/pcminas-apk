import 'dotenv/config'
import pg from 'pg'

const { Client } = pg
const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error('Configure DATABASE_URL antes de executar o script.')

const apply = process.argv.includes('--apply')
const client = new Client({ connectionString })
await client.connect()
try {
  await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE')
  await client.query('LOCK TABLE cards IN SHARE ROW EXCLUSIVE MODE')
  const { rows } = await client.query(`
    SELECT id, codigo FROM cards
    WHERE lower(trim(status)) IN ('ativo', 'ativa')
    ORDER BY "createdAt" ASC, id ASC
  `)
  if (rows.length !== 46) throw new Error(`Esperadas 46 carteirinhas ativas; encontradas ${rows.length}. Nenhuma alteração realizada.`)

  const ids = rows.map((row) => row.id)
  const codes = rows.map((_, index) => String(928467 + index))
  const conflicts = await client.query(
    'SELECT count(*)::int AS total FROM cards WHERE codigo = ANY($1::text[]) AND NOT (id = ANY($2::text[]))',
    [codes, ids],
  )
  if (conflicts.rows[0].total) throw new Error('A sequência já é usada por outras carteirinhas. Nenhuma alteração realizada.')

  if (apply) {
    for (let index = 0; index < rows.length; index++) {
      await client.query('UPDATE cards SET codigo = $1 WHERE id = $2', [codes[index], rows[index].id])
    }
    await client.query('COMMIT')
    console.log('46 carteirinhas atualizadas: 928467 a 928512.')
  } else {
    await client.query('ROLLBACK')
    console.log('Verificação concluída: 46 carteirinhas seriam atualizadas, de 928467 a 928512, em ordem de criação. Execute com --apply para aplicar.')
  }
} catch (error) {
  await client.query('ROLLBACK')
  throw error
} finally {
  await client.end()
}

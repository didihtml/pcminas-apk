import { scryptSync, timingSafeEqual } from 'node:crypto'

export function verifyStudentPassword(password: string, storedHash: string): boolean {
  const [salt, hash, extra] = storedHash.split(':')
  if (extra !== undefined || !/^[a-f0-9]{32}$/i.test(salt ?? '') || !/^[a-f0-9]{128}$/i.test(hash ?? '')) return false
  const expected = Buffer.from(hash, 'hex')
  return timingSafeEqual(scryptSync(password, salt, expected.length), expected)
}

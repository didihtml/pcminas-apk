# Resumo do Deploy — portalpuc

## Site publicado
https://portalpuc.vercel.app

## Status dos endpoints
- `/api/health` → funcionando
- `/api/cards` → funcionando (banco vazio: retorna `[]`)
- `/api/auth/login` → funcionando
- `/api/cards/:id` → funcionando

## Correção aplicada
O erro `PrismaClientInitializationError` foi resolvido usando o adapter `PrismaPg` nas funções serverless:

```typescript
import { PrismaPg } from "@prisma/adapter-pg"
new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL),
})
```

## Por que o login não funciona agora
O banco Neon está **vazio**. O painel admin (`../../painel-puc/`) estava apontado para um PostgreSQL local (`localhost`), enquanto o site publico lê do Neon PostgreSQL. O painel admin agora está configurado para apontar para o mesmo banco Neon.

## Instruções para sincronizar o painel admin com o Neon

### 1. Confirme o `.env` dentro da pasta `painel-puc`:
Já foi atualizado para:
```
DATABASE_URL="postgresql://neondb_owner:npg_bDFdkf69uWKs@ep-curly-field-aqijjc5a-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

### 2. No terminal, dentro da pasta `painel-puc`, rode:
```bash
npx prisma db push
npm run dev
```

### 3. Cadastre um cartão pelo painel e teste o login em:
https://portalpuc.vercel.app

> **Importante:** os cartões cadastrados anteriormente no banco local (`localhost`) **não foram migrados automaticamente**. Se precisar deles, exporte do banco local ou recadastre no painel após conectar ao Neon.

## APK/PWA
Para gerar um novo APK apontando para o site público, use o PWA Builder:
https://www.pwabuilder.com/ (URL: https://portalpuc.vercel.app)

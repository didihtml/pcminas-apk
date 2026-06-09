# Guia de Deploy na Vercel

## Arquitetura na Vercel

```
Projeto Vercel (puc-minas-app)
├── Frontend estático (Vite → dist/)
├── API Serverless (/api/* → Vercel Functions)
│   ├── /api/health          → api/health.ts
│   ├── /api/cards           → api/cards.ts
│   ├── /api/cards/[id]      → api/cards/[id].ts
│   └── /api/auth/login      → api/auth/login.ts
└── PostgreSQL (Neon ou Supabase)
```

O painel admin (`../../painel-puc/`) deve ser deployado em **projeto Vercel separado**.

---

## Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Banco PostgreSQL na nuvem (recomendo [Neon](https://neon.tech) — 500 MB grátis)
3. CLI da Vercel instalada (opcional):
   ```bash
   npm i -g vercel
   ```

---

## Passo 1: Preparar o banco de dados na nuvem

### Opção A — Neon (recomendado)

1. Acesse [neon.tech](https://neon.tech) e crie uma conta
2. Crie um novo projeto → copie a `DATABASE_URL`
3. A URL terá este formato:
   ```
   postgres://usuario:senha@host.neon.tech/banco?sslmode=require
   ```

### Opção B — Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto → Configurações → Database
3. Copie a connection string do PostgreSQL

### Migrar dados do PostgreSQL local

Se tiver dados no banco local que quer preservar:

```bash
# Dump do banco local
pg_dump -h localhost -U seu_usuario -d nome_do_banco > backup.sql

# Restaurar no Neon/Supabase (use a URL deles)
psql "SUA_DATABASE_URL_DO_NEON" < backup.sql
```

Ou, se estiver começando do zero, o Prisma vai criar as tabelas automaticamente quando a primeira requisição chegar (desde que o schema já esteja aplicado).

---

## Passo 2: Configurar variáveis de ambiente na Vercel

No dashboard da Vercel → Project Settings → Environment Variables:

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `DATABASE_URL` | `postgres://...` (URL do Neon/Supabase) | Production, Preview, Development |

> **NÃO** defina `VITE_API_URL` — deixe vazio. As chamadas `/api/*` serão redirecionadas automaticamente para as Vercel Functions.

---

## Passo 3: Fazer deploy

### Via CLI (recomendado)

```bash
# Na pasta raiz do projeto (puc-minas--main)
vercel --prod
```

### Via Git (alternativa)

1. Suba o código para GitHub/GitLab/Bitbucket
2. No dashboard da Vercel → "Add New Project"
3. Importe o repositório
4. A Vercel vai detectar automaticamente:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** `dist`

---

## Passo 4: Testar as API routes

Após o deploy, teste os endpoints:

```bash
# Health check
curl https://SEU-PROJETO.vercel.app/api/health
# → {"ok":true}

# Listar cards
curl https://SEU-PROJETO.vercel.app/api/cards

# Login
curl -X POST https://SEU-PROJETO.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"CPF_OU_CODIGO"}'
```

---

## Passo 5: Deploy do Painel Admin

O painel admin (`../../painel-puc/`) é um projeto Next.js separado.

```bash
cd ../../painel-puc
vercel --prod
```

No dashboard do projeto do painel, configure:

| Variável | Valor |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://SEU-PROJETO.vercel.app/api` |

> Isso faz o painel admin apontar para a API do site na Vercel.

---

## Passo 6: APK / PWA

O APK é uma PWA gerada a partir do site. Para atualizar:

1. Acesse [PWA Builder](https://www.pwabuilder.com/)
2. Cole a URL pública do site: `https://SEU-PROJETO.vercel.app`
3. Baixe o pacote Android (APK/AAB)

> O Service Worker (`public/sw.js`) já está configurado com paths relativos (`/api/...`), então funcionará automaticamente na URL pública.

---

## Estrutura de arquivos criada/modificada

```
puc-minas--main/
├── api/                        ← NOVO: Vercel Serverless Functions
│   ├── _lib/
│   │   ├── cors.ts             ← CORS compartilhado
│   │   └── prisma.ts           ← Prisma Client (sem adapter pg)
│   ├── health.ts               ← GET /api/health
│   ├── cards.ts                ← GET/POST /api/cards
│   ├── cards/
│   │   └── [id].ts             ← GET/PATCH /api/cards/:id
│   └── auth/
│       └── login.ts            ← POST /api/auth/login
├── vercel.json                 ← NOVO: Configuração de rotas e build
├── .env.example                ← NOVO: Template de variáveis
├── DEPLOY.md                   ← NOVO: Este guia
├── vite.config.ts              ← MODIFICADO: usa VITE_API_URL
├── package.json                ← MODIFICADO: scripts de build + postinstall
├── tsconfig.node.json          ← MODIFICADO: inclui api/
└── server/                     ← Mantido (ainda funciona em dev local)
```

---

## Desenvolvimento local (continua funcionando)

```bash
# Terminal 1 — API local (modo antigo, ainda disponível)
npm run dev:api    # → http://localhost:3001

# Terminal 2 — Frontend Vite
npm run dev        # → http://localhost:5173 (com proxy para localhost:3001)
```

Ou, para testar como vai funcionar na Vercel:

```bash
# Build de produção
npm run build

# Preview do build estático
npm run preview
```

> Nota: `npm run preview` não roda as API routes — para testar as functions localmente use `vercel dev`.

---

## Troubleshooting

### Erro: "DATABASE_URL is not defined"
- Verifique se a variável está configurada no dashboard da Vercel (não apenas no `.env` local)

### Erro: "Prisma Client não encontrado"
- O script `postinstall` gera o client automaticamente. Se falhar, adicione `prisma generate` ao build command.

### CORS bloqueando requisições do painel admin
- As API routes já incluem headers CORS. Se o painel estiver em outro domínio, verifique se `Access-Control-Allow-Origin` está com `*`

### Uploads de imagem não aparecem
- As imagens em `public/uploads/cards/` são estáticas e vão junto no deploy. Para produção, considere usar um serviço de CDN (Cloudinary, AWS S3) ou o storage da Vercel.

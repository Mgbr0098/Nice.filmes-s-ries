# Instruções de Instalação

## Pré-requisitos

- Node.js 18+ ou Docker
- npm ou yarn

## Opção 1: Instalação Local

### 1. Clonar e instalar dependências

```bash
cd Nice.filmes-s-ries
npm install
```

### 2. Configurar API do TMDB

1. Visite: https://www.themoviedb.org/settings/api
2. Crie uma conta gratuita
3. Configure uma "Application"
4. Copie sua API Key

### 3. Criar arquivo .env.local

Na raiz do projeto, crie `.env.local`:

```env
NEXT_PUBLIC_TMDB_API_KEY=SUA_API_KEY_AQUI
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

### 4. Iniciar desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## Opção 2: Com Docker

### 1. Criar arquivo .env

```env
NEXT_PUBLIC_TMDB_API_KEY=SUA_API_KEY_AQUI
```

### 2. Executar com Docker Compose

```bash
docker-compose up
```

Acesse: http://localhost:3000

## Scripts Disponíveis

```bash
npm run dev     # Desenvolvimento
npm run build   # Build para produção
npm start       # Servidor de produção
npm run lint    # Linting
```

## Troubleshooting

### Erro: "NEXT_PUBLIC_TMDB_API_KEY não configurada"

- Verifique se o arquivo `.env.local` existe
- Confirme que a API Key está correta
- Reinicie o servidor

### Erro: "Imagens não carregando"

- Aguarde o carregamento das imagens do TMDB
- Verifique sua conexão com a internet

## Como criar uma API Key TMDB

1. Acesse: https://www.themoviedb.org/
2. Crie uma conta
3. Vá para Settings > API
4. Clique "Create" > "Developer"
5. Aceite os termos
6. Preenchaa informações da sua aplicação
7. Copie sua API Key v3 (auth)

## Estrutura do Projeto

```
app/
├── layout.tsx          # Layout raiz
├── page.tsx            # Homepage
├── globals.css         # Estilos globais
├── filmes/            # Páginas de filmes
├── series/            # Páginas de séries
├── busca/             # Página de busca
├── generos/           # Páginas de gêneros
└── api/               # API routes

components/
├── Header.tsx         # Navegação
├── Footer.tsx         # Rodapé
├── SearchBar.tsx      # Barra de busca
├── MovieCard.tsx      # Card de filme/série
└── Loading.tsx        # Loading spinner

lib/
└── tmdb.ts           # Funções da API TMDB

public/
└── (arquivos estáticos)
```

## Desenvolvimento

### Adicionar Novo Componente

Crie em `components/NomeComponente.tsx`:

```typescript
export default function NomeComponente() {
  return <div>Componente</div>
}
```

### Adicionar Nova Página

Crie em `app/nova-pagina/page.tsx`:

```typescript
export default function Page() {
  return <div>Página</div>
}
```

### Chamar API do TMDB

```typescript
import { fetchTrending, searchMovies, fetchDetails } from '@/lib/tmdb'

// Buscar trending
const movies = await fetchTrending('movies')

// Buscar por termo
const results = await searchMovies('Batman')

// Detalhes de filme
const movie = await fetchDetails(550, 'movie')
```

## Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Outras Plataformas

- Netlify
- Railway
- Render
- AWS Amplify

Todas têm suporte a Next.js.

## Suporte

Se encontrar problemas:
1. Verifique a API Key do TMDB
2. Veja se Node.js está atualizado
3. Limpe node_modules e reinstale: `rm -rf node_modules && npm install`

Divirta-se! 🎬

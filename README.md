<div align="center">

# 🌐 ConectaAPAE

**Cuidado, família e inclusão conectados em um só lugar.**

Plataforma web que integra a APAE, profissionais e famílias: acompanhamento dos assistidos, agenda multidisciplinar, comunicação segura e relatórios de progresso.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-F97316?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

</div>

---

## 💡 Sobre o projeto

O ConectaAPAE nasceu para aproximar a instituição das famílias e dos profissionais que acompanham cada assistido. Em vez de informações espalhadas, tudo fica centralizado: quem cuida, o que foi feito, o que vem a seguir e como conversar com segurança.

O sistema tem dois perfis de acesso, **família** e **profissional**, cada um com login e cadastro próprios e uma área interna adaptada ao seu papel.

## ✨ Funcionalidades

| Área | O que faz |
| --- | --- |
| 🏠 **Página inicial** | Apresenta a plataforma, seus recursos e os caminhos de entrada para famílias e profissionais |
| 👤 **Assistidos** | Lista e perfil individual de cada assistido |
| 📅 **Agenda** | Agenda multidisciplinar de atendimentos |
| 🔔 **Atualizações** | Acompanhamento do progresso e novidades de cada caso |
| 💬 **Mensagens e conversas** | Comunicação direta entre famílias e profissionais |
| 🔐 **Autenticação por papel** | Login e cadastro separados para família e profissional, com controle de acesso por função |

## 🛠️ Tecnologias

- **Front-end:** React 19, TypeScript, TanStack Start e TanStack Router
- **Interface:** Tailwind CSS 4, componentes Radix UI (shadcn/ui) e ícones Lucide
- **Formulários e validação:** React Hook Form e Zod
- **Dados e gráficos:** TanStack Query e Recharts
- **Back-end e banco:** Supabase (PostgreSQL, autenticação e migrations versionadas)
- **Build e ferramentas:** Vite, Bun, ESLint e Prettier

## 🚀 Como rodar localmente

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/)
- Um projeto no [Supabase](https://supabase.com/)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/cryyww/conectaapae.git
cd conectaapae

# 2. Instale as dependências
bun install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# edite o .env com os dados do seu projeto Supabase

# 4. Aplique as migrations (pasta supabase/migrations) no seu projeto Supabase

# 5. Inicie o servidor de desenvolvimento
bun run dev
```

### Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `SUPABASE_URL` | URL do projeto Supabase (servidor) |
| `SUPABASE_PUBLISHABLE_KEY` | Chave pública do Supabase (servidor) |
| `VITE_SUPABASE_URL` | URL do projeto Supabase (navegador) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave pública do Supabase (navegador) |
| `VITE_SUPABASE_PROJECT_ID` | ID do projeto Supabase |

### Scripts disponíveis

| Comando | Função |
| --- | --- |
| `bun run dev` | Servidor de desenvolvimento |
| `bun run build` | Build de produção |
| `bun run preview` | Pré-visualização do build |
| `bun run lint` | Análise com ESLint |
| `bun run format` | Formatação com Prettier |

## 🗂️ Estrutura

```text
src/
├── components/    # Componentes de interface e formulários
├── routes/        # Páginas (login, cadastro e área /app)
├── integrations/  # Cliente e middleware do Supabase
├── hooks/         # Hooks, como o de controle de papel
└── lib/           # Utilitários e configuração
supabase/
└── migrations/    # Estrutura do banco de dados
```

## 👤 Autor

**Gabriel Bomfim**: desenvolvedor full stack júnior e estudante de Sistemas de Informação.

[![GitHub](https://img.shields.io/badge/GitHub-cryyww-181717?style=flat-square&logo=github)](https://github.com/cryyww)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gabriel%20Bomfim-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/gabriel-bomfim-3082362b3)

## 📌 Status

🚧 Em desenvolvimento. Novas funcionalidades e melhorias de interface estão sendo implementadas.

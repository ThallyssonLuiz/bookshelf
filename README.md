# Bookshelf - Sistema de Gerenciamento de Biblioteca Pessoal

Um sistema completo para gerenciar sua biblioteca pessoal, construído com Next.js, Prisma e PostgreSQL.

## 🚀 Funcionalidades

- ✅ Cadastro de livros com informações completas
- ✅ Listagem e filtragem por título, autor e gênero
- ✅ Sistema de avaliação com estrelas
- ✅ Controle de status de leitura
- ✅ Interface responsiva e moderna
- ✅ Gerenciamento de gêneros
- ✅ Upload de capas de livros

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Validação**: Zod
- **Formulários**: React Hook Form

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd bookshelf
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   ```bash
   # Copie o arquivo de exemplo
   cp .env.example .env
   
   # Edite o arquivo .env com suas configurações do PostgreSQL
   DATABASE_URL="postgresql://username:password@localhost:5432/bookshelf?schema=public"
   ```

4. **Execute as migrações do banco**
   ```bash
   npx prisma migrate dev
   ```

5. **Popule o banco com dados iniciais (opcional)**
   ```bash
   npx prisma db seed
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

7. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
bookshelf/
├── app/
│   ├── add/                 # Página de adicionar livros
│   ├── api/                 # API Routes
│   │   ├── books/          # Endpoints de livros
│   │   └── genres/         # Endpoints de gêneros
│   ├── book/[id]/          # Página de detalhes do livro
│   ├── library/            # Página da biblioteca
│   ├── _components/        # Componentes da aplicação
│   └── types/              # Definições de tipos TypeScript
├── components/ui/          # Componentes UI (Shadcn)
├── lib/                    # Utilitários e configurações
├── prisma/                 # Schema e migrações do banco
└── public/                 # Arquivos estáticos
```

## 🔄 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npx prisma studio` - Abre o Prisma Studio para visualizar o banco
- `npx prisma migrate dev` - Executa migrações em desenvolvimento
- `npx prisma db seed` - Popula o banco com dados iniciais

## 🎯 Como Usar

1. **Adicionar um livro**: Clique em "Adicionar Livro" e preencha o formulário
2. **Visualizar biblioteca**: Acesse a página "Biblioteca" para ver todos os livros
3. **Filtrar livros**: Use os campos de busca e filtro por gênero
4. **Ver detalhes**: Clique em qualquer livro para ver informações completas
5. **Editar/Excluir**: Na página de detalhes, use os botões de ação

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências estão instaladas
2. Confirme se o PostgreSQL está rodando
3. Verifique se as variáveis de ambiente estão configuradas corretamente
4. Execute `npx prisma migrate reset` para resetar o banco se necessário

---

Desenvolvido com ❤️ usando Next.js e Prisma

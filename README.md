# BlogWeb Frontend

Este repositório contém o **frontend** da aplicação BlogWeb, implementado em Angular com Material Design, gráficos interativos e autenticação via JWT.

---

## 📋 Pré-requisitos

* Node.js (14.x ou superior)
* npm (6.x ou superior)
* Navegador moderno (Chrome, Firefox, Edge)

---

## 🚀 Tecnologias

* Angular
* Angular Material
* Chart.js
* ng2-charts
* RxJS
* TypeScript

---

## 📦 Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/igorsantos2102/blog-web-frontend.git
   cd blog-web-frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   ng serve
   ```

   O app ficará disponível em `http://localhost:4200`

---

## 🔧 Configuração

No arquivo `src/environments/environment.ts`, ajuste a URL base da API para apontar ao seu backend:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

---

## ✨ Funcionalidades Principais

* **Cadastro/Login** com armazenamento de token no `localStorage`
* **CRUD de postagens**: criar, listar, visualizar, editar e excluir
* **Comentários**: publicar e listar comentários vinculados ao usuário autenticado
* **Dashboard Analítico**: gráficos de distribuição de tags e contagem de posts
* **Validações** inline em formulários de autenticação e criação de posts

---

## 🔗 Endpoints Consumidos

| Método | Rota                     | Descrição                                   |
| ------ | ------------------------ | ------------------------------------------- |
| POST   | `/authenticate`          | Autentica usuário e recebe token JWT        |
| POST   | `/sign-up`               | Cadastra novo usuário                       |
| POST   | `/api/posts`             | Cria uma nova postagem                      |
| GET    | `/api/posts`             | Lista todas as postagens                    |
| GET    | `/api/posts/{id}`        | Detalha uma postagem                        |
| PUT    | `/api/posts/{id}`        | Atualiza uma postagem (autor autenticado)   |
| DELETE | `/api/posts/{id}`        | Exclui uma postagem (autor autenticado)     |
| POST   | `/api/comments/create`   | Publica comentário em uma postagem          |
| GET    | `/api/comments/{postId}` | Lista comentários de uma postagem           |
| GET    | `/api/posts/tag-stats`   | Obtém estatísticas de tags para o dashboard |

> Em todas as chamadas acima, envie o header:
>
> ```
> Authorization: Bearer <seu_token_jwt>
> ```

---

## 📄 Próximos Passos

* Implementar CRUD de usuários e gerenciamento de perfis
* Adicionar testes unitários e end-to-end
* Configurar integração contínua e deploy (GitHub Actions)
* Otimizar performance e acessibilidade

---

## 📫 Contato

* LinkedIn: [igor-santos](https://www.linkedin.com/in/0-igor-santos)

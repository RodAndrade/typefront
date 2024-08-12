# Typefront - Next.js Boilerplate

Este boilerplate contém uma configuração completa para projetos em Next.js, utilizando Tailwind, Shadcn UI, Prisma e outros recursos modernos.

## 💻 Pré-requisitos

Seu ambiente de desenvolvimento deve estar preparado para executar:

- ⁠[Node.js v20](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/get-docker/)

## 🛣️ Roadmap

1.⁠ ⁠*Configuração da Base*

- [x] _Next.js v14.2.5_
- [x] _Tailwind v3.4.1_
- [x] _Prisma v5.18.0_
- [x] _Postgress_
- [x] _Shadcn UI_
- [ ] _Next-i18n_

2.⁠ ⁠*Qualidade de Código*

- [x] _eslint_
- [x] _prettier_
- [x] _.editorconfig_

3.⁠ ⁠*Testes*

- [x] _Jest + Coverage_
- [x] _React Testing Library_
- [ ] _Cypress_

4.⁠ ⁠*Segurança e Cache*

- [x] _Headers_
- [x] _Build Id_

5.⁠ ⁠*CI/CD*
- [ ] Pipeline GitHub Action rodando os testes em cada PR

## 🚀 Instalando

Clone o repositório:

```git
git clone https://github.com/rodandrade/typefront-nextjs-boilerplate
```

Entre no diretório do projeto:

```shell
cd typefront-nextjs-boilerplate
```

Instale as dependências:

```shell
npm run i
```

### Env

Certifique-se de configurar o arquivo ⁠ .env ⁠ na raiz do projeto. Utilize o arquivo ⁠ .env.example ⁠ como referência.

## ☕ Usando o sistema

### Prisma

Atualiza o banco de dados conforme o schema.

```shell
npm run prisma:push
```

Atualiza os dados de tipagem dentro do Prisma Client conforme o schema.

```shell
npm run prisma:generate
```

Inicia o prisma studio.

```shell
npm run prisma:studio
```

### Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

```shell
npm run dev
```

### Produção

Para criar a build de produção:

```shell
npm run build
```

Para iniciar a aplicação em produção:

```shell
npm run start
```

### Testes

```shell
npm run test
```

> Os arquivos de coverage são gerados dentro da pasta `./coverage`

### Docker (em breve)

Se preferir rodar o projeto usando Docker:

```shell
docker
```

## 🌳 Branchs

1.⁠ ⁠*MAIN*: Commits que estão em produção.
2.⁠ ⁠*DEVELOPMENT*: Commits que estão em homologação.

## 📫 Contribuição

Para contribuir com o boilerplate, siga estas etapas:

1.⁠ ⁠Crie um branch (a partir de development): ⁠ git checkout -b <nome_branch> ⁠.
2.⁠ ⁠Faça suas alterações e confirme-as: ⁠ git commit -m '<mensagem_commit>' ⁠
3.⁠ ⁠Envie para o GitHub: ⁠ git push origin <nome_branch> ⁠
4.⁠ ⁠Crie a solicitação de pull request para development.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

[⬆ Voltar ao topo](#typefront-nextjs-boilerplate)

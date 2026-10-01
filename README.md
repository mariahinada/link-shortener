# Link Shortener

API de encurtamento de URLs desenvolvida com Node.js, Express, Prisma e PostgreSQL.

O projeto transforma uma URL longa em um link curto que, quando acessado, redireciona o usuário para a URL original.

## Como funciona

O fluxo principal da aplicação é:

```text
Cliente
   ↓
POST /shorten
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma
   ↓
PostgreSQL
```

Depois, quando alguém acessa o link curto:

```text
GET /:shortCode
   ↓
Procura o código no banco
   ↓
Código encontrado?
   ├── Não → 404
   │
   └── Sim
        ↓
   Incrementa accessCount
        ↓
   Redireciona para a URL original
        ↓
   302 Redirect
```

## Funcionalidades atuais

* Criação de links curtos
* Geração automática de códigos com 6 caracteres
* Persistência dos links no PostgreSQL
* Redirecionamento para a URL original
* Validação de URLs
* Restrição para URLs `http` e `https`
* Retorno `400` para dados de entrada inválidos
* Retorno `404` quando o short code não existe
* Contador de acessos
* Endpoint de health check
* Arquitetura separada em Routes, Controllers, Services e Repositories

## Validação de URL

A aplicação verifica se a URL fornecida possui uma estrutura válida e se utiliza o protocolo `http` ou `https`.

Exemplo válido:

```text
https://www.google.com
```

Exemplo inválido:

```text
abc
```

Quando uma URL inválida é enviada, a API retorna:

```json
{
  "error": "Invalid URL"
}
```

com status HTTP `400`.

A aplicação valida a URL, mas não verifica se a página de destino realmente existe.

Por exemplo:

```text
https://exemplo.com/pagina-que-nao-existe
```

pode ser uma URL estruturalmente válida e, portanto, ser encurtada normalmente. Se a página de destino retornar `404`, esse `404` será responsabilidade do servidor de destino.

## Contador de acessos

Cada link possui um campo `accessCount` no banco de dados.

Quando um short code existente é acessado:

```text
GET /CRqCit
```

a aplicação:

1. procura `CRqCit` no banco;
2. encontra o link;
3. incrementa `accessCount` em 1;
4. redireciona para a URL original.

Exemplo:

```text
accessCount = 0
       ↓
GET /CRqCit
       ↓
accessCount = 1
```

O incremento é realizado pelo Prisma:

```js
accessCount: {
  increment: 1
}
```

O contador representa acessos/requisições ao link curto. Ele não representa necessariamente a quantidade de usuários únicos.

## Tratamento de erros

### URL não informada

Requisição:

```http
POST /shorten
Content-Type: application/json

{}
```

Resposta:

```http
400 Bad Request
```

```json
{
  "error": "URL is required"
}
```

### URL vazia

```json
{
  "url": ""
}
```

Resposta:

```http
400 Bad Request
```

```json
{
  "error": "URL is required"
}
```

### URL inválida

```json
{
  "url": "abc"
}
```

Resposta:

```http
400 Bad Request
```

```json
{
  "error": "Invalid URL"
}
```

### Short code inexistente

```http
GET /naoexiste
```

Resposta:

```http
404 Not Found
```

```json
{
  "error": "URL not found"
}
```

### Erro interno

Erros inesperados são tratados como:

```http
500 Internal Server Error
```

```json
{
  "error": "Internal server error"
}
```

## Endpoints

### `GET /health`

Verifica se a aplicação está em execução.

Resposta:

```json
{
  "status": "ok"
}
```

### `POST /shorten`

Cria um novo link curto.

Request:

```json
{
  "url": "https://www.google.com"
}
```

Resposta:

```json
{
  "originalUrl": "https://www.google.com",
  "shortCode": "CRqCit",
  "shortUrl": "http://localhost:3000/CRqCit"
}
```

Status:

```text
201 Created
```

### `GET /:shortCode`

Acessa um link curto existente.

Exemplo:

```http
GET /CRqCit
```

Quando o código existe, a API incrementa o contador e retorna um redirecionamento:

```http
302 Found
Location: https://www.google.com
```

## Arquitetura

O projeto utiliza uma separação em camadas:

```text
src/
├── controllers/
│   └── shortenController.js
│
├── services/
│   └── linkService.js
│
├── repositories/
│   └── linkRepository.js
│
├── routes/
│   └── shortenRoutes.js
│
├── lib/
│   └── prisma.js
│
├── generated/
│   └── prisma/
│
└── server.js
```

### Routes

Define as rotas disponíveis na API e direciona cada requisição para o controller correspondente.

### Controllers

Responsáveis por receber as requisições HTTP, validar entradas básicas e construir as respostas.

### Services

Contêm as regras de negócio da aplicação, como:

* validação da URL;
* geração do short code;
* busca do link;
* incremento do contador.

### Repositories

Responsáveis pelo acesso aos dados através do Prisma.

Exemplos:

* criar link;
* buscar link pelo short code;
* incrementar o contador.

### Prisma

Faz a comunicação entre a aplicação Node.js e o PostgreSQL.

### PostgreSQL

Banco de dados responsável por armazenar os links.

## Tecnologias

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* Docker
* Nano ID
* JavaScript (ES Modules)

## Banco de dados

O projeto utiliza PostgreSQL executado através do Docker.

A tabela principal é `Link` e possui, entre outros, os campos:

```text
id
originalUrl
shortCode
accessCount
createdAt
updatedAt
```

O campo `shortCode` é único.

O campo `accessCount` começa com `0` e é incrementado a cada acesso processado pelo endpoint de redirecionamento.

## Configuração local

### Pré-requisitos

* Node.js
* Docker
* Docker Compose
* npm

### Instalação

Clone o projeto:

```bash
git clone https://github.com/mariahinada/link-shortener.git
```

Entre na pasta:

```bash
cd link-shortener
```

Instale as dependências:

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env`:

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=shorteneradmin
POSTGRES_DB=shortener
DATABASE_URL=postgresql://admin:shorteneradmin@localhost:5432/shortener
```

### Inicie o PostgreSQL

```bash
docker compose up -d
```

### Gere o Prisma Client

```bash
npx prisma generate
```

### Execute as migrations

```bash
npx prisma migrate deploy
```

### Execute a aplicação

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Testes manuais

A API pode ser testada utilizando `curl`, Postman ou outra ferramenta HTTP.

Exemplo:

```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.google.com"}'
```

Para acessar um link criado:

```bash
curl -i http://localhost:3000/CRqCit
```

O projeto possui validações manuais dos principais fluxos da API.

Testes automatizados ainda serão adicionados.

## Estado atual do projeto

Atualmente a aplicação possui o fluxo principal de encurtamento funcionando:

```text
Criar URL
   ↓
Validar URL
   ↓
Gerar short code
   ↓
Salvar no PostgreSQL
   ↓
Retornar link curto
   ↓
Acessar short code
   ↓
Incrementar contador
   ↓
Redirecionar para URL original
```

Próximos passos planejados:

* adicionar testes automatizados;
* melhorar tratamento de possíveis colisões de `shortCode`;
* revisar configuração para ambiente de produção;
* melhorar configuração da URL base utilizada na resposta `shortUrl`.
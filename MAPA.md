# Mapa do Projeto: Quem faz o quê?

Este guia explica a função de cada peça importante no projeto para você não se perder.

## Raiz do Projeto (Pastas e Arquivos de Configuração)

*   **`prisma/`**: Contém o arquivo `schema.prisma`. É aqui que você define como as tabelas do seu banco de dados se parecem. O Prisma usa isso para criar o banco para você.
*   **`docker-compose.yml`**: É o manual de instruções para o Docker. Ele diz: "Baixe o PostgreSQL e suba um banco de dados na porta 5432".
*   **`.env`**: Guarda segredos e configurações (ex: o endereço do banco de dados). **Nunca** deve ser enviado para o GitHub se tiver senhas reais.
*   **`package.json`**: Lista todas as ferramentas que o projeto usa (Express, Prisma, Nanoid) e define comandos como `npm run dev`.

## Pasta `src/` (Onde o Código Mora)

Aqui seguimos a **Arquitetura em Camadas**:

*   **`server.js`**: O ponto de partida. Ele liga o servidor e diz quais rotas o sistema deve escutar.
*   **`routes/`**: Define os endereços (URLs) da sua API. Ex: `POST /shorten` ou `GET /:shortCode`. Ele só recebe o pedido e passa para o Controller.
*   **`controllers/`**: É o "porteiro". Ele olha o que veio no pedido (`req`), vê se não falta nada e envia a resposta final (`res`) para o usuário.
*   **`services/`**: É o "cérebro". É aqui que fica a lógica de verdade. Ex: "Gere um código aleatório de 6 letras". Ele não sabe nada de HTTP ou de Banco, ele só resolve o problema.
*   **`repositories/`**: É o "especialista em banco". Só ele fala com o Prisma. Se precisarmos mudar de banco no futuro, só mexemos aqui.
*   **`lib/prisma.js`**: Configura a conexão entre o seu código JavaScript e o banco de dados.
*   **`generated/prisma/`**: Código que o próprio Prisma cria sozinho para que você tenha autocompletar e facilidade na hora de escrever as consultas ao banco.

## Tecnologias Resumidas

*   **Node.js + Express**: O motor e o chassi do seu servidor web.
*   **PostgreSQL**: Onde os dados são gravados em disco.
*   **Prisma**: A ponte entre o JavaScript e o SQL.
*   **Nanoid**: Pequena ferramenta para gerar códigos aleatórios (ex: `aB3dE1`).
*   **Docker**: Cria um ambiente isolado para o banco de dados rodar sem bagunçar seu computador.

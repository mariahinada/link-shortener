# O que é este projeto?

Este projeto é um **Encurtador de URLs**. Ele serve para transformar links longos e feios em links curtos e bonitos.

## Como funciona? (Passo a Passo)

1.  **Encurtar:** Você envia uma URL longa (ex: `https://o-site-mais-longo-do-mundo.com/página/muito/complicada`) para a nossa API.
2.  **Gerar Código:** O sistema cria um código único e curto (ex: `JahPof`).
3.  **Guardar:** O sistema salva no banco de dados: "Este código `JahPof` pertence ao link `https://o-site-mais-longo-do-mundo...`".
4.  **Redirecionar:** Quando alguém acessa `http://localhost:3000/JahPof`, o sistema olha no banco, descobre o link original e "empurra" o navegador do usuário para lá.

## As Peças do Quebra-Cabeça (Arquitetura)

Para manter tudo organizado, dividimos o código em "camadas":

*   **Routes (Rotas):** São as portas de entrada. Elas decidem qual função chamar dependendo do endereço que você acessa.
*   **Controllers (Controladores):** São os "gerentes". Eles recebem o pedido, verificam se está tudo certo e dão a resposta final.
*   **Services (Serviços):** É onde a "mágica" acontece (regras de negócio). Aqui geramos o código curto, por exemplo.
*   **Repositories (Repositórios):** São os "bibliotecários". Só eles mexem nas prateleiras do banco de dados (Prisma).
*   **Prisma/PostgreSQL:** É o baú onde as informações ficam guardadas de verdade.

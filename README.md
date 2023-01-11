# Inventory Control API

# Tecnologias utilizadas:
- NodeJs
- Typescript
- Postgres
- Knex

# Configurando o postgress

1. Instale a ultima imagem do postgress disponivel no docker `docker pull postgres`

2. Crie um container postgres executando `docker run --name database -e POSTGRES_USER=localhost -e POSTGRES_PASSWORD=localhost -p 5432:5432 -d postgres:11`.

  O comando acima cria um container postgres cujas credenciais de conexão são:
  
  DB_HOST=5432 <br />
  DB_USERNAME=localhost <br />
  DB_PASSWORD=localhost <br />

3. Acesse esse banco de dados usando um admin do postgres (como o PostBird) e crie um novo banco de dados chamado `bs_club_analytics`

4. Insira os dados de conexão no arquivo .env, como o exemplo abaixo:

  DB_HOST=localhost <br />
  DB_PORT=5432 <br />
  DB_USERNAME=localhost <br />
  DB_PASSWORD=localhost <br />
  DB_DATABASE=bs_club_analytics <br />

# Como rodar o projeto:

1. Clonar o repositório em seu computador.
2. Instalar as dependencias executando o comando `Yarn` no terminal.
3. Configure o postgres como mencionado na seção "Configurando o postgress"
4. Execute o comando `yarn migrate` para rodar as migrations e criar as tabelas no DB
5. Executar o comando `yarn:dev` para iniciar a API.
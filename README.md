# Bem vindos ao repositório do projeto TaskQuest API

Trata-se de uma ferramenta com uma API e um banco de dados para a gestão de tarefas em que será possível criar, visualizar, deletar e atualizar tarefas. 

## Configuração do Ambiente

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Passos para Configuração

1. **Clonar o Repositório**:
    ```bash
    git clone <url-do-repositorio>
    cd gerenciador-de-tarefas
    ```

2. **Instalar Dependências**:
    ```bash
    npm install
    ```

3. **Configurar o Banco de Dados**:

    1. **Criar Banco de Dados no MySQL**:
        - Conecte-se ao MySQL usando seu cliente preferido (como `mysql` no terminal ou uma ferramenta GUI como o MySQL Workbench).
        - Crie o banco de dados:
          ```sql
          CREATE DATABASE taskquest_db;
          ```

    2. **Configurar Variáveis de Ambiente**:
        - Crie um arquivo `.env` na raiz do projeto.
        - Adicione as seguintes variáveis de ambiente com suas configurações de banco de dados:
          ```plaintext
          HOST=localhost
          USER=seu_usuario
          PASSWORD=sua_senha
          DATABASE=taskquest_db
          PORT=3306
          ```

    3. **Configurar o Sequelize**:
        - Edite o arquivo `config/config.js` para utilizar as variáveis de ambiente:
          ```
            require('dotenv').config();

            const config = {
                username: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                host: process.env.HOST,
                dialect: 'mysql',
            };

            module.exports = {
                development: config,
                teste: config,
                production: config,
            };
          ```

    4. **Executar Migrações**:
        - Execute as migrações para criar as tabelas no banco de dados:
          ```bash
          npx sequelize-cli db:migrate
          ```

4. **Configurar o Biome.js**:
    - Execute o Biome para verificar o código e aplicar correções seguras:
      ```bash
      npm run biomeLint
      ```

    - Para formatar o código:
      ```bash
      npm run biomeFormat
      ```

## Scripts Disponíveis

- `npm run biomeLint`: Verifica o código e aplicar correções seguras com Biome.js.
- `npm run biomeFormat`: Formata o código com Biome.js.
- `npm start`: Inicia o servidor.




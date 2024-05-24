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

    1. **Configurar Variáveis de Ambiente**:
        - Crie um arquivo `.env` na raiz do projeto.
        - Adicione as seguintes variáveis de ambiente com suas configurações de banco de dados:
          ```plaintext
          HOST=localhost
          USER=seu_usuario
          PASSWORD=sua_senha
          DATABASE=taskquest_db
          PORT=3306
          ```

    2. **Configurar o Sequelize**:
        - Edite o arquivo `config/config.js` para utilizar as variáveis de ambiente:
          ```javascript
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

    3. **Criar Banco de Dados no MySQL**:
        - Execute o seguinte comando no terminal para criar o banco de dados usando o Sequelize:
          ```bash
          npx sequelize db:create
          ```

    4. **Executar Migrações**:
        - Execute as migrações para criar as tabelas no banco de dados:
          ```bash
          npx sequelize db:migrate
          ```

## Scripts Disponíveis

- `npm start`: Inicia o servidor.
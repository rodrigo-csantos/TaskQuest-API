# Bem vindos ao repositório do projeto TaskQuest API

Trata-se de uma ferramenta com uma API e um banco de dados para a gestão de tarefas em que será possível criar, visualizar, deletar e atualizar tarefas. 

## Configuração do Ambiente

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Passos para Configuração

1. **Clonar o Repositório**:
    ```bash
    git clone git@github.com:rodrigo-csantos/TaskQuest-API.git
    cd TaskQuest-API
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
          PORT=porta para subir o server.js
          ```

    2. **Criar Banco de Dados no MySQL**:
        - Execute o seguinte comando no terminal para criar o banco de dados usando o Sequelize:
          ```bash
          npx sequelize db:create
          ```

    3. **Executar Migrações**:
        - Execute as migrações para criar as tabelas no banco de dados:
          ```bash
          npx sequelize db:migrate
          ```

## Scripts Disponíveis

- `npm start`: Inicia o servidor.
# Bem vindos ao repositório do projeto TaskQuest API

Trata-se de uma ferramenta com uma API e um banco de dados para a gestão de tarefas em que será possível criar, visualizar, deletar e atualizar tarefas. 

## Configuração do Ambiente

### Pré-requisitos

- [Node.js](https://nodejs.org/) : Você precisará do Node.js para executar a aplicação:
    - [Tutorial de Instalação no Windows](https://www.youtube.com/watch?v=-jft_9PlffQ)
    - [Tutorial de Instalação no macOS](https://www.youtube.com/watch?v=YLO1FBIxgW4)
    - [Tutorial de Instalação no Linux](https://www.youtube.com/watch?v=B9Hd11RT7Bk)
- [MySQL](https://www.mysql.com/) : O MySQL é necessário para configurar o banco de dados:
    - [Tutorial de Instalação no Windows](https://www.youtube.com/watch?v=s0YoPLbox40)
    - [Tutorial de Instalação no macOS](https://www.youtube.com/watch?v=d32n6lWTpn0)
    - [Tutorial de Instalação no Linux](https://www.youtube.com/watch?v=MtobMajasQM)

### Passos para Configuração

1. **Clonar o Repositório**:
    ```bash
    git clone git@github.com:rodrigo-csantos/TaskQuest-API.git
    ```

2. **Entre na pasta do repositório que você acabou de clonar:**:
    ```bash
    cd TaskQuest-API
    ```

3. **Instalar Dependências**:
    ```bash
    npm install
    ```

4. **Configurar o Banco de Dados**:

    1. **Configurar Variáveis de Ambiente**:
        - Crie um arquivo `.env` na raiz do projeto.
        - Adicione as seguintes variáveis de ambiente com suas configurações de banco de dados:
          ```plaintext
          HOST=localhost
          USER=seu_usuario
          PASSWORD=sua_senha
          DATABASE=taskquest_db
          PORT=porta para subir o server.js
          JWT_SECRET=senha para assinatura do token JWT para autenticação
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
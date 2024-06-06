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


# Endpoints da aplicação 

## 1. Endpoint para Cadastro de Usuário

**Método:** `POST`  
**URL:** `http://localhost:3030/users`

**Cabeçalhos (Headers):**
- `Content-Type: application/json`

**Corpo da Requisição (JSON):**
```json
{
  "userName": "Nome_do_usuário",
  "email": "usuario@example.com",
  "password": "Senha123@",
  "idAvatar": 1
}
```
**Validação dos dados:**
- Os dados do corpo da requisição são validados usando o seguinte esquema:

`userName` (string, obrigatório): Nome do usuário. Deve ter no mínimo 3 caracteres.

`email` (string, obrigatório): Email do usuário. Deve ser um email válido.

`password` (string, obrigatório): Senha do usuário. Deve ter entre 8 e 15 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial.

`idAvatar` (integer, obrigatório): ID do avatar do usuário.

**Respostas:**

`201 Created:` Indica que o usuário foi registrado com sucesso:
```json
{
    "message": "user successfully registered"
}
```

`400 Bad request:` Indica que houve um problema com os dados fornecidos na requisição:
```json
{
    "message": "Failed to register user"
}
```

`400 Bad request:` Caso haja erros de validação:
```json
{
    "message": "Validation error",
    "details": [
        "userName is required and should have at least 3 characters",
        "email must be a valid email",
        "password must be between 8 and 15 characters long, include at least one uppercase letter, one number, and one special character",
        "idAvatar must be an integer"
    ]
}
```

`500 Internal Server Error:`  Indica que ocorreu um erro no servidor durante o processamento da requisição:
```json
{
    "message": "Internal Server Error"
}
```


## 2. Endpoint para Login

**Método:** `POST`  
**URL:** `http://localhost:3030/login`

**Cabeçalhos (Headers):**
- `Content-Type: application/json`

**Corpo da Requisição (JSON):**
```json
{
  "email": "usuario@example.com",
  "password": "Senha123@"
}

```
**Validação dos dados:**
- Os dados do corpo da requisição são validados usando o seguinte esquema:

`email` (string, obrigatório): Email do usuário. Deve ser um email válido.

`password` (string, obrigatório): Senha do usuário. Deve ter entre 8 e 15 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial.

**Respostas:**

`200 OK:` Indica que o usuário foi autenticado com sucesso e recebeu os tokens de acesso e refresh:
```json
{
    "auth": true,
    "accessToken": "seu_token_de_acesso",
    "refreshToken": "seu_refresh_token",
    "message": "user successfully logged in"
}
```

`401 Unauthorized:` Indica que os dados fornecidos estão incorretos:
```json
{
  "message": "The email or password provided is incorrect"
}
```




# Scripts Disponíveis

- `npm start`: Inicia o servidor.
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

    2. **Criar Banco de Dados no MySQL e Executar Migrações**:
        - Execute o seguinte comando no terminal para criar o banco e executar as migrações para criar as tabelas no banco de dados:
          ```bash
          npm run build:database
          ```


## Endpoints da aplicação (clique para abrir)

<details>
<summary><strong style="font-size: larger;">1. Endpoint para Cadastro de Usuário</strong></summary><br />

- Através deste endpoint será possível realizar o cadastro de novos usuários à aplicação, persistindo seus dados no banco.

<br />

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
  "type": [
    "any.required",
    "any.required",
    "any.required",
    "any.required"
  ],
  "message": [
    "\"userName\" is required",
    "\"email\" is required",
    "\"password\" is required",
    "\"idAvatar\" is required"
  ]
}
```

`500 Internal Server Error:`  Indica que ocorreu um erro no servidor durante o processamento da requisição:
```json
{
    "message": "Internal Server Error"
}
```
</details>

<details>

<summary><strong style="font-size: larger;">2. Endpoint para Login</strong></summary><br />

- Através deste endpoint será possível efetuar login para autenticação de usuário, onde, quando efetuado login com sucesso a API retornará dois tokens, o token de acesso à rotas protegidas e o refresh token para reautenticação.

<br />

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
</details>


<details>

<summary><strong style="font-size: larger;">3. Endpoint para Logout</strong></summary><br />

- Através deste endpoint será possível efetuar logout da aplicação, invalidando os tokens que foram fornecidos ao client side. Deve-se atentar de aos headers 'authorization' (onde será fornecido o accessToken) e 'x-refresh-token' (onde será fornecido o refreshToken).

<br />

**Método:** `POST`  
**URL:** `http://localhost:3030/logout`

**Cabeçalhos (Headers):**
- `Content-Type: application/json`
- `authorization: Bearer <accessToken>`
- `x-refresh-token: Bearer <refreshToken>`

<br />

**Validação dos tokens:**
- O tokens são validados seguindo o seguinte esquema:

`headers` o token de acesso deve ser passado através do header 'authorization' e o refresh token através do header 'x-refresh-token'

`validações` os tokens serão verificados nos seguintes cenários: a presença do token no cabeçalho, se a conformação está correta com a presença do 'Bearer' (`Bearer <token>`), se o token já foi invalidado e adicionado a blocklist e se está inválido ou expirado.

**Respostas:**

`200 OK:` Indica que o usuário foi deslogado com sucesso e os tokens foram invalidados:
```json
{
    "message": "user successfully logged out"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a ausência do token:
```json
{
    "message": "Token not provided"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a forma não padrão que o token foi enviado:
```json
{
    "message": "Malformed token"
}
```
`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token já invalidado na blocklist:
```json
{
    "message": "Unauthenticated user - Invalid token"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token invalido ou expirado:
```json
{
    "message": "Token expired",
    "message": "Invalid token"
}
```

`500 Internal Server Error:`  Indica que ocorreu um erro no servidor durante o processamento da requisição:
```json
{
  "message": "Internal Server Error"
}
```
</details>

<details>

<summary><strong style="font-size: larger;">4. Endpoint para Refresh Token</strong></summary><br />

- Através deste endpoint será possível que o cliente obtenha novos tokens de acesso sem precisar solicitar que o usuário faça login novamente. Irá invalidar os tokens que foram fornecidos ao client side anteriomente e conceder novos tokens de acesso e de refresh. Deve-se atentar de aos headers 'authorization' (onde será fornecido o accessToken) e 'x-refresh-token' (onde será fornecido o refreshToken).

<br />

**Método:** `POST`  
**URL:** `http://localhost:3030/refresh-login`

**Cabeçalhos (Headers):**
- `Content-Type: application/json`
- `authorization: Bearer <accessToken>`
- `x-refresh-token: Bearer <refreshToken>`

**Validação dos tokens:**
- O tokens são validados seguindo o seguinte esquema:

`headers` o token de acesso deve ser passado através do header 'authorization' e o refresh token através do header 'x-refresh-token'

`validações` os tokens serão verificados nos seguintes cenários: a presença do token no cabeçalho, se a conformação está correta com a presença do 'Bearer' (`Bearer <token>`), se o token já foi invalidado e adicionado a blocklist e se está inválido ou expirado.

**Respostas:**

`200 OK:` Indica que o tokens foiram renovados com sucesso e os anteriores foram invalidados:
```json
{
    "auth": true,
	"accessToken": "seu_token_de_acesso",
    "refreshToken": "seu_refresh_token",
	"message": "Tokens successfully refreshed",
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a ausência do token:
```json
{
    "message": "Token not provided"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a forma não padrão que o token foi enviado:
```json
{
    "message": "Malformed token"
}
```
`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token já invalidado na blocklist:
```json
{
    "message": "Unauthenticated user - Invalid token"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token invalido ou expirado:
```json
{
    "message": "Token expired",
    "message": "Invalid token"
}
```

`500 Internal Server Error:`  Indica que ocorreu um erro no servidor durante o processamento da requisição:
```json
{
  "message": "Failed to refresh tokens",
  "error": "Internal Server Error"
}
```
</details>

<details>
<summary><strong style="font-size: larger;">5. Endpoint para Listar Todas as Tarefas do Usuário</strong></summary><br />

- Através deste endpoint será possível realizar a busca de todas as tarefas atribuídas ao usuário autenticado na aplicação.

<br />

**Método:** `GET`  
**URL:** `http://localhost:3030/tasks`

**Cabeçalhos (Headers):**
- `Content-Type: application/json`
- `authorization: Bearer <accessToken>`
- `x-refresh-token: Bearer <refreshToken>`

**Validação dos tokens:**
- O tokens são validados seguindo o seguinte esquema:

`headers` o token de acesso deve ser passado através do header 'authorization' e o refresh token através do header 'x-refresh-token'

`validações` os tokens serão verificados nos seguintes cenários: a presença do token no cabeçalho, se a conformação está correta com a presença do 'Bearer' (`Bearer <token>`), se o token já foi invalidado e adicionado a blocklist e se está inválido ou expirado.

**Respostas:**

`200 OK:` Indica que a busca das tarefas associadas ao usuário autenticado foi completa com sucesso, retornando um array de objetos:
```json

[
    {
        "id": 1,
        "taskName": "Nome_da_Tarefa",
        "description": "Descrição_da_Tarefa",
        "status": "done",
        "owner": 1,
        "createdAt": "2024-06-05T21:14:42.000Z",
        "updatedAt": "2024-06-05T21:15:29.000Z"
    },
    {
        "id": 2,
        "taskName": "Nome_da_Tarefa",
        "description": "Descrição_da_Tarefa",
        "status": "todo",
        "owner": 1,
        "createdAt": "2024-06-05T21:14:49.000Z",
        "updatedAt": "2024-06-05T21:14:49.000Z"
    }
]

```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a ausência do token:
```json
{
    "message": "Token not provided"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a forma não padrão que o token foi enviado:
```json
{
    "message": "Malformed token"
}
```
`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token já invalidado na blocklist:
```json
{
    "message": "Unauthenticated user - Invalid token"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token invalido ou expirado:
```json
{
    "message": "Token expired",
    "message": "Invalid token"
}
```

`404 Not Found:` Indica que durante a busca não foram encontradas tarefas associadas a este usuário:
```json
{
    "message": "No tasks available for this user"
}
```

`500 Internal Server Error:`  Indica que ocorreu um erro no servidor durante o processamento da requisição:
```json
{
    "message": "Internal Server Error"
}
```
</details>

<details>
<summary><strong style="font-size: larger;">6. Endpoint para Criar uma Tarefa</strong></summary><br />

- Através deste endpoint será possível criar uma nova tarefa.

<br />

**Método:** `POST`  
**URL:** `http://localhost:3030/task`

**Cabeçalhos (Headers):**
- `Content-Type: application/json`
- `authorization: Bearer <accessToken>`
- `x-refresh-token: Bearer <refreshToken>`

**Corpo da Requisição (JSON):**
```json
{
    "taskName": "Título_da_tarefa",
    "description": "Descrição_da_tarefa",
    "status": "todo"
}

```

**Validação dos tokens:**
- O tokens são validados seguindo o seguinte esquema:

`headers` o token de acesso deve ser passado através do header 'authorization' e o refresh token através do header 'x-refresh-token'

`validações` os tokens serão verificados nos seguintes cenários: a presença do token no cabeçalho, se a conformação está correta com a presença do 'Bearer' (`Bearer <token>`), se o token já foi invalidado e adicionado a blocklist e se está inválido ou expirado.

**Validação dos dados:**
- Os dados do corpo da requisição são validados usando o seguinte esquema:

`taskName` (string, obrigatório): Título da tarefa, deve estar presente no corpo e ser uma string.

`description` (string, obrigatório): Descrição da tarefa, deve estar presente no corpo e ser uma string.

`status` (string, obrigatório): Status da tarefa, deve estar presente no corpo e ser uma string.

**Respostas:**

`201 Created:` Indica que a tarefa foi criada com sucesso, retornando um objeto com a nova tarefa:
```json

[
    {
        "createdAt": "2024-06-15T20:25:00.148Z",
        "updatedAt": "2024-06-15T20:25:00.149Z",
        "id": 3,
        "taskName": "Título_da_tarefa",
        "description": "Descrição_da_tarefa",
        "status": "todo",
        "owner": 1
    }
]

```

`400 Bad request:` Caso haja erros de validação:
```json
{
  "type": [
    "any.required",
    "any.required",
    "any.required"
  ],
  "message": [
    "\"taskName\" is required",
    "\"description\" is required",
    "\"status\" is required"
  ]
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a ausência do token:
```json
{
    "message": "Token not provided"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a forma não padrão que o token foi enviado:
```json
{
    "message": "Malformed token"
}
```
`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token já invalidado na blocklist:
```json
{
    "message": "Unauthenticated user - Invalid token"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token invalido ou expirado:
```json
{
    "message": "Token expired",
    "message": "Invalid token"
}
```

`404 Not Found:` Indica que ocorreu um erro durante a criação e persistência dos dados da tarefa no banco:
```json
{
    "message": "Failed to create task"
}
```

`500 Internal Server Error:`  Indica que ocorreu um erro no servidor durante o processamento da requisição:
```json
{
    "message": "Internal Server Error"
}
```
</details>

<details>
<summary><strong style="font-size: larger;">7. Endpoint para Atualizar Status de uma Tarefa</strong></summary><br />

- Através deste endpoint será possível atualizar o status de uma tarefa.

<br />

**Método:** `PUT`  
**URL:** `http://localhost:3030/task/:id`

**Cabeçalhos (Headers):**
- `Content-Type: application/json`
- `authorization: Bearer <accessToken>`
- `x-refresh-token: Bearer <refreshToken>`

**Corpo da Requisição (JSON):**
```json
{
    "status": "todo"
}

```

**Validação dos tokens:**
- O tokens são validados seguindo o seguinte esquema:

`headers` o token de acesso deve ser passado através do header 'authorization' e o refresh token através do header 'x-refresh-token'

`validações` os tokens serão verificados nos seguintes cenários: a presença do token no cabeçalho, se a conformação está correta com a presença do 'Bearer' (`Bearer <token>`), se o token já foi invalidado e adicionado a blocklist e se está inválido ou expirado.

**Validação dos dados:**
- Os dados do corpo da requisição são validados usando o seguinte esquema:

`status` (string, obrigatório): Status da tarefa, deve estar presente no corpo e ser uma string.

**Respostas:**

`200 OK:` Indica que a tarefa foi atualizada com sucesso:
```json

[
    {
        "message": "task updated successfully"
    }
]

```

`400 Bad request:` Caso haja erros de validação:
```json
{
  "type": [
    "any.required"
  ],
  "message": [
    "\"status\" is required"
  ]
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a ausência do token:
```json
{
    "message": "Token not provided"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a forma não padrão que o token foi enviado:
```json
{
    "message": "Malformed token"
}
```
`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token já invalidado na blocklist:
```json
{
    "message": "Unauthenticated user - Invalid token"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token invalido ou expirado:
```json
{
    "message": "Token expired",
    "message": "Invalid token"
}
```

`404 Not Found:` Indica que ocorreu um erro durante a atualização da tarefa, onde a tarefa passada path da url da requisição não foi encontrada:
```json
{
    "message": "task not found"
}
```

`500 Internal Server Error:`  Indica que ocorreu um erro no servidor durante o processamento da requisição:
```json
{
    "message": "Internal Server Error"
}
```
</details>

<details>
<summary><strong style="font-size: larger;">8. Endpoint para Deletar uma Tarefa</strong></summary><br />

- Através deste endpoint será possível excluir uma tarefa.

<br />

**Método:** `DELETE`  
**URL:** `http://localhost:3030/task/:id`

**Cabeçalhos (Headers):**
- `Content-Type: application/json`
- `authorization: Bearer <accessToken>`
- `x-refresh-token: Bearer <refreshToken>`

**Validação dos tokens:**
- O tokens são validados seguindo o seguinte esquema:

`headers` o token de acesso deve ser passado através do header 'authorization' e o refresh token através do header 'x-refresh-token'

`validações` os tokens serão verificados nos seguintes cenários: a presença do token no cabeçalho, se a conformação está correta com a presença do 'Bearer' (`Bearer <token>`), se o token já foi invalidado e adicionado a blocklist e se está inválido ou expirado.

**Respostas:**

`200 OK:` Indica que a tarefa foi atualizada com sucesso:
```json

[
    {
        "message": "task updated successfully"
    }
]

```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a ausência do token:
```json
{
    "message": "Token not provided"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido a forma não padrão que o token foi enviado:
```json
{
    "message": "Malformed token"
}
```
`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token já invalidado na blocklist:
```json
{
    "message": "Unauthenticated user - Invalid token"
}
```

`401 Unauthorized:` Indica que o usuário não está autenticado durante a validação devido token invalido ou expirado:
```json
{
    "message": "Token expired",
    "message": "Invalid token"
}
```

`404 Not Found:` Indica que ocorreu um erro durante a atualização da tarefa, onde a tarefa passada path da url da requisição não foi encontrada:
```json
{
    "message": "task not found"
}
```

`500 Internal Server Error:`  Indica que ocorreu um erro no servidor durante o processamento da requisição:
```json
{
    "message": "Internal Server Error"
}
```
</details>

<br />

## Scripts Disponíveis

- `npm start`: Inicia o servidor.
- `npm run build:database`: Inicia as configurações do banco de dados.
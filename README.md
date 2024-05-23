# Bem vindos ao repositório do projeto TaskQuest API

API para administrar um gerenciador de tarefas.
Trata-se de uma ferramenta com uma API e um banco de dados para a gestão de tarefas m que será possível criar, visualizar, deletar e atualizar tarefas. 

## Configuração do Ambiente

### Pré-requisitos

- Node.js
- MySQL

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
    - Edite o arquivo `config/config.json` com suas credenciais do MySQL.
    - Execute as migrações:
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




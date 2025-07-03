# TypeORM Migration Helper

![npm](https://img.shields.io/npm/v/typeorm-migration-helper?style=flat-square)
![Node.js Version](https://img.shields.io/node/v/typeorm-migration-helper?style=flat-square)
![Downloads](https://img.shields.io/npm/dt/typeorm-migration-helper)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

> [!NOTE]  
> Esta documentação está em português. [Veja a versão em inglês aqui](./README-en.md) 

Um CLI simples e poderoso para facilitar a criação, execução e reversão de migrations com TypeORM. Foco em produtividade, clareza e uma experiência de desenvolvimento amigável.

## ✨ Visão Geral

Gerenciar migrations no TypeORM pode se tornar repetitivo. O `typeorm-migration-helper` surge como uma ferramenta de linha de comando (CLI) para simplificar essas tarefas comuns, permitindo que você se concentre no que realmente importa: o código da sua aplicação.

Este helper encapsula os comandos `migration:generate`, `migration:run` e `migration:revert` do TypeORM, oferecendo uma interface mais direta e com mensagens claras.

## 🚀 Funcionalidades Principais

*   **Geração Simplificada:** Crie novas migrations com um único comando, baseado nas alterações das suas entidades.
*   **Execução Direta:** Aplique todas as migrations pendentes rapidamente.
*   **Reversão Fácil:** Desfaça a última migration aplicada com facilidade.
*   **Configuração Flexível:** Especifique caminhos personalizados para seu arquivo de DataSource e diretório de migrations.
*   **Feedback Claro:** Mensagens informativas e spinners visuais para acompanhar o progresso.

## 📦 Instalação

Instale o pacote como uma dependência de desenvolvimento no seu projeto TypeORM:

```bash
npm install --save-dev typeorm-migration-helper
# ou
yarn add --dev typeorm-migration-helper
# ou
pnpm add --save-dev typeorm-migration-helper
```

**Pré-requisitos:**

Seu projeto **precisa** ter as seguintes dependências instaladas:

*   `typeorm`: A biblioteca principal.
*   `reflect-metadata`: Requerido pelo TypeORM.
*   `ts-node`: Essencial para que o TypeORM CLI (usado internamente pelo helper) possa ler seu arquivo `data-source.ts`.
*   **Driver do seu Banco de Dados**: (ex: `pg`, `mysql2`, `sqlite3`, etc.)

Se ainda não os tiver, instale-os:

```bash
npm install --save-dev typeorm reflect-metadata ts-node <seu-driver-db>
# Exemplo com SQLite:
npm install --save-dev typeorm reflect-metadata ts-node sqlite3
```

## ⚙️ Configuração

O helper espera encontrar seu arquivo de configuração do TypeORM DataSource em `./src/config/data-source.ts` por padrão. Certifique-se de que este arquivo exporta uma instância do `DataSource`.

**Exemplo (`./src/config/data-source.ts`):**

```typescript
import "reflect-metadata";
import { DataSource } from "typeorm";
// Importe suas entidades aqui
// import { User } from '../entity/User';

export const AppDataSource = new DataSource({
    type: "sqlite", // ou "postgres", "mysql", etc.
    database: "database.sqlite", // ou configurações de conexão
    synchronize: false, // NUNCA use true em produção
    logging: false,
    entities: [], // Adicione suas entidades aqui: [User, Product, ...]
    migrations: ["src/migrations/*.ts"], // Caminho padrão para migrations
    subscribers: [],
});
```

> [!IMPORTANT]
> O array `entities` deve conter todas as suas entidades para que o comando `generate` funcione corretamente.   
> O caminho em `migrations` deve corresponder ao local onde suas migrations serão salvas (o padrão do helper é `./src/migrations`).

## 🛠️ Uso

Execute os comandos no terminal, na raiz do seu projeto.

### Gerar uma Nova Migration (`generate`)

Cria um novo arquivo de migration baseado nas diferenças entre suas entidades (definidas no `DataSource`) e o esquema atual do banco de dados.

```bash
npx typeorm-migration-helper generate <NomeDaMigration>

# ou

npx tmh generate <NomeDaMigration>
```

* `<NomeDaMigration>`: Um nome descritivo em CamelCase (ex: `CreateUserTable`, `AddEmailToUser`).

> [!NOTE]
> Se não houver alterações detectadas nas entidades, o comando informará que nenhuma migration pode ser gerada.

**Opções:**

*   `-m, --migrationsDir <dir>`: Especifica um diretório diferente para salvar as migrations (padrão: `./src/migrations`).
*   `-d, --dataSource <file>`: Especifica um caminho diferente para o arquivo DataSource (padrão: `./src/config/data-source.ts`).

```bash
# Exemplo com opções
npx typeorm-migration-helper generate AddUserRole -m ./db/migrations -d ./src/db-config.ts

# ou

npx tmh generate generate AddUserRole -m ./db/migrations -d ./src/db-config.ts
```

### Executar Migrations Pendentes (`run`)

Aplica todas as migrations que ainda não foram executadas no banco de dados.

```bash
npx typeorm-migration-helper run

# ou

npx tmh run
```

**Opções:**

*   `-d, --dataSource <file>`: Especifica um caminho diferente para o arquivo DataSource.

```bash
# Exemplo com opção
npx typeorm-migration-helper run -d ./src/db-config.ts

# ou

npx tmh run -d ./src/db-config.ts
```

### Reverter a Última Migration (`revert`)

Desfaz a última migration que foi aplicada com sucesso.

```bash
npx typeorm-migration-helper revert

# ou

npx tmh revert
```

**Opções:**

*   `-d, --dataSource <file>`: Especifica um caminho diferente para o arquivo DataSource.

```bash
# Exemplo com opção
npx typeorm-migration-helper revert -d ./src/db-config.ts

# ou

npx tmh revert -d ./src/db-config.ts
```

## 🤔 Solução de Problemas

*   **Erro `Cannot find module 'ts-node'`**: Instale `ts-node` como dependência de desenvolvimento: `npm install --save-dev ts-node`.
*   **Erro `Unable to open file: ... data-source.ts`**: Verifique se o caminho para o `DataSource` está correto (use a opção `-d` se necessário) e se o arquivo não contém erros de sintaxe TypeScript.
*   **`No changes in database schema were found` ao usar `generate`**: Certifique-se de que você definiu entidades no array `entities` do seu `DataSource` e que existem alterações nessas entidades que ainda não foram migradas.

---

## 🤝 Contribuindo

Contribuições são super bem-vindas! 🚀

Se você encontrou um bug, tem uma sugestão de melhoria ou quer adicionar uma nova funcionalidade, sinta-se à vontade para colaborar.

### Como contribuir:

1. **Dê uma olhada nas [issues abertas](https://github.com/dhDSouza/typeorm-migration-helper/issues)** — talvez você encontre algo legal pra começar.
2. **Abra uma nova issue** se quiser discutir uma ideia ou reportar um problema.
3. **Fork o repositório**, crie um branch com sua melhoria (`git checkout -b minha-feature`) e envie um **pull request**.
4. Sempre que possível, inclua testes e atualize a documentação relacionada.

## 📄 Licença

Este projeto é licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


# TypeORM Migration Helper

![npm](https://img.shields.io/npm/v/typeorm-migration-helper?style=flat-square)
![Node.js Version](https://img.shields.io/node/v/typeorm-migration-helper?style=flat-square)
![Downloads](https://img.shields.io/npm/dt/typeorm-migration-helper)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)
   
> [!NOTE]  
> This documentation is in English. [View Portuguese version here](./README.md)
   
A simple yet powerful CLI tool to simplify creating, running, and reverting TypeORM migrations. Focused on productivity, clarity, and a developer-friendly experience.  

## ✨ Overview  

Managing migrations in TypeORM can become repetitive. `typeorm-migration-helper` is a command-line tool (CLI) designed to streamline these common tasks, allowing you to focus on what really matters: your application code.  

This helper wraps TypeORM’s `migration:generate`, `migration:run`, and `migration:revert` commands, providing a more straightforward interface with clear feedback.  

## 🚀 Key Features  

*   **Simplified Generation:** Create new migrations with a single command, based on your entity changes.  
*   **Direct Execution:** Quickly apply all pending migrations.  
*   **Easy Reversion:** Undo the last applied migration effortlessly.  
*   **Flexible Configuration:** Specify custom paths for your DataSource file and migrations directory.  
*   **Clear Feedback:** Informative messages and visual spinners to track progress.  

## 📦 Installation  

Install the package as a development dependency in your TypeORM project:  

```bash  
npm install --save-dev typeorm-migration-helper  
# or  
yarn add --dev typeorm-migration-helper  
# or  
pnpm add --save-dev typeorm-migration-helper  
```  

**Prerequisites:**  

Your project **must** have the following dependencies installed:  

*   `typeorm`: The core library.  
*   `reflect-metadata`: Required by TypeORM.  
*   `ts-node`: Essential for the TypeORM CLI (used internally by the helper) to read your `data-source.ts` file.  
*   **Your Database Driver**: (e.g., `pg`, `mysql2`, `sqlite3`, etc.)  

If you don’t have them yet, install them with:  

```bash  
npm install --save-dev typeorm reflect-metadata ts-node <your-db-driver>  
# Example with SQLite:  
npm install --save-dev typeorm reflect-metadata ts-node sqlite3  
```  

## ⚙️ Configuration  

By default, the helper expects your TypeORM DataSource configuration file at `./src/config/data-source.ts`. Ensure this file exports a `DataSource` instance.  

**Example (`./src/config/data-source.ts`):**  

```typescript  
import "reflect-metadata";  
import { DataSource } from "typeorm";  
// Import your entities here  
// import { User } from '../entity/User';  

export const AppDataSource = new DataSource({  
    type: "sqlite", // or "postgres", "mysql", etc.  
    database: "database.sqlite", // or connection settings  
    synchronize: false, // NEVER use true in production  
    logging: false,  
    entities: [], // Add your entities here: [User, Product, ...]  
    migrations: ["src/migrations/*.ts"], // Default path for migrations  
    subscribers: [],  
});  
```  

> [!IMPORTANT]  
> The `entities` array must include all your entities for the `generate` command to work correctly.  
> The `migrations` path should match where your migrations will be saved (the helper’s default is `./src/migrations`).  

## 🛠️ Usage  

Run the commands in your terminal at the project root.  

### Generate a New Migration (`generate`)  

Creates a new migration file based on the differences between your entities (defined in `DataSource`) and the current database schema.  

```bash  
npx typeorm-migration-helper generate <MigrationName>  

# or  

npx tmh generate <MigrationName>  
```  

* `<MigrationName>`: A descriptive name in CamelCase (e.g., `CreateUserTable`, `AddEmailToUser`).  

> [!NOTE]  
> If no entity changes are detected, the command will notify you that no migration can be generated.  

**Options:**  

*   `-m, --migrationsDir <dir>`: Specifies a different directory to save migrations (default: `./src/migrations`).  
*   `-d, --dataSource <file>`: Specifies a different path for the DataSource file (default: `./src/config/data-source.ts`).  

```bash  
# Example with options  
npx typeorm-migration-helper generate AddUserRole -m ./db/migrations -d ./src/db-config.ts  

# or  

npx tmh generate AddUserRole -m ./db/migrations -d ./src/db-config.ts  
```  

### Run Pending Migrations (`run`)  

Applies all migrations that haven’t been executed yet.  

```bash  
npx typeorm-migration-helper run  

# or  

npx tmh run  
```  

**Options:**  

*   `-d, --dataSource <file>`: Specifies a different path for the DataSource file.  

```bash  
# Example with option  
npx typeorm-migration-helper run -d ./src/db-config.ts  

# or  

npx tmh run -d ./src/db-config.ts  
```  

### Revert the Last Migration (`revert`)  

Undoes the last successfully applied migration.  

```bash  
npx typeorm-migration-helper revert  

# or  

npx tmh revert  
```  

**Options:**  

*   `-d, --dataSource <file>`: Specifies a different path for the DataSource file.  

```bash  
# Example with option  
npx typeorm-migration-helper revert -d ./src/db-config.ts  

# or  

npx tmh revert -d ./src/db-config.ts  
```  

## 🤔 Troubleshooting  

*   **Error `Cannot find module 'ts-node'`**: Install `ts-node` as a dev dependency: `npm install --save-dev ts-node`.  
*   **Error `Unable to open file: ... data-source.ts`**: Verify the `DataSource` path (use the `-d` option if needed) and ensure the file has no TypeScript syntax errors.  
*   **`No changes in database schema were found` when using `generate`**: Ensure you’ve defined entities in your `DataSource`’s `entities` array and that there are pending changes in those entities.  

---  

## 🤝 Contributing  

Contributions are very welcome! 🚀  

If you’ve found a bug, have a suggestion, or want to add a new feature, feel free to contribute.  

### How to contribute:  

1. **Check the [open issues](https://github.com/dhDSouza/typeorm-migration-helper/issues)** — you might find something interesting to work on.  
2. **Open a new issue** if you want to discuss an idea or report a problem.  
3. **Fork the repository**, create a branch for your improvement (`git checkout -b my-feature`), and submit a **pull request**.  
4. Whenever possible, include tests and update the relevant documentation.  

## 📄 License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  

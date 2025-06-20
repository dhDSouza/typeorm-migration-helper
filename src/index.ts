#!/usr/bin/env node

import { Command } from 'commander';
import { generateMigration } from './commands/generate';
import { runMigrations } from './commands/run';
import { revertMigration } from './commands/revert';
import { logger } from './utils/logger';

const program = new Command();

program
    .name('typeorm-migration-helper (alias tmh)')
    .description('🧙 Helper CLI para gerenciar migrations no TypeORM')
    .version('1.0.2');  

const defaultMigrationsDir = './src/migrations';
const defaultDataSource = './src/config/data-source.ts';

program
    .command('generate')
    .description('Criar uma nova migration')
    .argument('<name>', 'Nome da migration')
    .option('-m, --migrationsDir <dir>', 'Diretório das migrations', defaultMigrationsDir)
    .option('-d, --dataSource <file>', 'Arquivo de configuração do datasource', defaultDataSource)
    .action((name, options) => {
        logger.info(`Gerando migration: ${name}`);
        generateMigration(name, {
            migrationsDir: options.migrationsDir,
            dataSource: options.dataSource,
        });
    });

program
    .command('run')
    .description('Executar todas as migrations pendentes')
    .option('-d, --dataSource <file>', 'Arquivo de configuração do datasource', defaultDataSource)
    .action((options) => {
        logger.info('Executando migrations...');
        runMigrations({
            migrationsDir: defaultMigrationsDir,
            dataSource: options.dataSource,
        });
    });

program
    .command('revert')
    .description('Reverter a última migration aplicada')
    .option('-d, --dataSource <file>', 'Arquivo de configuração do datasource', defaultDataSource)
    .action((options) => {
        logger.info('Revertendo última migration...');
        revertMigration({
            migrationsDir: defaultMigrationsDir,
            dataSource: options.dataSource,
        });
    });

program.parse();

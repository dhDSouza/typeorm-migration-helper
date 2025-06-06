import ora from 'ora';
import { logger } from '../utils/logger';
import { executeCommand } from '../utils/execute';
import { MigrationOptions } from '../types/options';

export function generateMigration(name: string, options: MigrationOptions) {
    const spinner = ora('Gerando migration...').start();
    const command = `npx typeorm-ts-node-commonjs migration:generate ${options.migrationsDir}/${name} -d ${options.dataSource}`;
    
    try {
        executeCommand(command);
        spinner.succeed('Migration criada com sucesso!');
        logger.success(`Migration ${name} gerada em ${options.migrationsDir}`);
    } catch (error) {
        spinner.fail('Erro ao gerar migration.');
        logger.error((error as Error).message);
    }
}
import ora from 'ora';
import { logger } from '../utils/logger';
import { executeCommand } from '../utils/execute';
import { MigrationOptions } from '../types/options';

export function runMigrations(options: MigrationOptions) {
    const spinner = ora('Executando migrations...').start();
    
    const command = `npx typeorm-ts-node-commonjs migration:run -d ${options.dataSource}`;
    
    try {
        executeCommand(command);
        spinner.succeed('Migrations executadas com sucesso!');
        logger.success('Todas as migrations foram aplicadas.');
    } catch (error) {
        spinner.fail('Erro ao executar migrations.');
        logger.error((error as Error).message);
    }
}

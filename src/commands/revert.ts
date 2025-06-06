import ora from 'ora';
import { logger } from '../utils/logger';
import { executeCommand } from '../utils/execute';
import { MigrationOptions } from '../types/options';

export function revertMigration(options: MigrationOptions) {
    
    const spinner = ora('Revertendo última migration...').start();
    const command = `npx typeorm-ts-node-commonjs migration:revert -d ${options.dataSource}`;
    
    try {
        executeCommand(command);
        spinner.succeed('Última migration revertida!');
        logger.success('Reversão concluída.');
    } catch (error) {
        spinner.fail('Erro ao reverter migration.');
        logger.error((error as Error).message);
    }
}

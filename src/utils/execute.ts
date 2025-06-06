import { execSync } from 'child_process';
import { logger } from './logger';

export function executeCommand(command: string) {
    try {
        logger.cmd(command);
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        throw new Error('Erro ao executar comando');
    }
}

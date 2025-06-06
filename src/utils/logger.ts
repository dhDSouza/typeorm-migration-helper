import chalk from 'chalk';

export const logger = {
    info: (msg: string) => console.log(chalk.blue('ℹ️ INFO:'), msg),
    success: (msg: string) => console.log(chalk.green('✅ SUCCESS:'), msg),
    warn: (msg: string) => console.log(chalk.yellow('⚠️ WARNING:'), msg),
    error: (msg: string) => console.log(chalk.red('❌ ERROR:'), msg),
    cmd: (msg: string) => console.log(chalk.magenta('💻 CMD:'), msg),
};

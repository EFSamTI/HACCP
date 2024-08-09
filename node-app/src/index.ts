import app from './app';
import { config } from './shared/infrastructure/config';
import { logger } from './shared/infrastructure/dependencies';

async function main() {
    try {
        const {url, port} = config.server;
        app.listen(port, url, () => {
            logger.info(`Server is running on port ${port} and at address ${url}`);
        });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message);
        }
    }
}

main();

import app from './app';
import { config } from './shared/infrastrucutre/config';
import { logger } from './shared/infrastrucutre/dependencies';

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

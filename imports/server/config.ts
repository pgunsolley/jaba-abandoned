import { homedir } from 'node:os';
import { join } from 'node:path';

import env from 'env-var';

export default {
    appFilesPath: env.get('APP_FILES_PATH').default(join(homedir(), '.jaba')).asString(),
    mediaPath: env.get('MEDIA_PATH').required().asString(),
};

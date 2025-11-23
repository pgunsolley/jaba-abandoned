import { join } from 'node:path';

import { createFixture, FsFixture } from 'fs-fixture';

describe('imports/server/media/thumbnails.ts', function () {
    let fixture: FsFixture;
    
    beforeEach(async function () {
        fixture = await createFixture();
        process.env.APP_FILES_PATH = await fixture.mkdir('.jaba') as string;
        // TODO: Set process.env.MEDIA_PATH, but need to access dev/files.. doesn't seem possible using the logical method... meteor?????
    });
    
    afterEach(async function () {
        await fixture.rm();
    });
    
    describe('writeFromImagePath()', async function () {
        it('should write thumbnail successfully', async function () {
            console.log(process.cwd());
        });
    });

    describe('writeFromPdfPath()', async function () {

    });
});

import { basename, join } from 'node:path';

import { fileTypeFromFile } from 'file-type';
import sharp from 'sharp';
import { fromPath as pdf2picFromPath } from 'pdf2pic';

import config from 'imports/server/config';
import { mkdirIfNotExists } from 'imports/server/fs';

// TODO: Figure out better way to handle thumnails path (need to consider access control AND testability)

let thumbnailsPath = join(config.appFilesPath, 'thumbnails');
const thumbnailWidth = 500;
const thumbnailHeight = 500;

export const setThumbnailsPath = (path: string) => thumbnailsPath = path;
export const getThumbnailsPath = () => thumbnailsPath;

export const createThumbnailsDirectoryIfNotExists = () => mkdirIfNotExists(thumbnailsPath);

export const writeFromImagePath = (filePath: string) =>
    sharp(filePath)
        .resize({
            width: thumbnailWidth,
            height: thumbnailHeight,
        })
        .toFile(join(thumbnailsPath, basename(filePath)));

export const writeFromPdfPath = (filePath: string) => 
    pdf2picFromPath(filePath, {
        density: 100,
        saveFilename: basename(filePath),
        savePath: thumbnailsPath,
        format: "png",
        width: thumbnailWidth,
        height: thumbnailHeight,
    })(1);

export const writeFromPath = async (filePath: string) => {
    const fileType = await fileTypeFromFile(filePath);

    if (fileType === undefined) {
        throw new Error(`Unable to detect file type for ${filePath}`);
    }

    switch (fileType.ext) {
        case 'jpeg':
        case 'jpg':
        case 'png':
        case 'webp':
        case 'gif':
        case 'avif':
        case 'tiff':
        case 'svg':
            return writeFromImagePath(filePath);
        case 'pdf':
            return writeFromPdfPath(filePath);
        case 'docx':

    }
};

import chokidar, { FSWatcher } from 'chokidar';
import { Stats } from 'node:fs';
import { dirname } from 'node:path';

export type OnReadyListener = () => void;
export type OnUnlinkListener = (filePath: string) => void;
export type OnAddListener = (filePath: string, stats?: Stats) => void;

export interface WatchDirProps {
    path: string;
    onReadyListener?: OnReadyListener;
    onUnlinkListener: OnUnlinkListener;
    onAddListener: OnAddListener;
}

export const watchDir = ({ path, onReadyListener, onUnlinkListener, onAddListener }: WatchDirProps): FSWatcher => {
    const listener = chokidar.watch(path, {
        ignored: (filePath: string, stats?: Stats) => Boolean(stats && stats.isDirectory() && dirname(filePath) === path),
    });

    if (onReadyListener !== undefined) {
        listener.on('ready', onReadyListener);
    }

    return listener
        .on('unlink', onUnlinkListener)
        .on('add', onAddListener);
};

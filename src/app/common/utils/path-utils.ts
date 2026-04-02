import { pathToFileURL } from 'node:url';

export class PathUtils {
    private static readonly fileProtocol: string = 'file://';

    public static createFileUrl(filePath: string): string {
        if (this.isUnixStyleAbsolutePath(filePath)) {
            const fileUrl: URL = new URL(this.fileProtocol);
            fileUrl.pathname = filePath;
            return fileUrl.toString();
        }

        const fileUrl: URL = pathToFileURL(filePath);
        return fileUrl.toString();
    }

    public static createPlayableAudioFilePath(audioFilePath: string): string {
        return PathUtils.createFileUrl(audioFilePath);
    }

    private static isUnixStyleAbsolutePath(filePath: string): boolean {
        return filePath.startsWith('/') && !filePath.startsWith('//');
    }
}

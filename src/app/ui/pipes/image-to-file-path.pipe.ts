import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../../common/application/constants';
import { PathUtils } from '../../common/utils/path-utils';

@Pipe({ name: 'imageToFilePath' })
export class ImageToFilePathPipe implements PipeTransform {
    public transform(path: string): string {
        if (path === Constants.emptyImage) {
            return path;
        }

        return PathUtils.createFileUrl(path);
    }
}

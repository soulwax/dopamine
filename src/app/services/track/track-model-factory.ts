import { Injectable } from '@angular/core';
import { ApplicationPaths } from '../../common/application/application-paths';
import { FileAccessBase } from '../../common/io/file-access.base';
import { Track } from '../../data/entities/track';
import { DateTime } from '../../common/date-time';
import { TrackFiller } from '../indexing/track-filler';
import { TrackModel } from './track-model';
import { TranslatorServiceBase } from '../translator/translator.service.base';

@Injectable()
export class TrackModelFactory {
    public constructor(
        private translatorService: TranslatorServiceBase,
        private trackFiller: TrackFiller,
        private dateTime: DateTime,
        private applicationPaths: ApplicationPaths,
        private fileAccess: FileAccessBase,
    ) {}

    public createFromTrack(track: Track, albumKeyIndex: string): TrackModel {
        return new TrackModel(track, this.dateTime, this.translatorService, albumKeyIndex, this.applicationPaths, this.fileAccess);
    }

    public async createFromFileAsync(filePath: string, albumKeyIndex: string): Promise<TrackModel> {
        const track: Track = new Track(filePath);
        const filledTrack: Track = await this.trackFiller.addFileMetadataToTrackAsync(track, true);

        return new TrackModel(
            filledTrack,
            this.dateTime,
            this.translatorService,
            albumKeyIndex,
            this.applicationPaths,
            this.fileAccess,
        );
    }
}

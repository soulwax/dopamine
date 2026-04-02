import { IMock, It, Mock } from 'typemoq';
import { ApplicationPaths } from '../../common/application/application-paths';
import { FileAccessBase } from '../../common/io/file-access.base';
import { DateTime } from '../../common/date-time';
import { Track } from '../../data/entities/track';
import { TrackFiller } from '../indexing/track-filler';
import { TranslatorServiceBase } from '../translator/translator.service.base';
import { TrackModelFactory } from './track-model-factory';

describe('TrackModelFactory', () => {
    let translatorServiceMock: IMock<TranslatorServiceBase>;
    let trackFillerMock: IMock<TrackFiller>;
    let dateTimeMock: IMock<DateTime>;
    let applicationPathsMock: IMock<ApplicationPaths>;
    let fileAccessMock: IMock<FileAccessBase>;

    beforeEach(() => {
        translatorServiceMock = Mock.ofType<TranslatorServiceBase>();
        translatorServiceMock.setup((x) => x.get('unknown-album')).returns(() => 'Unknown album');
        translatorServiceMock.setup((x) => x.get('unknown-artist')).returns(() => 'Unknown artist');
        translatorServiceMock.setup((x) => x.get('unknown-genre')).returns(() => 'Unknown genre');
        trackFillerMock = Mock.ofType<TrackFiller>();
        dateTimeMock = Mock.ofType<DateTime>();
        applicationPathsMock = Mock.ofType<ApplicationPaths>();
        fileAccessMock = Mock.ofType<FileAccessBase>();
    });

    function createFactory(): TrackModelFactory {
        return new TrackModelFactory(
            translatorServiceMock.object,
            trackFillerMock.object,
            dateTimeMock.object,
            applicationPathsMock.object,
            fileAccessMock.object,
        );
    }

    describe('createFromTrack', () => {
        it('should create a TrackModel that resolves artwork using the injected file access', () => {
            // Arrange
            const track: Track = new Track('/music/track.mp3');
            track.artworkId = 'artwork-id';
            applicationPathsMock.setup((x) => x.coverArtFullPath('artwork-id')).returns(() => '/covers/artwork-id.jpg');
            fileAccessMock.setup((x) => x.pathExists('/covers/artwork-id.jpg')).returns(() => true);
            const factory: TrackModelFactory = createFactory();

            // Act
            const trackModel = factory.createFromTrack(track, '');

            // Assert
            expect(trackModel.artworkPath).toEqual('file:///covers/artwork-id.jpg');
        });
    });

    describe('createFromFileAsync', () => {
        it('should create a TrackModel from the filled track metadata', async () => {
            // Arrange
            const filledTrack: Track = new Track('/music/track.mp3');
            filledTrack.trackTitle = 'Filled title';
            filledTrack.artworkId = 'filled-artwork-id';

            trackFillerMock
                .setup((x) => x.addFileMetadataToTrackAsync(It.is((track) => track.path === '/music/track.mp3'), true))
                .returns(() => Promise.resolve(filledTrack));
            applicationPathsMock
                .setup((x) => x.coverArtFullPath('filled-artwork-id'))
                .returns(() => '/covers/filled-artwork-id.jpg');
            fileAccessMock.setup((x) => x.pathExists('/covers/filled-artwork-id.jpg')).returns(() => true);
            const factory: TrackModelFactory = createFactory();

            // Act
            const trackModel = await factory.createFromFileAsync('/music/track.mp3', '');

            // Assert
            expect(trackModel.title).toEqual('Filled title');
            expect(trackModel.artworkPath).toEqual('file:///covers/filled-artwork-id.jpg');
        });
    });
});

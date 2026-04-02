import { Observable, Subject } from 'rxjs';
import { IMock, Mock } from 'typemoq';
import { Logger } from '../../../../../common/logger';
import { SettingsMock } from '../../../../../testing/settings-mock';
import { PlaybackStarted } from '../../../../../services/playback/playback-started';
import { PlaybackService } from '../../../../../services/playback/playback.service';
import { PlaylistServiceBase } from '../../../../../services/playlist/playlist.service.base';
import { ContextMenuOpener } from '../../../context-menu-opener';
import { MouseSelectionWatcher } from '../../../mouse-selection-watcher';
import { PlaybackIndicationServiceBase } from '../../../../../services/playback-indication/playback-indication.service.base';
import { TranslatorServiceBase } from '../../../../../services/translator/translator.service.base';
import { DialogServiceBase } from '../../../../../services/dialog/dialog.service.base';
import { DesktopBase } from '../../../../../common/io/desktop.base';
import { PlaylistTrackBrowserComponent } from './playlist-track-browser.component';

describe('PlaylistTrackBrowserComponent', () => {
    let playbackServiceMock: IMock<PlaybackService>;
    let playlistServiceMock: IMock<PlaylistServiceBase>;
    let contextMenuOpenerMock: IMock<ContextMenuOpener>;
    let mouseSelectionWatcherMock: IMock<MouseSelectionWatcher>;
    let playbackIndicationServiceMock: IMock<PlaybackIndicationServiceBase>;
    let translatorServiceMock: IMock<TranslatorServiceBase>;
    let dialogServiceMock: IMock<DialogServiceBase>;
    let desktopMock: IMock<DesktopBase>;
    let loggerMock: IMock<Logger>;
    let settingsMock: SettingsMock;

    let playbackStartedMock: Subject<PlaybackStarted>;
    let playbackStartedMock$: Observable<PlaybackStarted>;
    let playbackStoppedMock: Subject<void>;
    let playbackStoppedMock$: Observable<void>;

    beforeEach(() => {
        playbackServiceMock = Mock.ofType<PlaybackService>();
        playlistServiceMock = Mock.ofType<PlaylistServiceBase>();
        contextMenuOpenerMock = Mock.ofType<ContextMenuOpener>();
        mouseSelectionWatcherMock = Mock.ofType<MouseSelectionWatcher>();
        playbackIndicationServiceMock = Mock.ofType<PlaybackIndicationServiceBase>();
        translatorServiceMock = Mock.ofType<TranslatorServiceBase>();
        dialogServiceMock = Mock.ofType<DialogServiceBase>();
        desktopMock = Mock.ofType<DesktopBase>();
        loggerMock = Mock.ofType<Logger>();
        settingsMock = new SettingsMock();
        settingsMock.useExpandedTrackListView = false;

        playbackStartedMock = new Subject();
        playbackStartedMock$ = playbackStartedMock.asObservable();
        playbackStoppedMock = new Subject();
        playbackStoppedMock$ = playbackStoppedMock.asObservable();

        playbackServiceMock.setup((x) => x.playbackStarted$).returns(() => playbackStartedMock$);
        playbackServiceMock.setup((x) => x.playbackStopped$).returns(() => playbackStoppedMock$);
    });

    function createComponent(): PlaylistTrackBrowserComponent {
        return new PlaylistTrackBrowserComponent(
            playbackServiceMock.object,
            playlistServiceMock.object,
            contextMenuOpenerMock.object,
            mouseSelectionWatcherMock.object,
            playbackIndicationServiceMock.object,
            translatorServiceMock.object,
            dialogServiceMock.object,
            desktopMock.object,
            loggerMock.object,
            settingsMock,
        );
    }

    describe('constructor', () => {
        it('should create', () => {
            const component: PlaylistTrackBrowserComponent = createComponent();

            expect(component).toBeDefined();
        });

        it('should define useExpandedTrackListView as false', () => {
            const component: PlaylistTrackBrowserComponent = createComponent();

            expect(component.useExpandedTrackListView).toBeFalsy();
        });

        it('should define trackRowHeight as the compact row height by default', () => {
            const component: PlaylistTrackBrowserComponent = createComponent();

            expect(component.trackRowHeight).toEqual(component.compactTrackRowHeight);
        });
    });

    describe('ngOnInit', () => {
        it('should initialize useExpandedTrackListView from settings', () => {
            settingsMock.useExpandedTrackListView = true;
            const component: PlaylistTrackBrowserComponent = createComponent();

            component.ngOnInit();

            expect(component.useExpandedTrackListView).toBeTruthy();
        });
    });

    describe('toggleTrackView', () => {
        it('should toggle and persist useExpandedTrackListView', () => {
            const component: PlaylistTrackBrowserComponent = createComponent();

            component.toggleTrackView();

            expect(component.useExpandedTrackListView).toBeTruthy();
            expect(settingsMock.useExpandedTrackListView).toBeTruthy();
        });

        it('should use the expanded row height after toggling', () => {
            const component: PlaylistTrackBrowserComponent = createComponent();

            component.toggleTrackView();

            expect(component.trackRowHeight).toEqual(component.expandedTrackRowHeight);
        });
    });
});

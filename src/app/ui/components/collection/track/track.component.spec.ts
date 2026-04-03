import { IMock, Mock } from 'typemoq';
import { TrackComponent } from './track.component';
import { AppearanceServiceBase } from '../../../../services/appearance/appearance.service.base';
import { SettingsBase } from '../../../../common/settings/settings.base';
import { GuidFactory } from '../../../../common/guid.factory';

describe('TrackComponent', () => {
    let appearanceServiceMock: IMock<AppearanceServiceBase>;
    let settingsMock: IMock<SettingsBase>;
    let guidFactoryMock: IMock<GuidFactory>;
    let component: TrackComponent;

    beforeEach(() => {
        appearanceServiceMock = Mock.ofType<AppearanceServiceBase>();
        settingsMock = Mock.ofType<SettingsBase>();
        guidFactoryMock = Mock.ofType<GuidFactory>();
        guidFactoryMock.setup((x) => x.create()).returns(() => '688af0b5-8c41-4a10-9d3e-2ba13a0d918d');

        component = new TrackComponent(appearanceServiceMock.object, settingsMock.object, guidFactoryMock.object);
    });

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act

            // Assert
            expect(component).toBeDefined();
        });

        it('should declare but not define Track', () => {
            // Arrange

            // Act

            // Assert
            expect(component.track).toBeUndefined();
        });

        it('should define canShowHeader as false', () => {
            // Arrange

            // Act

            // Assert
            expect(component.canShowHeader).toBeFalsy();
        });

        it('should define useExpandedView as false', () => {
            // Arrange

            // Act

            // Assert
            expect(component.useExpandedView).toBeFalsy();
        });

        it('should define appearanceService', () => {
            // Arrange

            // Act

            // Assert
            expect(component.appearanceService).toBeDefined();
        });

        it('should define settings', () => {
            // Arrange

            // Act

            // Assert
            expect(component.settings).toBeDefined();
        });

        it('should define coverGradientId', () => {
            // Arrange

            // Act

            // Assert
            expect(component.coverGradientId).toBe('track-cover-gradient-688af0b5-8c41-4a10-9d3e-2ba13a0d918d');
        });
    });
});

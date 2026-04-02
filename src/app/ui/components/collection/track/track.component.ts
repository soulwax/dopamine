import { Component, Input } from '@angular/core';
import { TrackModel } from '../../../../services/track/track-model';
import { AppearanceServiceBase } from '../../../../services/appearance/appearance.service.base';
import { SettingsBase } from '../../../../common/settings/settings.base';
import { GuidFactory } from '../../../../common/guid.factory';

@Component({
    selector: 'app-track',
    host: { style: 'display: block' },
    templateUrl: './track.component.html',
    styleUrls: ['./track.component.scss'],
})
export class TrackComponent {
    public readonly coverGradientId: string;

    public constructor(
        public appearanceService: AppearanceServiceBase,
        public settings: SettingsBase,
        private guidFactory: GuidFactory,
    ) {
        this.coverGradientId = `track-cover-gradient-${this.guidFactory.create()}`;
    }

    @Input() public track: TrackModel;
    @Input() public canShowHeader: boolean = false;
    @Input() public useExpandedView: boolean = false;
}

import { PlaylistModel } from '../playlist/playlist-model';

export abstract class BaseDialogService {
    public abstract isInputDialogOpened: boolean;
    public abstract showConfirmationDialogAsync(dialogTitle: string, dialogText: string): Promise<boolean>;
    public abstract showInputDialogAsync(dialogTitle: string, placeHolderText: string, inputText: string): Promise<string>;
    public abstract showErrorDialog(errorText: string): void;
    public abstract showLicenseDialog(): void;
    public abstract showEditPlaylistDialog(playlist: PlaylistModel): void;
}

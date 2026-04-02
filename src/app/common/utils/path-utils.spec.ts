import { PathUtils } from './path-utils';

describe('PathUtils', () => {
    describe('createFileUrl', () => {
        it('should return a file url for a Unix-style absolute path', () => {
            // Arrange

            // Act
            const fileUrl: string = PathUtils.createFileUrl('/home/user/Music/Playlist folder/Track #1?.png');

            // Assert
            expect(fileUrl).toEqual('file:///home/user/Music/Playlist%20folder/Track%20%231%3F.png');
        });

        it('should return a file url for a Windows path', () => {
            // Arrange

            // Act
            const fileUrl: string = PathUtils.createFileUrl('c:\\Users\\User\\Music\\Playlist folder\\Track 1.png');

            // Assert
            expect(fileUrl).toEqual('file:///c:/Users/User/Music/Playlist%20folder/Track%201.png');
        });
    });
});

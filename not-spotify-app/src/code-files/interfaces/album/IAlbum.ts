import { ISimpleAlbum, ITrackList, IArtistList } from '../../interfaces';

export default interface IAlbum extends ISimpleAlbum {
  tracks: ITrackList;
  duration: string;
  popularity: number;
  artists: IArtistList;
  copyright: string;
}
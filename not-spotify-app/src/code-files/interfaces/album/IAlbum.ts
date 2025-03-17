import { ISimpleAlbum, ITrackList, IArtistList } from '../../interfaces';

export default interface IAlbum {
  primary: ISimpleAlbum;
  tracks: ITrackList;
  duration: string;
  popularity: number;
  artists: IArtistList;
  copyright: string;
}
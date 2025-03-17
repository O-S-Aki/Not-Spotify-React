import { ISimpleAlbum, IArtistList } from '../../interfaces';

export default interface ISimpleTrack {
  id: string;
  name: string;
  image: string;
  trackNumber: number;
  type: string;
  artists: IArtistList;
  album: ISimpleAlbum;
  isExplicit: boolean;
  duration: string;
  addedAt?: string | null;
}
import { ISimpleArtist } from '../../interfaces';

export default interface IArtistList {
  items: ISimpleArtist[];
  total: number;
}
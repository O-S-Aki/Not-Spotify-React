import { ISimpleArtist } from '../../interfaces';

export default interface IArtist {
  primary: ISimpleArtist;
  followers: number;
  popularity: number;
  verified: boolean;
}
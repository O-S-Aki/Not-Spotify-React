import { ISimpleArtist } from '../../interfaces';

export default interface IArtist extends ISimpleArtist {
  followers: number;
  popularity: number;
  verified: boolean;
}
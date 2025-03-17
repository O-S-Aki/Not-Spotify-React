import { ISimpleAlbum } from '../../interfaces';

export default interface IAlbumList {
  items: ISimpleAlbum[],
  total: number,
}
import { ISimplePlaylist } from '../../interfaces';

export default interface IPlaylistList {
  items: ISimplePlaylist[];
  total: number;
}

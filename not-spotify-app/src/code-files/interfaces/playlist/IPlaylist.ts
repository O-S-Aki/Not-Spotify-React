import { ISimplePlaylist, ITrackList } from '../../interfaces';


export default interface IPlaylist extends ISimplePlaylist {
  description: string;
  followers: number;
  tracks: ITrackList;
  duration: string;
}
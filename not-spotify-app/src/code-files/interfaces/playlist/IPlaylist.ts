import { ISimplePlaylist, ITrackList } from '../../interfaces';


export default interface IPlaylist {
  primary: ISimplePlaylist;
  description: string;
  followers: number;
  tracks: ITrackList;
  duration: string;
}
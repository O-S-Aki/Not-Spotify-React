import { ISimpleUser } from '../../interfaces';

export default interface ISimplePlaylist {
  id: string;
  name: string;
  image: string;
  owner: ISimpleUser;
  isPublic: boolean;
  type: string;
}
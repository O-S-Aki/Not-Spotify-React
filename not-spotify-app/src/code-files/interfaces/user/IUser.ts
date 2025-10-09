import { ISimpleUser } from '../../interfaces';

export default interface IUser extends ISimpleUser {
  followers: number;
  image: string;
}

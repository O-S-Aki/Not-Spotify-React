import { ISimpleUser } from '../../interfaces';

export default interface IUser {
  primary: ISimpleUser;
  followers: number;
  image: string;
}

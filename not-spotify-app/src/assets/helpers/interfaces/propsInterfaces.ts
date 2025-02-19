import { IUserProfile, IArtistList, ISimpleArtist } from "./interfaces";

export interface INavbarProps {
  accessToken: string | null;
  authUrl: string;
  logout: () => void;
  user: IUserProfile;
}

export interface IAccessTokenProps {
  accessToken: string | null;
}

export interface INavbarDropdownProps {
  logout: () => void;
  user: IUserProfile;
}

export interface IArtistsProps {
  artists: IArtistList;
  maxArtists: number;
}

export interface ISimpleArtistProps {
  artist: ISimpleArtist;
}

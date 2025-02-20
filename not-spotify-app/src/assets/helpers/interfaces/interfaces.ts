export interface IUserProfile {
  id: string;
  displayName: string;
  followers: number;
  image: string;
  type: string;
}

export interface ISimpleUser {
  id: string;
  displayName: string;
  type: string;
}

export interface ISimpleArtist {
  id: string;
  name: string;
  image: string | "";
  type: string;
}

export interface IArtistList {
  items: ISimpleArtist[];
  total: number;
}

export interface ISimpleAlbum {
  id: string;
  name: string;
  image: string;
  type: string;
}

export interface ISimpleTrack {
  id: string;
  name: string;
  image: string;
  trackNumber: number;
  type: string;
  artists: IArtistList;
  album: ISimpleAlbum;
}

export interface ITrackList {
  items: ISimpleTrack[];
  total: number;
}

export interface ISimplePlaylist {
  id: string;
  name: string;
  image: string;
  owner: ISimpleUser;
  isPublic: boolean;
  type: string;
}

export interface IPlaylistList {
  items: ISimplePlaylist[];
  total: number;
}
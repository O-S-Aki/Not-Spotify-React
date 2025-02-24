/* --------------- USER --------------- */
export interface IUser {
  primary: ISimpleUser;
  followers: number;
  image: string;
}

export interface ISimpleUser {
  id: string;
  displayName: string;
  type: string;
}

/* --------------- ARTIST --------------- */
export interface IArtist {
  primary: ISimpleArtist;
  followers: number;
  popularity: number;
  verified: boolean;
}

export interface ISimpleArtist {
  id: string;
  name: string;
  image: string;
  type: string;
}

export interface IArtistList {
  items: ISimpleArtist[];
  total: number;
}

/* --------------- ALBUM --------------- */
export interface IAlbum {
  primary: ISimpleAlbum;
  tracks: ITrackList;
  duration: string;
  releaseYear: string;
  popularity: number;
  artists: IArtistList;
  leadArtist: ISimpleArtist;
}

export interface ISimpleAlbum {
  id: string;
  name: string;
  image: string;
  type: string;
}

export interface IAlbumList {
  items: ISimpleAlbum[],
  total: number,
}

/* --------------- TRACK --------------- */
export interface ITrack {
  primary: ISimpleTrack;
  
}

export interface ISimpleTrack {
  id: string;
  name: string;
  image: string;
  trackNumber: number;
  type: string;
  artists: IArtistList;
  album: ISimpleAlbum;
  isExplicit: boolean;
  duration: string;
}

export interface ITrackList {
  items: ISimpleTrack[];
  total: number;
}

/* --------------- PLAYLIST --------------- */
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
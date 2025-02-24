import { IUserProfile, IArtistList, ISimpleArtist, ITrackList, ISimpleTrack, IPlaylistList, ISimplePlaylist } from "./objectInterfaces";

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

export interface ITracksProps {
  tracks: ITrackList;
  maxTracks: number;
  showHead: boolean;
  showImage: boolean;
  showAlbum: boolean; 
  showDate: boolean;
}

export interface ISimpleTrackProps {
  track: ISimpleTrack;
  index: number;
  showImage: boolean;
  showAlbum: boolean; 
  showDate: boolean;
}

export interface ITracksHeadProps {
  showAlbum: boolean; 
  showDate: boolean;
}

export interface IPlaylistsProps {
  playlists: IPlaylistList;
  maxPlaylists: number;
}

export interface ISimplePlaylistProps {
  playlist: ISimplePlaylist;
}
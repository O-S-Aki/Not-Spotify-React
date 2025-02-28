import { IUser, IArtistList, ISimpleArtist, 
  ITrackList, ISimpleTrack, IPlaylistList, 
  ISimplePlaylist, ISimpleAlbum, IAlbumList } from "./objectInterfaces";

import { ItemType } from "./enumerations";

export interface IPageProps {
  token: string | null;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface ITabbedPageProps {
  token: string | null;
  clickLink: (event: React.MouseEvent, url: string) => void;
  updateElementClasses: (element: HTMLElement | null, add: boolean, classes: string[]) => void;
}

export interface IItemsPageProps {
  token: string | null;
  itemType: ItemType;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface INavbarProps {
  token: string | null;
  authUrl: string;
  logout: () => void;
  user: IUser;
}

export interface INavbarDropdownProps {
  logout: () => void;
  user: IUser;
}

export interface IArtistsProps {
  artists: IArtistList;
  cardClass: string;
  maxArtists: number;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface ISimpleArtistProps {
  artist: ISimpleArtist;
  cardClass: string;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface ITracksProps {
  tracks: ITrackList;
  maxTracks: number;
  showHead: boolean;
  showImage: boolean;
  showAlbum: boolean; 
  showDate: boolean;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface ISimpleTrackProps {
  track: ISimpleTrack;
  index: number;
  showImage: boolean;
  showAlbum: boolean; 
  showDate: boolean;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface ITracksHeadProps {
  showAlbum: boolean; 
  showDate: boolean;
}

export interface IPlaylistsProps {
  playlists: IPlaylistList;
  maxPlaylists: number;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface ISimplePlaylistProps {
  playlist: ISimplePlaylist;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface IPopularityProps {
  score: number;
}

export interface IAlbumsProps {
  albums: IAlbumList;
  maxAlbums: number;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface ISimpleAlbumProps {
  album: ISimpleAlbum;
  clickLink: (event: React.MouseEvent, url: string) => void;
}

export interface IHeaderPanelProps {
  primary: {
    name: string;
    image: string;
    type: string;
  };
  secondary: {
    isArtist: boolean;
    id: string;
    name: string;
    image: string;
  };
  dominantColorRgb: string;
  description: string | null;
  extras: string[]; 
  clickLink: (event: React.MouseEvent, url: string) => void;
}
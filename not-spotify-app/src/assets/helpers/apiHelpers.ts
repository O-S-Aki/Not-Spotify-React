import { IArtistList, IPlaylistList, ISimpleAlbum,
  ISimpleArtist, ISimplePlaylist, ISimpleTrack, 
  ISimpleUser, ITrackList } from "./interfaces/interfaces";

// capitalizes the first leter of a string
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// maps a simple artist API response into a strongly typed object
export const mapSimpleArtist = (fetchedArtist: any): ISimpleArtist => {
  const artist: ISimpleArtist = {
    id: fetchedArtist.id,
    name: fetchedArtist.name,
    image: fetchedArtist.images?.[0]?.url || "",
    type: capitalizeFirst(fetchedArtist.type),
  };

  return artist;
}

// maps an artist list API response into a strongly typed object
export const mapArtistList = (fetchedArtists: any): IArtistList => {
  let artistList: IArtistList = {
    items: [],
    total: 0,
  };

  let list: any = fetchedArtists.items ? fetchedArtists.items : fetchedArtists;

  list.forEach((fetchedArtist: any) => {
    const artist = mapSimpleArtist(fetchedArtist);
    artistList.items.push(artist);
    artistList.total ++;
  });

  return artistList;
}

// maps a simple track API response into a strongly typed object
export const mapSimpleTrack = (fetchedTrack: any): ISimpleTrack => {
  const track: ISimpleTrack = {
    id: fetchedTrack.id,
    name: fetchedTrack.name,
    image: fetchedTrack.album?.images?.[0]?.url || "",
    trackNumber: fetchedTrack.track_number,
    artists: mapArtistList(fetchedTrack.artists),
    type: capitalizeFirst(fetchedTrack.type),
    album: mapSimpleAlbum(fetchedTrack.album),
  };

  return track;
}

// maps a track list API response into a strongly typed object
export const mapTrackList = (fetchedTracks: any): ITrackList => {
  let trackList: ITrackList = {
    items: [],
    total: 0,
  };
  
  let list: any = fetchedTracks.items ? fetchedTracks.items : fetchedTracks;

  list.forEach((fetchedTrack: any) => {
    const track = mapSimpleTrack(fetchedTrack);
    trackList.items.push(track);
    trackList.total ++;
  });

  return trackList;
}

// maps a simple album API response into a strongly typed object
export const mapSimpleAlbum = (fetchedAlbum: any): ISimpleAlbum => {
  const album: ISimpleAlbum = {
    id: fetchedAlbum.id,
    name: fetchedAlbum.name,
    image: fetchedAlbum.images?.[0]?.url || "",
    type: capitalizeFirst(fetchedAlbum.album_type),
  };
  
  return album;
}

// maps a simple user API response into a strongly typed object
export const mapSimpleUser = (fetchedUser: any): ISimpleUser => {
  const user: ISimpleUser = {
    id: fetchedUser.id,
    displayName: fetchedUser.display_name,
    type: capitalizeFirst(fetchedUser.type),
  }

  return user;
}

// maps a simple playlist API response into a strongly typed object
export const mapSImplePlaylist = (fetchedPlaylist: any): ISimplePlaylist => {
  const playlist: ISimplePlaylist = {
    id: fetchedPlaylist.id,
    name: fetchedPlaylist.name,
    image: fetchedPlaylist.images?.[0]?.url || "",
    owner: mapSimpleUser(fetchedPlaylist.owner),
    isPublic: fetchedPlaylist.public,
    type: capitalizeFirst(fetchedPlaylist.type),
  }
  
  return playlist;
}

// maps a playlist list API response into a strongly tyed object
export const mapPlaylistList = (fetchedPlaylists: any): IPlaylistList => {
  let playlistList: IPlaylistList = {
    items: [],
    total: 0,
  };
  
  let list: any = fetchedPlaylists.items ? fetchedPlaylists.items : fetchedPlaylists;

  list.forEach((fetchedPlaylist: any) => {
    const track = mapSImplePlaylist(fetchedPlaylist);
    playlistList.items.push(track);
    playlistList.total ++;
  });


  return playlistList;
}
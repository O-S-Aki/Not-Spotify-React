import { IUser, ISimpleUser,
  IArtist, ISimpleArtist, IArtistList,
  IAlbum, ISimpleAlbum, IAlbumList,
  ITrack, ISimpleTrack, ITrackList,
  IPlaylist, ISimplePlaylist, IPlaylistList } from "../interfaces";

import { capitalizeFirst, formatReleaseDate, formatAddedAtDate, 
  formatDuration, getTotalDuration, getYear } from "./miscHelpers";

/* --------------- USER --------------- */

// maps a simple user API response into a strongly typed object
export const mapSimpleUser = (fetchedUser: any): ISimpleUser => {
  const user: ISimpleUser = {
    id: fetchedUser.id,
    displayName: fetchedUser.display_name,
    type: capitalizeFirst(fetchedUser.type),
  }

  return user;
}

// maps a full user profile API response into a strongly typed object
export const mapUser = (fetchedUser: any): IUser => {
  const user: IUser = {
    id: fetchedUser.id,
    displayName: fetchedUser.display_name,
    type: capitalizeFirst(fetchedUser.type),
    followers: fetchedUser.followers?.total || 0,
    image: fetchedUser.images?.[0]?.url || "",
  }

  return user;
}

/* --------------- ARTIST --------------- */

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

// maps a full artist profile API response into a strongly typed object
export const mapArtist = (fetchedArtist: any): IArtist => {
  const artist: IArtist = {
    id: fetchedArtist.id,
    name: fetchedArtist.name,
    image: fetchedArtist.images?.[0]?.url || "",
    type: capitalizeFirst(fetchedArtist.type),
    followers: fetchedArtist.followers?.total || 0,
    popularity: fetchedArtist.popularity,
    verified: fetchedArtist.followers?.total > 100000 || false
  }

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

/* --------------- ALBUM --------------- */

// maps a simple album API response into a strongly typed object
export const mapSimpleAlbum = (fetchedAlbum: any): ISimpleAlbum => {
  const album: ISimpleAlbum = {
    id: fetchedAlbum.id,
    name: fetchedAlbum.name,
    image: fetchedAlbum.images?.[0]?.url || "",
    type: capitalizeFirst(fetchedAlbum.album_type),
    releaseYear: getYear(fetchedAlbum.release_date),
    releaseDate: formatReleaseDate(fetchedAlbum.release_date, fetchedAlbum.release_date_precision),
  };
  
  return album;
}

// maps a full album API response into a strongly typed object
export const mapAlbum = (fetchedAlbum: any): IAlbum => {
  const album: IAlbum = {
    id: fetchedAlbum.id,
    name: fetchedAlbum.name,
    image: fetchedAlbum.images?.[0]?.url || "",
    type: capitalizeFirst(fetchedAlbum.album_type),
    releaseYear: getYear(fetchedAlbum.release_date),
    releaseDate: formatReleaseDate(fetchedAlbum.release_date, fetchedAlbum.release_date_precision),
    tracks: mapTrackList(fetchedAlbum.tracks, mapSimpleAlbum(fetchedAlbum)),
    duration: getTotalDuration(fetchedAlbum.tracks),
    popularity: fetchedAlbum.popularity,
    artists: mapArtistList(fetchedAlbum.artists),
    copyright: fetchedAlbum.copyrights?.[0]?.text || ""
  };

  return album;
}

// maps an album list API response into a strongly typed object
export const mapAlbumList = (fetchedAlbums: any): IAlbumList => {
  let albumList: IAlbumList = {
    items: [],
    total: 0,
  };
  
  let list: any = fetchedAlbums.items ? fetchedAlbums.items : fetchedAlbums;

  list.forEach((fetchedAlbum: any) => {
    const track = mapSimpleAlbum(fetchedAlbum);
    albumList.items.push(track);
    albumList.total ++;
  });

  return albumList;
}

/* --------------- TRACK --------------- */

// maps a simple track API response into a strongly typed object
export const mapSimpleTrack = (fetchedTrack: any, parentAlbum?: ISimpleAlbum): ISimpleTrack => {
  const trackObj = fetchedTrack.track ? fetchedTrack.track : fetchedTrack;

  const track: ISimpleTrack = {
    id: trackObj.id,
    name: trackObj.name,
    image: trackObj.album?.images?.[0]?.url || "",
    trackNumber: trackObj.track_number,
    artists: mapArtistList(trackObj.artists),
    type: capitalizeFirst(trackObj.type),
    album: parentAlbum? parentAlbum : mapSimpleAlbum(trackObj.album),
    isExplicit: trackObj.explicit,
    duration: formatDuration(trackObj.duration_ms),
    addedAt: fetchedTrack.added_at ? formatAddedAtDate(fetchedTrack.added_at) : null
  };

  return track;
}

// maps a full track API response into a strongly typed object
export const mapTrack = (fetchedTrack: any): ITrack => {
  const track: ITrack = {
    id: fetchedTrack.id,
    name: fetchedTrack.name,
    image: fetchedTrack.album?.images?.[0]?.url || "",
    trackNumber: fetchedTrack.track_number,
    artists: mapArtistList(fetchedTrack.artists),
    type: capitalizeFirst(fetchedTrack.type),
    album: mapSimpleAlbum(fetchedTrack.album),
    isExplicit: fetchedTrack.explicit,
    duration: formatDuration(fetchedTrack.duration_ms),
    addedAt: fetchedTrack.added_at ? formatAddedAtDate(fetchedTrack.added_at) : null,
    popularity: fetchedTrack.popularity,
  };

  return track;
}

// maps a track list API response into a strongly typed object
export const mapTrackList = (fetchedTracks: any, parentAlbum?: ISimpleAlbum): ITrackList => {
  let trackList: ITrackList = {
    items: [],
    total: 0,
  };
  
  let list: any = fetchedTracks.items ? fetchedTracks.items : fetchedTracks;

  list.forEach((fetchedTrack: any) => {
    const track = parentAlbum? mapSimpleTrack(fetchedTrack, parentAlbum) : mapSimpleTrack(fetchedTrack);
    trackList.items.push(track);
    trackList.total ++;
  });

  return trackList;
}

/* --------------- PLAYLIST --------------- */

// maps a simple playlist API response into a strongly typed object
export const mapSimplePlaylist = (fetchedPlaylist: any): ISimplePlaylist => {
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

// maps a full playlist API response into a strongly typed object
export const mapPlaylist = (fetchedPlaylist: any): IPlaylist => {
  const playlist: IPlaylist = {
    id: fetchedPlaylist.id,
    name: fetchedPlaylist.name,
    image: fetchedPlaylist.images?.[0]?.url || "",
    owner: mapSimpleUser(fetchedPlaylist.owner),
    isPublic: fetchedPlaylist.public,
    type: capitalizeFirst(fetchedPlaylist.type),
    description: fetchedPlaylist.description || "",
    followers: fetchedPlaylist.followers?.total || 0,
    tracks: mapTrackList(fetchedPlaylist.tracks),
    duration: getTotalDuration(fetchedPlaylist.tracks)
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
    const track = mapSimplePlaylist(fetchedPlaylist);
    playlistList.items.push(track);
    playlistList.total ++;
  });

  return playlistList;
}

/* --------------- SHARED --------------- */


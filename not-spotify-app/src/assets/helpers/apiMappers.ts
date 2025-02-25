import { IUser, ISimpleUser } from "./interfaces/objectInterfaces";
import { IArtist, ISimpleArtist, IArtistList } from "./interfaces/objectInterfaces";
import { IAlbum, ISimpleAlbum, IAlbumList } from "./interfaces/objectInterfaces";
import { ITrack, ISimpleTrack, ITrackList } from "./interfaces/objectInterfaces";
import { IPlaylist, ISimplePlaylist, IPlaylistList } from "./interfaces/objectInterfaces";


/* --------------- USER --------------- */

// maps a full user profile API response into a strongly typed object
export const mapUser = (fetchedUser: any): IUser => {
  const user: IUser = {
    primary: mapSimpleUser(fetchedUser),
    followers: fetchedUser.followers?.total || 0,
    image: fetchedUser.images?.[0]?.url || "",
  }

  return user;
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

/* --------------- ARTIST --------------- */

// maps a full artist profile API response into a strongly typed object
export const mapArtist = (fetchedArtist: any): IArtist => {
  const artist: IArtist = {
    primary: mapSimpleArtist(fetchedArtist),
    followers: fetchedArtist.followers?.total || 0,
    popularity: fetchedArtist.popularity,
    verified: fetchedArtist.followers?.total > 100000 || false
  }

  return artist;
}

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

/* --------------- ALBUM --------------- */

// maps a full album API response into a strongly typed object
export const mapAlbum = (fetchedAlbum: any): IAlbum => {
  const album: IAlbum = {
    primary: mapSimpleAlbum(fetchedAlbum),
    tracks: mapTrackList(fetchedAlbum.tracks),
    duration: getTotalDuration(fetchedAlbum.tracks),
    popularity: fetchedAlbum.popularity,
    artists: mapArtistList(fetchedAlbum.artist),
    copyright: fetchedAlbum.copyrights?.[0]?.text || ""
  };

  return album;
}

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

// maps a full track API response into a strongly typed object
export const mapTrack = (fetchedTrack: any): ITrack => {
  const track: ITrack = {
    primary: mapSimpleTrack(fetchedTrack),
    popularity: fetchedTrack.popularity,
  };

  return track;
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
    isExplicit: fetchedTrack.explicit,
    duration: formatDuration(fetchedTrack.duration_ms),
    addedAt: fetchedTrack.addedAt || "",
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

/* --------------- PLAYLIST --------------- */

export const mapPlaylist = (fetchedPlaylist: any): IPlaylist => {
  const playlist: IPlaylist = {
    primary: mapSimplePlaylist(fetchedPlaylist),
    description: fetchedPlaylist.description || "",
    followers: fetchedPlaylist.followers?.total || 0,
    tracks: mapTrackList(fetchedPlaylist.tracks),
    duration: getTotalDuration(fetchedPlaylist.tracks),
  }

  return playlist;
}

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

// capitalizes the first leter of a string
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// formats a millisecond duration into m:ss or h:mm:ss format
export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}:${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
}

// gets the combined duration of a list of tracks
export const getTotalDuration = (tracks: any): string => {
  let list: any = tracks.items ? tracks.items : tracks;
  let totalDuration = 0;

  for (let track of list) {
    totalDuration += track.duration_ms ? track.duration_ms : 0;
  }
  
  return formatDuration(totalDuration);
}

// formats a release date depending on its precision
export const formatReleaseDate = (releaseDate: string, precision: "year" | "month" | "day"): string => {
  const date = new Date(releaseDate);

  if (precision === "year") {
    return getYear(releaseDate);
  }

  if (precision === "month") {
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(date);
  }

  if (precision === "day") {
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(date);
  }

  return releaseDate;
};

// gets the year from a date
export const getYear = (dateString: string): string => {
  return dateString.slice(0, 4);
}

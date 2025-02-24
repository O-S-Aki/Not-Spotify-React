import { IUser, ISimpleUser, IArtist } from "./interfaces/objectInterfaces";
import { ISimpleArtist, IArtistList } from "./interfaces/objectInterfaces";
import { ISimpleAlbum } from "./interfaces/objectInterfaces";
import { ISimpleTrack, ITrackList } from "./interfaces/objectInterfaces";
import { ISimplePlaylist, IPlaylistList } from "./interfaces/objectInterfaces";


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

/* --------------- TRACK --------------- */

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
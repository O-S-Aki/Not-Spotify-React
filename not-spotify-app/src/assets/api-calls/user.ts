import { getCredentials } from "../helpers/authenticator";
import { mapArtistList, mapPlaylistList, mapTrackList, mapUser } from "../helpers/apiMappers";
import { IArtistList, IPlaylistList, ITrackList, IUser } from "../helpers/interfaces/objectInterfaces";

import { makeGetRequest } from "./defaults";
import { getTotal } from "../helpers/miscHelpers";

const baseUrl = getCredentials().BaseUrl;

/* --------------- PROFILE --------------- */

// gets the currently logged in user's profile
export const getUserProfile = async (accessToken: string) => {
  try {
    const url = `${baseUrl}/me`;

    const response = await makeGetRequest(url, accessToken);
    const fetchedUser = response.data;

    const userProfile: IUser = mapUser(fetchedUser)
    return userProfile;
  }
  catch (error) {
    console.error("Error fetching user profile: ", error);
    return null;
  }
};

// gets a user's profile
export const getUser = async (accessToken: string, id: string) => {
  try {
    const url = `${baseUrl}/users/${id}`;

    const response = await makeGetRequest(url, accessToken);
    const fetchedUser = response.data;

    const userProfile: IUser = mapUser(fetchedUser)
    return userProfile;
  }
  catch (error) {
    console.error("Error fetching user profile: ", error);
    return null;
  }
}

/* --------------- TOP ARTISTS --------------- */

// gets the currently logged in user's top artists
export const getTopArtists = async (accessToken: string, limit?: number | null) => {
  try {
    const timeRange = 'short_term';
    const params = new URLSearchParams();
    params.append("time_range", timeRange);
    if (limit) {
      params.append("limit", limit.toString());
    }

    const url = `${baseUrl}/me/top/artists?${params.toString()}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedArtists = response.data;

    const artistList: IArtistList = mapArtistList(fetchedArtists);
    return artistList;
  }
  catch (error) {
    console.error("Error fetching user's top artists: ", error);
    return null;
  }
}

// gets all of the currently logged in user's top artists
export const getAllTopArtists = async (accessToken: string) => {
  try {
    const limit = getTotal(await getTopArtists(accessToken));
    return await getTopArtists(accessToken, limit);
  }
  catch (error) {
    console.error("Error fetching all top artists: ", error);
    return null;
  }
}


/* --------------- TOP TRACKS --------------- */

// gets the currently logged in user's top tracks
export const getTopTracks = async (accessToken: string, limit?: number | null) => {
  try {
    const timeRange = 'short_term';
    const params = new URLSearchParams();
    params.append("time_range", timeRange);
    if (limit) {
      params.append("limit", limit.toString());
    }

    const url = `${baseUrl}/me/top/tracks?${params.toString()}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedTracks = response.data;

    const trackList: ITrackList = mapTrackList(fetchedTracks);
    return trackList;
  }
  catch (error) {
    console.error("Error fetching user's top tracks: ", error);
    return null;
  }
}

// gets all of the currently logged in user's top tracks
export const getAllTopTracks = async (accessToken: string) => {
  try {
    const limit = getTotal(await getTopTracks(accessToken));
    return await getTopTracks(accessToken, limit);
  }
  catch (error) {
    console.error("Error fetching all top tracks: ", error);
    return null;
  }
}

/* --------------- PUBLIC PLAYLISTS --------------- */

// gets the currently logged in user's public playlists
export const getPublicPlaylists = async (accessToken: string, userId: string, limit?: number | null) => {
  try {
    const params = new URLSearchParams();
    if (limit) {
      params.append("limit", limit.toString());
    }

    const url = `${baseUrl}/me/playlists?${params.toString()}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedPlaylists = response.data;

    const playlistList: IPlaylistList = mapPlaylistList(fetchedPlaylists);
    const filtered = playlistList.items.filter(playlist =>
      playlist.isPublic && playlist.owner.id === userId);

    const publicPlaylists: IPlaylistList = {
      items: filtered,
      total: filtered.length,
    };    

    return publicPlaylists;
  }
  catch (error) {
    console.error("Error fetching user's public playlists: ", error);
    return null;
  }
}

// gets all of the currently logged in user's public playlists
export const getAllPublicPlaylists = async (accessToken: string, userId: string) => {
  try {
    const limit = getTotal(await getPublicPlaylists(accessToken, userId));
    return await getPublicPlaylists(accessToken, userId, limit);
  }
  catch (error) {
    console.error("Error fetching all public playlists: ", error);
    return null;
  }
}

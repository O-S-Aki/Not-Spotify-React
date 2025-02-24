import { getCredentials } from "../helpers/authenticator";
import { capitalizeFirst, mapArtistList, mapPlaylistList, mapTrackList, mapUser } from "../helpers/apiMappers";
import { IArtistList, IPlaylistList, ITrackList, IUser } from "../helpers/interfaces/objectInterfaces";

import { makeGetRequest } from "./defaults";

const baseUrl = getCredentials().BaseUrl;

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

// gets the currently logged in user's top artists
export const getTopArtists = async (accessToken: string) => {
  try {
    const timeRange = 'short_term';
    const params = new URLSearchParams();
    params.append("time_range", timeRange);

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

// gets the currently logged in user's top tracks
export const getTopTracks = async (accessToken: string) => {
  try {
    const timeRange = 'short_term';
    const params = new URLSearchParams();
    params.append("time_range", timeRange);

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

// gets the currently logged in user's public playlists
export const getPublicPlaylists = async (accessToken: string, userId: string) => {
  try {
    const url = `${baseUrl}/me/playlists`;
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
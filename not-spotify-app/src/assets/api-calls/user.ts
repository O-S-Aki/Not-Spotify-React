import axios from "axios";
import { getCredentials } from "../helpers/authenticator";
import { capitalizeFirst, mapArtistList } from "../helpers/apiHelpers";
import { IArtistList, ISimpleArtist, ITrackList, IUserProfile } from "../helpers/interfaces/interfaces";

import { makeGetRequest } from "./defaults";

const baseUrl = getCredentials().BaseUrl;

// gets the currently logged in user's profile
export const getUserProfile = async (accessToken: string) => {
  try {
    const url = `${baseUrl}/me`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedUser = response.data;

    const userProfile: IUserProfile = {
      id: fetchedUser.id,
      displayName: fetchedUser.display_name,
      followers: fetchedUser.followers.total || 0,
      image: fetchedUser.images[0].url || "",
      type: capitalizeFirst(fetchedUser.type),
    }

    return userProfile;

  } catch (error) {
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

  } catch (error) {
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

    console.log(fetchedTracks);

    let trackList: ITrackList = {
      items: [],
      total: 0,
    }

    fetchedTracks.items.forEach((fetchedTrack: any) => {
      let artistList
    });
  }
  catch (error) {
    console.error("Error fetching user's top tracks: ", error);
  }
}
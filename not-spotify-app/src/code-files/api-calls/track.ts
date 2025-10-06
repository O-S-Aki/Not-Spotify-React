import { getCredentials } from "../helpers/authenticator";
import { mapTrack, mapTrackList } from "../helpers/apiMappers";

import { IPlaylistTracks, ISimpleTrack, ITrack, ITrackList } from "../interfaces";

import { makeGetRequest, getLikedStatuses, makePutRequest, makeDeleteRequest } from "./sharedRequests";
import { getTotalDuration, getTimeStamp } from "../helpers/miscHelpers";

const baseUrl = getCredentials().BaseUrl;

// getting the full details of a track
export const getTrackDetails = async (accessToken: string, id: string) => {
  try {
    const url = `${baseUrl}/tracks/${id}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedTrack = response.data;

    const track: ITrack = mapTrack(fetchedTrack);
    track.liked = (await checkTracksAreLiked(accessToken, [track.id]))[0];

    return track;
  }
  catch (error) {
    console.error("Error fetching track: ", error);
    return null;
  }
}

// getting the full track details of a list of track ids
export const getTrackList = async (accessToken: string, ids: string[]) => {
  try {
    let params = new URLSearchParams();
    params.append("ids", ids.join(','));

    const url = `${baseUrl}/tracks?${params.toString()}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedTracks = response.data;

    const tracks: ITrackList = mapTrackList(fetchedTracks.tracks);

    const duration: string = getTotalDuration(fetchedTracks.tracks);
    tracks.items = await getLikedStatuses(tracks.items, accessToken);

    return {tracks, duration};
  }
  catch (error) {
    console.error("Error fetching track list: ", error);
    return null;
  }
}

// checking the liked statuses of a list of tracks (batch requests as the maximum number of ids is 50)
export const checkTracksAreLiked = async (accessToken: string, ids: string[]) => {
  const likedResults: (boolean)[] = [];

  for (let i = 0; i < ids.length; i += 50) {
    const idBatch: string[] = ids.slice(i, i + 50);

    try {
      const url = `${baseUrl}/me/tracks/contains?ids=${idBatch.join(",")}`;
      const response = await makeGetRequest(url, accessToken);

      const fetchedLikedResults: boolean[] = response.data;
      likedResults.push(...fetchedLikedResults);
    }
    catch (error) {
      console.error("Error checking liked status: ", error);
    }
  }

  return likedResults;
}

// saving a number of tracks to the current user's liked songs
export const saveTracksToLiked = async (accessToken: string, ids: string[]) => {
  let response;

  for (let i = 0; i < ids.length; i += 50) {
    const idBatch: string[] = ids.slice(i, i + 50);

    try {
      const url = `${baseUrl}/me/tracks?ids=${idBatch.join(",")}`;
      response = await makePutRequest(url, null, accessToken);
    }
    catch (error) {
      console.error("Error saving track(s) to liked: ", error);
    }
  }

  return response?.status == 200;
}

// removing a number of tracks from the current user's liked songs
export const removeTracksFromLiked = async (accessToken: string, ids: string[]) => {
  let response;

  for (let i = 0; i < ids.length; i += 50) {
    const idBatch: string[] = ids.slice(i, i + 50);

    try {
      const url = `${baseUrl}/me/tracks?ids=${idBatch.join(",")}`;
      response = await makeDeleteRequest(url, null, accessToken);
    }
    catch (error) {
      console.error("Error removing track(s) from liked: ", error);
    }
  }

  return response?.status == 200;
}
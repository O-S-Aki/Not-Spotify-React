import { getCredentials } from "../helpers/authenticator";
import { mapTrack, mapTrackList } from "../helpers/apiMappers";

import { IPlaylistTracks, ITrack, ITrackList } from "../interfaces";

import { makeGetRequest } from "./defaults";
import { getTotalDuration } from "../helpers/miscHelpers";

const baseUrl = getCredentials().BaseUrl;

// getting the full details of a track
export const getTrackDetails = async (accessToken: string, id: string) => {
  try {
    const url = `${baseUrl}/tracks/${id}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedTrack = response.data;

    const track: ITrack = mapTrack(fetchedTrack);
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

    return {tracks, duration};
  }
  catch (error) {
    console.error("Error fetching track list: ", error);
    return null;
  }
}

export const isLiked = async (id: string) => {
  try {

  }
  catch (error) {
    console.error("Error checking track's liked status: ", error)
  }
}
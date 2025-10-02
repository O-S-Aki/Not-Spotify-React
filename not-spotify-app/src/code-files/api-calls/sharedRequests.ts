import axios from "axios";
import { ISimpleTrack } from "../interfaces";
import { checkTracksAreLiked } from "./track";

// making a standard GET request
export const makeGetRequest = async (requestUrl: string, accessToken: string) => {
  const response = await axios.get(requestUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  })

  return response;
}

// adding the liked status to each track in a track list
export const getLikedStatuses = async(tracks: ISimpleTrack[], accessToken: string) => {
  const ids: string[] = tracks.map(track => track.id);
  const likedStatuses: boolean[] = await checkTracksAreLiked(accessToken, ids);

  const updatedTracks: ISimpleTrack[] = tracks.map((track, index) => ({
    ...track,
    liked: likedStatuses[index]
  }))

  return updatedTracks;
}


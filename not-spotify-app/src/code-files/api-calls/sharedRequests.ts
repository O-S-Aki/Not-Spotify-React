import axios, { AxiosRequestConfig } from "axios";
import { ISimpleTrack } from "../interfaces";
import { checkTracksAreLiked } from "./track";

// making a standard GET request
export const makeGetRequest = async (requestUrl: string, accessToken: string) => {
  try {
    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    return response;
  }
  catch (error) {
    console.error("GET request failed: ", error);
    throw error;
  }
}

// making a standard PUT request
export const makePutRequest = async (requestUrl: string, requestBody: any | null = null, accessToken: string) => {
  try {
    const response = await axios.put(requestUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    return response;
  }
  catch (error) {
    console.error("PUT request failed: ", error);
    throw error;
  }
}

// making a standard delete request
export const makeDeleteRequest = async (requestUrl: string, requestBody: any | null = null, accessToken: string) => {
  try {
    const response = await axios.delete(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        source: `${requestBody}`
      },
    })

    return response;
  }
  catch (error) {
    console.error("DELETE request failed: ", error);
    throw error;
  }
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
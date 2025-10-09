import { getCredentials } from "../helpers/authenticator";
import { mapAlbum } from "../helpers/apiMappers";

import { IAlbum } from "../interfaces";

import { makeGetRequest, getLikedStatuses } from "./sharedRequests";

const baseUrl = getCredentials().BaseUrl;

// getting the full details of an album
export const getAlbumDetails = async (accessToken: string, id: string) => {
  try {
    const url = `${baseUrl}/albums/${id}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedAlbum = response.data;

    const album: IAlbum = mapAlbum(fetchedAlbum);
    album.tracks.items = await getLikedStatuses(album.tracks.items, accessToken);

    return album;
  }
  catch (error) {
    console.error("Error fetching album: ", error);
    return null;
  }
}
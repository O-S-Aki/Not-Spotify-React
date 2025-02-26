import { getCredentials } from "../helpers/authenticator";
import { mapPlaylist, mapTrack } from "../helpers/apiMappers";

import { IPlaylist } from "../helpers/interfaces/objectInterfaces";

import { makeGetRequest } from "./defaults";

const baseUrl = getCredentials().BaseUrl;

// getting the full details of a playlist
export const getPlpaylistDetails = async (accessToken: string, id: string) => {
  try {
    const url = `${baseUrl}/playlists/${id}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedPlaylist = response.data;

    const playlist: IPlaylist = mapPlaylist(fetchedPlaylist);
    return playlist;
  }
  catch (error) {
    console.error("Error fetching playlist: ", error);
    return null;
  }
}
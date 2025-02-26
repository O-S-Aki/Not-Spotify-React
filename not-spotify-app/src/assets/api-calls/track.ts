import { getCredentials } from "../helpers/authenticator";
import { mapTrack } from "../helpers/apiMappers";

import { ITrack } from "../helpers/interfaces/objectInterfaces";

import { makeGetRequest } from "./defaults";

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
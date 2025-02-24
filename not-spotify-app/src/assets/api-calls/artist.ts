import { getCredentials } from "../helpers/authenticator";

import { makeGetRequest } from "./defaults";

const baseUrl = getCredentials().BaseUrl;

// getting an artist's full profile details
export const getArtistProfile = async (accessToken: string, id: string) => {
  try {

  } catch (error) {
    console.error("Error fetching artist profile: ", error);
    return null;
  }
}


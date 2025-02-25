import { getCredentials } from "../helpers/authenticator";

import { makeGetRequest } from "./defaults";

const baseUrl = getCredentials().BaseUrl;

// getting an artist's full profile details
export const getArtistProfile = async (accessToken: string, id: string) => {
  try {

  }
  catch (error) {
    console.error("Error fetching artist profile: ", error);
    return null;
  }
}

// getting an artist's top tracks for a specific locale
export const getPopularTracks = async (accessToken: string, id: string) => {
  try {

  }
  catch (error) {
    console.error("Error fetching artist's popular tracks: ", error);
    return null;
  }
}

// getting an artist's full discography
export const getFullDiscography = async (accessToken: string, id: string) => {
  try {

  }
  catch (error) {
    console.error("Error fetching artist's discography: ", error);
    return null;
  }
}

// getting an artist's albums
export const getAlbums = async (accessToken: string, id: string) => {
  try {

  }
  catch (error) {
    console.error("Error fetching artist's albums: ", error);
    return null;
  }
}

// getting an artist's singles
export const getSingles = async (accessToken: string, id: string) => {
  try {

  }
  catch (error) {
    console.error("Error fetching artist's singles: ", error);
    return null;
  }
}

const makeArtistAlbumRequest = async (accessToken: string, id: string, include?: string) => {

}
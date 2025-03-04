import { getCredentials } from "../helpers/authenticator";
import { mapAlbumList, mapArtist, mapArtistList, mapTrackList } from "../helpers/apiMappers";

import { IAlbumList, IArtist, IArtistList, ITrackList } from "../helpers/interfaces/objectInterfaces";

import { makeGetRequest } from "./defaults";

const baseUrl = getCredentials().BaseUrl;

// getting an artist's full profile details
export const getArtistProfile = async (accessToken: string, id: string) => {
  try {
    const url = `${baseUrl}/artists/${id}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedArtist = response.data;

    const artist: IArtist = mapArtist(fetchedArtist);
    return artist;
  }
  catch (error) {
    console.error("Error fetching artist profile: ", error);
    return null;
  }
}

// getting an artist's top tracks for a specific locale
export const getPopularTracks = async (accessToken: string, id: string) => {
  try {
    const url = `${baseUrl}/artists/${id}/top-tracks`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedTracks = response.data;

    const tracks: ITrackList = mapTrackList(fetchedTracks.tracks);
    return tracks;
  }
  catch (error) {
    console.error("Error fetching artist's popular tracks: ", error);
    return null;
  }
}

// getting an artist's full discography
export const getFullDiscography = async (accessToken: string, id: string) => {
  try {
    const discography: IAlbumList = await makeArtistAlbumRequest(accessToken, id);
    return discography;
  }
  catch (error) {
    console.error("Error fetching artist's discography: ", error);
    return null;
  }
}

// getting an artist's albums
export const getAlbums = async (accessToken: string, id: string) => {
  try {
    const albums: IAlbumList= await makeArtistAlbumRequest(accessToken, id, 'album');
    return albums;
  }
  catch (error) {
    console.error("Error fetching artist's albums: ", error);
    return null;
  }
}

// getting an artist's singles
export const getSingles = async (accessToken: string, id: string) => {
  try {
    const singles: IAlbumList= await makeArtistAlbumRequest(accessToken, id, 'single');
    return singles;
  }
  catch (error) {
    console.error("Error fetching artist's singles: ", error);
    return null;
  }
}

const makeArtistAlbumRequest = async (accessToken: string, id: string, include?: string) => {
  let url = `${baseUrl}/artists/${id}/albums`;
  if (include) {
    const params = new URLSearchParams();
    params.append("include_groups", include);
    url += `?${params.toString()}`;
  }
  
  const response = await makeGetRequest(url, accessToken);
  const fetchedAlbums: IAlbumList = response.data;
  
  const albums: IAlbumList = mapAlbumList(fetchedAlbums);
  return albums;
}
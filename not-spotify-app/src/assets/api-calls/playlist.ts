import { getCredentials } from "../helpers/authenticator";
import { getTotalDuration, mapPlaylist, mapTrack } from "../helpers/apiMappers";
import { getTrackList } from "./track";

import { IPlaylist, IPlaylistTracks } from "../helpers/interfaces/objectInterfaces";

import { makeGetRequest } from "./defaults";

const baseUrl = getCredentials().BaseUrl;

// getting the full details of a playlist
export const getPlaylistDetails = async (accessToken: string, id: string) => {
  try {
    const url = `${baseUrl}/playlists/${id}`;
    const response = await makeGetRequest(url, accessToken);
    const fetchedPlaylist = response.data;

    let playlist: IPlaylist = mapPlaylist(fetchedPlaylist);
    
    let ids: string[] = [];
    playlist.tracks.items.forEach(track => {
      ids.push(track.id);
    });

    let playlistTracks: IPlaylistTracks | null = await getTrackList(accessToken, ids);
    if (playlistTracks){
      playlistTracks.tracks.items.forEach((track, i) => {
        track.addedAt = playlist.tracks.items[i].addedAt;
      })

      playlist.tracks = playlistTracks.tracks;
      playlist.duration = playlistTracks.duration;
    }

    return playlist;
  }
  catch (error) {
    console.error("Error fetching playlist: ", error);
    return null;
  }
}
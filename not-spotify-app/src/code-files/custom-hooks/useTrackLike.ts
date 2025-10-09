import React from "react";

import { useCallback } from "react";
import { ITrackList, ITrack } from "../interfaces";
import { saveTracksToLiked, removeTracksFromLiked } from "../api-calls/track";

// controlling the API call and UI updates for adding or removing a track from a user's liked songs
export const useTrackLike = (accessToken: string | null, setTrackList?: React.Dispatch<React.SetStateAction<ITrackList | null>>, setTrack?: React.Dispatch<React.SetStateAction<ITrack | null>>) => {
  const handleToggleLike = useCallback(
    async (trackId: string, isCurrentlyLiked: boolean) => {
      const success: boolean | null = await toggleLike(accessToken, trackId, isCurrentlyLiked) ?? false;

      if (success) {
        // Perform optimistic render on frontend with applied changes (if success received from API)
        if (setTrackList) {
          setTrackList(previousTracks => {
            if (!previousTracks) {
              return previousTracks
            }

            return {
              ...previousTracks,
              items: previousTracks.items.map(track =>
                track.id == trackId ? { ...track, liked: !isCurrentlyLiked } : track
              ),
            };
          });
        }
      }
    }, [accessToken, setTrackList]
  );

  const handleSingleToggleLike = useCallback(
    async (trackId: string, isCurrentlyLiked: boolean) => {
      const success: boolean | null = await toggleLike(accessToken, trackId, isCurrentlyLiked) ?? false;
      
      if (success) {
        if (setTrack) {
          setTrack(previousTrack => {
            if (!previousTrack) {
              return previousTrack
            }

            return {
              ...previousTrack,
              liked: !isCurrentlyLiked
            };
          })
        }
      }
    }, [accessToken, setTrack]
  )
  
  return { handleToggleLike, handleSingleToggleLike }
}

const toggleLike = async (accessToken: string | null, trackId: string, isCurrentlyLiked: boolean) => {
  if (!accessToken) {
    return;
  }

  let success: boolean | null = false;

  try {
    success = isCurrentlyLiked ?
      await removeTracksFromLiked(accessToken, [trackId]) :
      await saveTracksToLiked(accessToken, [trackId]);
    
    return success;
  }
  catch (error) {
    console.error(`Error updating liked status of track ${trackId}: `, error);
    return false;
  }
}
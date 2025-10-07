import React from "react";

import { useCallback } from "react";
import { ITrackList } from "../interfaces";
import { saveTracksToLiked, removeTracksFromLiked } from "../api-calls/track";

// controlling the API call and UI updates for adding or removing a track from a user's liked songs
export const useToggleLike = (accessToken: string | null, setTrackList: React.Dispatch<React.SetStateAction<ITrackList | null>>) => {
  const handleToggleLike = useCallback(
    async (trackId: string, isCurrentlyLiked: boolean) => {
        if (!accessToken) {
          return;
        }

        let success: boolean | null = false;

        try {
          success = isCurrentlyLiked ?
            await removeTracksFromLiked(accessToken, [trackId]) :
            await saveTracksToLiked(accessToken, [trackId]);
        }
        catch (error) {
          console.error(`Error updating liked status of track ${trackId}: `, error);
        }

        if (success) {
          // Perform optimistic render on frontend with applied changes (if success received from API)
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
    }, [accessToken, setTrackList]
  );
  
  return { handleToggleLike }
}
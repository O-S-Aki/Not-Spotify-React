import React from "react";

import { ITrackList } from "../interfaces";
import { saveTracksToLiked, removeTracksFromLiked } from "../api-calls/track";

// controlling the API call and UI updates for adding or removing a track from a user's liked songs
export const useTrackLike = (accessToken: string | null, setTrackList: React.Dispatch<React.SetStateAction<ITrackList | null>>) => {

}

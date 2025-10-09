import React from "react";

import './playControls.css';

interface IPlayControlsProps {
  isTrack: boolean;
  trackId?: string | null;
  liked?: boolean | null;
  onToggleLike?: (trackId: string, isCurrentlyLiked: boolean) => void;
}

const PLayControls: React.FC<IPlayControlsProps> = ({ isTrack, trackId, liked, onToggleLike }) => {
  return (
    <>
      <div className="play-controls d-flex flex-row align-items-center gap-1">
        <div className="btn play-button play primary-button">
          <i className="bi bi-play-circle-fill"></i>
        </div>
        {
          isTrack && trackId && liked != null ? (
            <>
              <div className="btn play-button like secondary-button">
                {
                  liked ? 
                    (<i className="bi bi-heart-fill" onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike?.(trackId, liked);
                      }}></i>) :
                    (<i className="bi bi-heart" onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike?.(trackId, liked);
                      }}></i>)
                }
              </div>
            </>
          ) : (
            <>
              <div className="btn play-button like secondary-button translucent-text">
                <i className="bi bi-plus-circle"></i>
              </div>
            </>)
        }
        <div className="btn play-button options secondary-button translucent-text">
          <i className="bi bi-three-dots"></i>
        </div>
      </div>
    </>
  )
}

export default PLayControls
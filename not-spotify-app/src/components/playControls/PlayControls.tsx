import React from "react";

import './playControls.css';

const PLayControls = () => {
  return (
    <>
      <div className="play-controls d-flex flex-row align-items-center gap-1">
        <div className="btn play-button play primary-button">
          <i className="bi bi-play-circle-fill"></i>
        </div>
        <div className="btn play-button secondary-button translucent-text">
          <i className="bi bi-plus-circle"></i>
        </div>
        <div className="btn play-button secondary-button translucent-text">
          <i className="bi bi-three-dots"></i>
        </div>
      </div>
    </>
  )
}

export default PLayControls
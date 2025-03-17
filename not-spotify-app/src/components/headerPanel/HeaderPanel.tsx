import React from "react";

import './headerPanel.css';

interface IHeaderPanelProps {
  primary: {
    name: string;
    image: string;
    type: string;
  };
  secondary: {
    isArtist: boolean;
    id: string;
    name: string;
    image: string;
  };
  dominantColorRgb: string;
  description: string | null;
  extras: string[]; 
  clickLink: (event: React.MouseEvent, url: string) => void;
}

const HeaderPanel: React.FC<IHeaderPanelProps> = ({ primary, secondary, dominantColorRgb, description, extras, clickLink }) => {
  const artistUrl = `/artist/${secondary.id}`;
  const userUrl = `/user/${secondary.id}`;

  const handleClick = (e: React.MouseEvent) => {
    const url = secondary.isArtist ? artistUrl : userUrl;
    if (secondary.isArtist) {
      clickLink(e, url);
    }
  }

  return (
    <>
    {
      primary && secondary && dominantColorRgb && extras ? (
        <>
          {
            <div className="container summary-container row p-4" style={{
              background: `linear-gradient(to bottom, ${dominantColorRgb}, #121212)`,
            }}>
              <div className="col col-12 mb-sm-4 mb-md-0 col-md-4 col-lg-3 p-2 header-panel-image-container">
                <div className="w-75 d-flex justify-content-center mx-auto">
                  <img src={primary.image} alt={primary.name} className="w-100 h-100 square" />
                </div>
              </div>

              <div className="col col-12 col-md-8 col-lg-9 d-flex flex-column justify-content-end">
                <p className="m-0">{primary.type}</p>
                <p className="display-name mb-1">{primary.name}</p>
                {
                  description ? (
                    <>
                      <p className="m-0 mb-1 translucent-text">{description}</p>
                    </>
                  ) : (
                    <></>
                  )
                }
                <div className="d-flex flex-row gap-3">
                  <div onClick={(e) => handleClick(e)} className="secondary-image-container square-container pointer">
                    <img src={secondary.image} alt={secondary.name} className="w-100 square round" />
                  </div>
                  <p className="mt-2">
                    <span onClick={(e) => handleClick(e)} className="page-link d-inline"><strong>{secondary.name}</strong></span>
                    <span className="translucent-text">
                    <i className="bi bi-dot"></i>
                      {extras.map((extra, index) => (
                        <React.Fragment key={index}>
                          {extra}
                          {index < extras.length - 1 && <i className="bi bi-dot"></i>}
                        </React.Fragment>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          }
        </>
      ) : (
        <></>
      )
    }
    </>
  )
}

export default HeaderPanel
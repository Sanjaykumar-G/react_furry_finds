import React from 'react';
import '../Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="🐕">
        <div className="torso">
          <div className="fur">
            <div className="spot"></div>
          </div>
          <div className="neck">
            <div className="fur"></div>
            <div className="head">
              <div className="fur">
                <div className="snout"></div>          
              </div>
              <div className="ears">
                <div className="ear">
                  <div className="fur"></div>
                </div>
                <div className="ear">
                  <div className="fur"></div>
                </div>
              </div>
              <div className="eye"></div>
            </div>
            <div className="collar"></div>
          </div>
          <div className="legs">
            <div className="leg">
              <div className="fur"></div>
              <div className="leg-inner">
                <div className="fur"></div>
              </div>
            </div>
            <div className="leg">
              <div className="fur"></div>
              <div className="leg-inner">
                <div className="fur"></div>
              </div>
            </div>
            <div className="leg">
              <div className="fur"></div>
              <div className="leg-inner">
                <div className="fur"></div>
              </div>
            </div>
            <div className="leg">
              <div className="fur"></div>
              <div className="leg-inner">
                <div className="fur"></div>
              </div>
            </div>
          </div>
          <div className="tail">
            <div className="tail">
              <div className="tail">
                <div className="tail -end">
                  <div className="tail">
                    <div className="tail">
                      <div className="tail">
                        <div className="tail"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

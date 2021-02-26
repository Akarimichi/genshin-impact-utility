import React from 'react';
import ImgMobileIcon from '../assets/images/mobile-icon.png';

const MobileLandscapeRequired = () => {
    return (
        <div className="mobile-landscape-required">
            <div className="device-icon">
                <img src={ImgMobileIcon}/>
            </div>
            <div className="message">
                Please rotate your device !
            </div>

        </div>
    );
};

export default MobileLandscapeRequired;


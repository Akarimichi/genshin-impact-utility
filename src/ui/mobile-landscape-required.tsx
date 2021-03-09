import React from 'react';
import ImgMobileIcon from '../assets/images/mobile-icon.png';
import { MobileLandscapeRequiredProps } from '../typings/global';
import _i18n from '../translations/i18n';

const MobileLandscapeRequired = ({ locale }: MobileLandscapeRequiredProps) => {
    return (
        <div className="mobile-landscape-required">
            <div className="device-icon">
                <img src={ImgMobileIcon}/>
            </div>
            <div className="message">
                {_i18n(locale, 'rotate_device')}
            </div>

        </div>
    );
};

export default MobileLandscapeRequired;


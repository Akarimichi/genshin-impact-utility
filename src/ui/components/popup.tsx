import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import ImgPopupWhite from '../../assets/images/popup/popup_white.png';
import CrossIcon from '../../assets/images/icon/cross.svg';
import { PopupProps } from '../../typings/popup';

const Popup = forwardRef(({ head, body, foot, show }: PopupProps, ref) => {

    // State acheivement clear
    const [popupShow, showPopup] = useState<boolean>(show);

    useImperativeHandle(ref, () => {
        return {
            showPopup: showPopup
        };
    });

    useEffect(() => {
        if (popupShow) {
            document.getElementsByTagName('html')[ 0 ].classList.add('popup-open');
        } else if (document.querySelectorAll('.popup-backdrop').length === 0) {
            document.getElementsByTagName('html')[ 0 ].classList.remove('popup-open');
        }

    }, [popupShow]);


    return (
        <>
            {popupShow &&
                <>
                    <div className="popup-backdrop"></div>
                    <div className="popup">
                        <div className="popup__body">
                            <img src={ImgPopupWhite} />
                            <div className="popup__body-content">

                                <div className="popup__body__content-head">
                                    <span>{head}</span>
                                    <button onClick={() => showPopup(false)}>
                                        <CrossIcon />
                                    </button>
                                </div>
                                <div className="popup__body__content-body">
                                    {body}
                                </div>
                                <div className="popup__body__content-foot">
                                    {foot}
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
});

export default Popup;

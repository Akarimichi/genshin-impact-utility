import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LinkType } from '../typings/routes';
import _i18n from '../translations/i18n';
import Popup from './components/popup';

const Home = () => {

    // Get url parameters
    const { locale }: LinkType = useParams();

    /* const refPopup = useRef(null);
    const handleClick = () => {
        refPopup.current.showPopup();
    }; */


    return (
        <>
        </>
    );
};

export default Home;

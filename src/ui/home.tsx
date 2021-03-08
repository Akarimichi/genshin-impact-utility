import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { LinkType } from '../typings/routes';
import _i18n from '../translations/i18n';
const Home = () => {

    // Get url parameters
    const { locale }: LinkType  = useParams();

    return (
        <>
        </>
    );
};

export default Home;

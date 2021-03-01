import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { LinkType } from '../typings/routes';
import _i18n from '../translations/i18n';

const Home = () => {

    // Get url parameters
    const { locale }: LinkType  = useParams();

    return (
        <>
            {/* <div><Link to={`/${locale}/achievements`}>{_i18n(locale, 'achievements')}</Link></div> */}
            <div><Link to="/en/achievements">{_i18n('en', 'achievements')}</Link></div>
            <div><Link to="/fr/achievements">{_i18n('fr', 'achievements')}</Link></div>
        </>
    );
};

export default Home;

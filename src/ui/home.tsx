import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { LinkType } from '../typings/routes';
import _i18n from '../translations/i18n';
import Select from './components/select';

const Home = () => {

    // Get url parameters
    const { locale }: LinkType  = useParams();

    const options = [
        { value: 'qualite', label: 'Qualité' },
        { value: 'niveau', label: 'Niveau' }
    ];

    return (
        <>
            {/* <div><Link to={`/${locale}/achievements`}>{_i18n(locale, 'achievements')}</Link></div> */}
            <div><Link to="/en/achievements">{_i18n('en', 'achievements')}</Link></div>
            <div><Link to="/fr/achievements">{_i18n('fr', 'achievements')}</Link></div>
            <Select
                defaultValue={options[ 1 ]}
                isSearchable={false}
                options={options}
            />
        </>
    );
};

export default Home;

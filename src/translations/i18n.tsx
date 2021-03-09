import React from 'react';
import { Languages } from '../typings/global';
import message_en from './en.json';
import message_fr from './fr.json';

const trads: any = {
    en: message_en,
    fr: message_fr
};

const _i18n = (locale: string, name: string, reactDOM: boolean | null = null) => {
    if (reactDOM) {
        return <span dangerouslySetInnerHTML={{ __html: trads[ locale ][ name ] }}></span>;
    } else {
        return trads[ locale ][ name ];
    }
};

export default _i18n;

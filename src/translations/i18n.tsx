import React, { ReactNode } from 'react';
import { Languages, Translations } from '../typings/global';
import { LocaleType } from '../typings/routes';
import message_en from './en.json';
import message_fr from './fr.json';

const trads: Translations = {
    en: message_en,
    fr: message_fr
};

const _i18n = (
    locale: LocaleType,
    name: string,
    reactDOM: boolean | null = null
): any => {
    if (reactDOM) {
        return <span dangerouslySetInnerHTML={{ __html: trads[ locale ][ name ] }}></span>;
    } else {
        return trads[ locale ][ name ];
    }
};

export default _i18n;

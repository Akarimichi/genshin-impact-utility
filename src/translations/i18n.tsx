import fs from 'fs';
import { Languages } from '../typings/global';
import message_en from './en.json';
import message_fr from './fr.json';

const trads: any = {
    en: message_en,
    fr: message_fr
};

const _i18n = (locale: string, name: string) => {
    return trads[ locale ][ name ];
};

export default _i18n;

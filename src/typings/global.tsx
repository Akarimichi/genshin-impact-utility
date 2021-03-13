import { LocaleType } from './routes';

export interface Languages {
    en: string;
    fr: string;
}

export type Translations = {
    [locale in LocaleType]: { [index: string]: string }
}

export interface MobileLandscapeRequiredProps{
    locale: LocaleType;
}

export interface User {
    id: string;
    created_at: string;
    email: string | null;
    roles: string[];
    username: string;
}

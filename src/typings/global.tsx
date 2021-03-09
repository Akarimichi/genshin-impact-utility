import { LocaleType } from './routes';

export interface Languages {
    en: string;
    fr: string;
}

export interface MobileLandscapeRequiredProps{
    locale: LocaleType;
}

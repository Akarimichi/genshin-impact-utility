import { LocaleType } from './routes';

export interface LoginProps {
    locale: LocaleType;
}

export interface LoginContainerProps {
    locale: LocaleType;
    setLoginContainerShow: (type: boolean) => void;
    refPopupAuthFailed: any;
    refPopupAuthBadCredentials: any;
    refPopupAuth: any;
}

export interface RegisterContainerProps {
    locale: LocaleType;
    setLoginContainerShow: (type: boolean) => void;
    refPopupAuth: any;
}


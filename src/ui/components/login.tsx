import React, { useRef, useState, useEffect } from 'react';
import Popup from './popup';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import TwitterLogin from 'react-twitter-auth';
import _i18n from '../../translations/i18n';
import GoogleIcon from '../../assets/images/icon/google.svg';
import TwitterIcon from '../../assets/images/icon/twitter.svg';
import LoginIcon from '../../assets/images/icon/login.svg';
import EditIcon from '../../assets/images/icon/edit.svg';
import { useDispatch, useSelector } from '../../redux/store';
import { LoginContainerProps, LoginProps, RegisterContainerProps } from '../../typings/login';
import authProvider from '../../utils/auth-provider';




const LoginContainer = ({
    locale,
    setLoginContainerShow,
    refPopupAuthFailed,
    refPopupAuthBadCredentials,
    refPopupAuth
}: LoginContainerProps) => {

    const dispatch = useDispatch();

    // User auth
    const userAuth = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData(e.currentTarget);

        authProvider.auth(
            formData.get('email') as string,
            formData.get('password') as string,
            (access_token, refresh_token) => {
                authProvider.saveToken(access_token, refresh_token, dispatch);
                refPopupAuth.current.showPopup(false);
            },
            (err) => {
                if (err.response.status === 401) {
                    refPopupAuthBadCredentials.current.showPopup(true);
                } else {
                    refPopupAuthFailed.current.showPopup(true);
                }
            }
        );

    };

    return (
        <form className="login-container" onSubmit={userAuth}>
            <div className="form-group">
                <input
                    name="email"
                    className="gi__input full-width"
                    type="email"
                    placeholder={_i18n(locale, 'email')}
                />
            </div>

            <div className="form-group">
                <input
                    name="password"
                    className="gi__input full-width"
                    type="password"
                    placeholder={_i18n(locale, 'password')}
                />
            </div>

            <div className="form-group d-flex">
                <button type="button"  className="gi__button" onClick={() => setLoginContainerShow(false)}>
                    <span className="picto login-icon"><EditIcon /></span>
                    {
                        _i18n(locale, 'to_register')
                    }
                </button>
                <button type="submit"  className="gi__button ml-auto">
                    <span className="picto login-icon"><LoginIcon /></span>
                    {
                        _i18n(locale, 'to_log_in')
                    }
                </button>
            </div>
        </form>
    );
};

const RegisterContainer = ({
    locale,
    setLoginContainerShow,
    refPopupAuth
}: RegisterContainerProps) => {

    const dispatch = useDispatch();

    // User register
    const userRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData(e.currentTarget);

        authProvider.registerUser(
            formData,
            (access_token, refresh_token) => {
                authProvider.saveToken(access_token, refresh_token, dispatch);
                refPopupAuth.current.showPopup(false);
            },
            (err) => {
                /* if (err.response.status === 401) {
                    refPopupAuthBadCredentials.current.showPopup(true);
                } else {
                    refPopupAuthFailed.current.showPopup(true);
                } */
            }
        );

    };

    return (
        <form className="register-container" onSubmit={userRegister}>
            <div className="form-group d-flex">
                <input
                    name="email"
                    className="gi__input full-width mr-10"
                    type="email"
                    placeholder={_i18n(locale, 'email')}
                />
                <input
                    name="username"
                    className="gi__input full-width ml-10"
                    type="text"
                    placeholder={_i18n(locale, 'username')}
                />
            </div>

            <div className="form-group d-flex">
                <input
                    name="password"
                    className="gi__input full-width mr-10"
                    type="password"
                    placeholder={_i18n(locale, 'password')}
                />
                <input
                    name="confirm_password"
                    className="gi__input full-width ml-10"
                    type="password"
                    placeholder={_i18n(locale, 'confirm_password')}
                />
            </div>

            <div className="form-group d-flex">
                <button type="button" className="gi__button" onClick={() => setLoginContainerShow(true)}>
                    <span className="picto login-icon"><LoginIcon /></span>
                    {
                        _i18n(locale, 'to_log_in')
                    }
                </button>
                <button type="submit" className="gi__button ml-auto">
                    <span className="picto login-icon"><EditIcon /></span>
                    {
                        _i18n(locale, 'to_register')
                    }
                </button>
            </div>
        </form>
    );
};


const Login = ({
    locale
}: LoginProps) => {

    const dispatch = useDispatch();
    const { popupLoginShow } = useSelector((state) => ({
        popupLoginShow: state.menu.popupLoginShow
    }));

    // MSG auth failed
    const refPopupAuth = useRef(null);
    const refPopupAuthFailed = useRef(null);
    const refPopupAuthBadCredentials = useRef(null);

    // Google auth
    const googleAuth = (response: GoogleLoginResponse) => {

        authProvider.authGoogle(
            response.tokenId,
            (access_token, refresh_token) => {
                authProvider.saveToken(access_token, refresh_token, dispatch);
                refPopupAuth.current.showPopup(false);
            },
            (err) => {
                refPopupAuthFailed.current.showPopup(true);
            }
        );

    };

    // Google auth failed
    const googleAuthFailure = () => {
        refPopupAuthFailed.current.showPopup(true);
    };

    // Twitter auth
    const twitterAuth = (response: any) => {
        authProvider.authTwitter(
            response,
            (access_token, refresh_token) => {
                authProvider.saveToken(access_token, refresh_token, dispatch);
                refPopupAuth.current.showPopup(false);
            }
        );
    };


    // Twitter auth failed
    const twitterAuthFailure = () => {
        refPopupAuthFailed.current.showPopup(true);
    };

    // GET .env
    const apiBaseUrl = process.env.API_GENSHIN_UTILTY_URL;
    const googleAPIClient = process.env.GOOGLE_API_CLIENT;


    // State show login / register
    const [loginContainerShow, setLoginContainerShow] = useState<boolean>(true);

    useEffect(() => {
        dispatch({ type: 'Login/ShowPopup', popupLoginShow: refPopupAuth.current });
    }, []);


    return (
        <>
            <Popup
                ref={refPopupAuth}
                head={
                    <>
                        {(loginContainerShow ? _i18n(locale, 'log_in') : _i18n(locale, 'register'))}
                    </>
                }
                show={false}
                body={
                    <>
                        {loginContainerShow &&
                        <LoginContainer
                            refPopupAuthFailed={refPopupAuthFailed}
                            refPopupAuthBadCredentials={refPopupAuthBadCredentials}
                            setLoginContainerShow={setLoginContainerShow}
                            refPopupAuth={refPopupAuth}
                            locale={locale}
                        />}
                        {!loginContainerShow &&
                        <RegisterContainer
                            refPopupAuth={refPopupAuth}
                            setLoginContainerShow={setLoginContainerShow}
                            locale={locale}
                        />}
                        <div className="form-group d-flex">
                            <span className="m-auto">{_i18n(locale, 'or')}</span>
                        </div>
                    </>
                }
                foot ={

                    <div className="d-flex">
                        <GoogleLogin
                            clientId={googleAPIClient}
                            onSuccess={googleAuth}
                            onFailure={googleAuthFailure}
                            cookiePolicy={'single_host_origin'}
                            render={
                                (renderProps) => <button className="gi__button" onClick={renderProps.onClick}>
                                    <span className="picto"><GoogleIcon /></span>
                                    {
                                        _i18n(locale, 'login_google')
                                    }
                                </button>
                            }
                        />
                        <TwitterLogin
                            loginUrl={`${apiBaseUrl}/auth/twitter`}
                            onFailure={twitterAuthFailure}
                            onSuccess={twitterAuth}
                            className="gi__button ml-auto"
                            requestTokenUrl={`${apiBaseUrl}/auth/twitter/reverse`}
                            children={
                                <>
                                    <span className="picto"><TwitterIcon /></span>
                                    {
                                        _i18n(locale, 'login_twitter')
                                    }
                                </>
                            }
                        />
                    </div>
                }
            />
            <Popup
                ref={refPopupAuthFailed}
                show={false}
                head={_i18n(locale, 'auth_failed')}
                body={_i18n(locale, 'auth_failed_msg')}
            />

            <Popup
                ref={refPopupAuthBadCredentials}
                show={false}
                head={_i18n(locale, 'auth_failed')}
                body={_i18n(locale, 'auth_bad_credentials_msg')}
            />
        </>
    );
};

export default Login;

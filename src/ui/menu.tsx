import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import _i18n from '../translations/i18n';
import ImgAchievement from '../assets/images/menu/achievement.png';
import ArrowIcon from '../assets/images/icon/arrow.svg';
import HomeIcon from '../assets/images/icon/home.svg';
import ImgBaner from '../assets/images/menu/banner.png';
import ImgProfil from '../assets/images/menu/profil.png';
import { useSelector, useDispatch } from '../redux/store';
import EditIcon from '../assets/images/icon/edit.svg';
import LoginIcon from '../assets/images/icon/login.svg';
import LogoutIcon from '../assets/images/icon/logout.svg';
import { MenuProps } from '../typings/menu';
import authProvider from '../utils/auth-provider';

const Menu = ({ locale }: MenuProps) => {


    const dispatch = useDispatch();
    const { menuActive, user, popupLoginShow } = useSelector((state) => ({
        menuActive: state.menu.menuActive,
        user: state.user.user,
        popupLoginShow: state.menu.popupLoginShow
    }));

    const handleKeyPressEchap = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            dispatch({ type: 'Menu/ToggleMenu', menuActive: !menuActive });
        }
    };


    useEffect(() => {
        if (menuActive) {
            document.getElementsByTagName('html')[ 0 ].classList.add('menu-open');
        } else {
            document.getElementsByTagName('html')[ 0 ].classList.remove('menu-open');
        }

        document.addEventListener('keydown', handleKeyPressEchap);

        return () => {
            document.removeEventListener('keydown', handleKeyPressEchap);
        };

    }, [menuActive]);

    return (
        <>
            {!menuActive &&
            <button
                className="gi__button-circle btn-toggle-menu"
                onClick={() => dispatch({ type: 'Menu/ToggleMenu', menuActive: true })}
            >
                <HomeIcon/>
            </button>
            }
            <div className={`menu__nav ${menuActive ? '' : 'hide'}`}>
                <div className="menu__nav-left">
                    <button
                        className="gi__button-circle"
                        onClick={() => dispatch({ type: 'Menu/ToggleMenu', menuActive: false })}
                    >
                        <ArrowIcon />
                    </button>
                </div>
                <div className="menu__nav-right">
                    <div className="menu__nav-right-urserInfos">
                        <img src={ImgBaner} />

                        {/* Login */}
                        {user && <div className="profil">
                            <div className="first-col"><img src={ImgProfil} /></div>
                            <div className="second-col">
                                <div className="row">
                                    <span className="username">{user.username}</span>
                                    <button className="gi__button-square"><EditIcon/></button>
                                </div>
                                <div className="row">
                                    <button
                                        className="gi__button-square"
                                        onClick={() => {
                                            authProvider.logout(dispatch);
                                        }}
                                    ><LogoutIcon />{_i18n(locale, 'log_out')}</button>
                                </div>
                            </div>
                        </div>}

                        {/* Logout */}
                        {!user && <div className="profil">
                            <div className="first-col"><img src={ImgProfil} /></div>
                            <div className="second-col">
                                <div className="row">
                                    <button
                                        className="gi__button-square"
                                        onClick={() => {
                                            if (popupLoginShow) {
                                                popupLoginShow.showPopup(true);
                                            }
                                        }}
                                    ><LoginIcon />{_i18n(locale, 'log_in')}</button>
                                </div>
                            </div>
                        </div>}

                    </div>
                    <div className="menu__nav-right-itemList">
                        <Link className="menu__nav-right-itemList-item home" to={`/${locale}/`}>
                            <HomeIcon/>
                            <span>{_i18n(locale, 'home')}</span>
                        </Link>
                        <Link className="menu__nav-right-itemList-item" to={`/${locale}/achievements`}>
                            <img className="achievement-icon" src={ImgAchievement}/>
                            <span>{_i18n(locale, 'achievements')}</span>
                        </Link>
                    </div>
                </div>
            </div>
            {menuActive &&
                <div className="menu-backdrop" onClick={() => dispatch({ type: 'Menu/ToggleMenu', menuActive: false })}></div>
            }
        </>
    );
};

export default Menu;


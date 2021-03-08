import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';
import _i18n from '../translations/i18n';
import ImgAchievement from '../assets/images/menu/achievement.png';
import ArrowIcon from '../assets/images/icon/arrow.svg';
import HomeIcon from '../assets/images/icon/home.svg';
import { useSelector, useDispatch } from '../redux/store';
import { LinkType } from '../typings/routes';

const Menu = () => {

    // Get url parameters
    const location = useLocation();
    const match: any = matchPath(location.pathname, {
        path: '/:locale',
        strict: false
    });

    const locale = match ? match.params.locale : 'en';


    const dispatch = useDispatch();
    const { menuActive } = useSelector((state) => ({
        menuActive: state.menu.menuActive
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
                    <div className="menu__nav-right-urserInfos"></div>
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


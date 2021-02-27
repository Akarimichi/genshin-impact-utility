import React, { useState, useEffect, useRef } from 'react';
import { Achievement, BookProps, BookRowProps } from '../../typings/achievement';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { getLocalStorage, setLocalStorage, useClickOutside } from '../../utils/utils';
import Hammer from 'hammerjs';

// Check hammerjs to simulate touch event on mouse

/* Import images */

import ImgBookCorner from '../../assets/images/achievements/book_achievements_corner.png';
import ImgBookDeco1 from '../../assets/images/achievements/book_achievements_deco_1.png';
import ImgBookDeco2 from '../../assets/images/achievements/book_achievements_deco_2.png';
import ImgBookDeco3 from '../../assets/images/achievements/book_achievements_deco_3.png';
import ImgBookDeco4 from '../../assets/images/achievements/book_achievements_deco_4.png';
import ImgBookDeco5 from '../../assets/images/achievements/book_achievements_deco_5.png';
import ImgBookDeco6 from '../../assets/images/achievements/book_achievements_deco_6.png';
import ImgAchievement from '../../assets/images/achievements/achievement.png';
import ImgAchievementDone from '../../assets/images/achievements/achievement_done.png';
import ImgPrimogem from '../../assets/images/achievements/primogem.png';

const BookRow = (props: BookRowProps) => {

    // Check in local storage if the id is in array
    const localStorageAchv: number[] = getLocalStorage(props.indexAchv, 'json');
    const [achievementDone, setAchievementAsDone] = useState<boolean>(
        (localStorageAchv.includes(props.item.id) ? true : false)
    );

    // Hnadle click achivevement done
    const handleClickAchievementDone = (item: Achievement) => {

        let localStorageAchv: number[] = getLocalStorage(props.indexAchv, 'json');

        if (achievementDone) {
            localStorageAchv = localStorageAchv.filter((idAchv) => (idAchv !== props.item.id));
        } else {
            localStorageAchv.push(props.item.id);
        }

        setLocalStorage(props.indexAchv, localStorageAchv, 'json');
        setAchievementAsDone(!achievementDone);
    };

    // State row click outside
    const { ref } = useClickOutside(() => {
        props.setRowActive(null);
    });



    return (
        <div ref={ref} className={`book__row ${(props.rowActive === props.item.id  ? 'active' : '')}`} onMouseDown={() => props.setRowActive(props.item.id)}>

            <div className="book__row-picto">
                <img
                    src={(achievementDone ? ImgAchievementDone : ImgAchievement)}
                    onClick={() => handleClickAchievementDone(props.item)}
                />
            </div>

            <div className="book__row-description">
                <span>{props.item.name.en}</span>
                <p>{props.item.description.en}</p>
            </div>

            <div className="book__row-reward">
                <div>
                    <img src={ImgPrimogem} />
                    <span>{props.item.reward}</span>
                </div>
            </div>

            <div className="book__row-progress">
                {props.item.progress}
            </div>

        </div>
    );
};

const Book = (props: BookProps) => {

    // State row active
    const [rowActive, setRowActive] = useState<number | null>(null);
    const refBookContentScroll = useRef<OverlayScrollbarsComponent | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {

        if (!mounted && refBookContentScroll.current) {

            const scrollDOM: HTMLElement = refBookContentScroll.current.osTarget().querySelector('.os-viewport');
            const scrollHammer = new Hammer(scrollDOM);

            scrollHammer.on('panup pandown', (event) => {
                if (event.type === 'pandown') {
                    scrollDOM.scrollTop = scrollDOM.scrollTop - 8;
                } else {
                    scrollDOM.scrollTop = scrollDOM.scrollTop + 8;
                }
            });
            setMounted(true);
        }

    });

    return (
        <div className="book">
            <div className="book__content">

                <span className="corner corner-top-left"><img src={ImgBookCorner} /></span>
                <span className="corner corner-top-right"><img src={ImgBookCorner} /></span>
                <span className="corner corner-bottom-left"><img src={ImgBookCorner} /></span>
                <span className="corner corner-bottom-right"><img src={ImgBookCorner} /></span>
                <span className="deco-1"><img src={ImgBookDeco1} /></span>
                <span className="deco-2"><img src={ImgBookDeco2} /></span>
                <span className="deco-3-1"><img src={ImgBookDeco3} /></span>
                <span className="deco-3-2"><img src={ImgBookDeco3} /></span>
                <span className="deco-3-3"><img src={ImgBookDeco3} /></span>
                <span className="deco-4"><img src={ImgBookDeco4} /></span>
                <span className="deco-5"><img src={ImgBookDeco5} /></span>
                <span className="deco-6"><img src={ImgBookDeco6} /></span>

                <OverlayScrollbarsComponent
                    ref={refBookContentScroll}
                    className="book__content-scroll os-theme-gi-scroll-white"
                >
                    {props.achievementTitle.achievements.map((item) => (
                        <BookRow
                            key={item.id}
                            item={item}
                            indexAchv={props.achievementTitle.index}
                            rowActive={rowActive}
                            setRowActive={setRowActive}
                        />
                    ))}
                </OverlayScrollbarsComponent>

            </div>
        </div>
    );
};

export default Book;

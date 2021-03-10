import React, { useState, useEffect, useRef } from 'react';
import { Achievement, BookProps, BookRowProps } from '../../typings/achievement';
import { getLocalStorage, setLocalStorage, useClickOutside } from '../../utils/utils';
import Hammer from 'hammerjs';
import { LinkType } from '../../typings/routes';
import { useParams } from 'react-router-dom';


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

const BookRow = ({
    achievementCategory,
    item,
    setRowActive,
    rowActive,
    listAchievementsClear,
    setListAchievementsClear,
    setNbrAchievementsClear
}: BookRowProps) => {

    // State acheivement clear
    const [achievementDone, setAchievementAsDone] = useState<boolean>(
        (listAchievementsClear[ achievementCategory ]?.includes(item.id) ? true : false)
    );

    // Handle click achivevement done
    const handleClickAchievementDone = (item: Achievement) => {

        const updatedListAchievementsClear = listAchievementsClear;

        if (!Array.isArray(updatedListAchievementsClear[ achievementCategory ])) {
            updatedListAchievementsClear[ achievementCategory ] = [];
        }

        if (updatedListAchievementsClear[ achievementCategory ]?.includes(item.id)) {

            updatedListAchievementsClear[ achievementCategory ] =
            updatedListAchievementsClear[ achievementCategory ]
            .filter((idAchv: any) => (idAchv !== item.id));

        } else {
            updatedListAchievementsClear[ achievementCategory ].push(item.id);
        }

        setNbrAchievementsClear(updatedListAchievementsClear[ achievementCategory ].length);
        setListAchievementsClear(updatedListAchievementsClear);
        setLocalStorage('achievements', updatedListAchievementsClear, 'json');
        setAchievementAsDone(!achievementDone);

    };

    // State row click outside
    const { ref } = useClickOutside(() => {
        setRowActive(null);
    });

    // Get url parameters
    const { locale }: LinkType = useParams();



    return (
        <div ref={ref} className={`book__row ${(rowActive === item.id  ? 'active' : '')}`} onMouseDown={() => setRowActive(item.id)}>

            <div className="book__row-picto">
                <img
                    src={(achievementDone ? ImgAchievementDone : ImgAchievement)}
                    onClick={() => handleClickAchievementDone(item)}
                />
            </div>

            <div className="book__row-description">
                <span>{item.name[ locale ]}</span>
                <p>{item.description[ locale ]}</p>
            </div>

            <div className="book__row-reward">
                <div>
                    <img src={ImgPrimogem} />
                    <span>{item.reward}</span>
                </div>
            </div>

            <div className="book__row-progress">
                {item.progress}
            </div>

        </div>
    );
};

const Book = ({
    setListAchievements,
    listAchievements,
    listAchievementsFull,
    achievementCategory,
    listAchievementsClear,
    setListAchievementsClear,
    setNbrAchievementsClear
}: BookProps) => {

    // State row active
    const [rowActive, setRowActive] = useState<string | null>(null);
    const refBookContentScroll = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);


    useEffect(() => {

        if (!mounted && refBookContentScroll.current) {
            const scrollDOM: HTMLElement = refBookContentScroll.current;
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

                <div
                    id="bookContentScrollable"
                    className="book__content-scroll"
                    ref={refBookContentScroll}
                >
                    {listAchievements.map((item) => (
                        <BookRow
                            key={item.id}
                            item={item}
                            achievementCategory={achievementCategory}
                            rowActive={rowActive}
                            setRowActive={setRowActive}
                            listAchievementsClear={listAchievementsClear}
                            setListAchievementsClear={setListAchievementsClear}
                            setNbrAchievementsClear={setNbrAchievementsClear}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Book;

import React, { useState, useEffect } from 'react';
import AchievementsJson from '../data/achievements.json';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Achievement } from '../typings/book';

// Check hammerjs to simulate touch event on mouse

/* Import images */

import ImgBookCorner from '../assets/images/achievements/book_achievements_corner.png';
import ImgBookDeco1 from '../assets/images/achievements/book_achievements_deco_1.png';
import ImgBookDeco2 from '../assets/images/achievements/book_achievements_deco_2.png';
import ImgBookDeco3 from '../assets/images/achievements/book_achievements_deco_3.png';
import ImgBookDeco4 from '../assets/images/achievements/book_achievements_deco_4.png';
import ImgBookDeco5 from '../assets/images/achievements/book_achievements_deco_5.png';
import ImgBookDeco6 from '../assets/images/achievements/book_achievements_deco_6.png';
import ImgAchievement from '../assets/images/achievements/achievement.png';
import ImgPrimogem from '../assets/images/achievements/primogem.png';


import Book from './components/book';


const Achievements = () => {

    /*  const handleClickBookAchvRow = (event: any) => {
        const elemDOM = event.currentTarget as HTMLDivElement;
        elemDOM.classList.add('active', 'focus');
    }; */

    /* const [rowActive, setRowActive] = useState<number | null>(null);
    const [rowFocus, setRowFocus] = useState<number | null>(null); */

    // let bookAchievementRowDOM: NodeListOf<Element> = undefined;

    /* useEffect(() => {
        bookAchievementRowDOM = document.querySelectorAll('.book-achievements .book-achievements-row');

        bookAchievementRowDOM!.forEach((elem: any) => {
            elem.addEventListener('click', handleClickBookAchvRow);
        });

        // window.addEventListener('click', handleMenuClickOutside);

        return () => {
            bookAchievementRowDOM!.forEach((elem: any) => {
                elem.removeEventListener('click', handleClickBookAchvRow);
            });

            // windogw.removeEventListener('click', handleMenuClickOutside);
        };
    }, [bookAchievementRowDOM]); */

    return <Book achievementTitle={AchievementsJson}/>;

    /* return (
        <div className="book-achievements">
            <div className="book-achievements-content">

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
                    className="book-achievements-content-block os-theme-book-achievement"
                    options={{ scrollbars: { clickScrolling: true } }}
                >
                    {HiddenAchievements.map((item) => (
                        <div
                            className={`book-achievements-row ${(item.id === rowActive ? 'active' : '')} ${(item.id === rowFocus ? 'focus' : '')}`}
                            onClick={() => {
                                setRowActive(item.id);
                                setRowFocus(item.id);
                            }}
                            key={item.id}
                        >

                            <div className="book-achievements-row-head">
                                <img className="icon-achievement" src={ImgAchievement} />
                            </div>

                            <div className="book-achievements-row-desc">
                                <span>{item.name.en}</span>
                                <p>{item.description.en}</p>
                            </div>

                            <div className="book-achievements-row-primogem">
                                <div>
                                    <img src={ImgPrimogem} />
                                    <span>{item.reward}</span>
                                </div>
                            </div>

                            <div className="book-achievements-row-foot">
                                {item.progress}
                            </div>

                        </div>
                    ))}
                </OverlayScrollbarsComponent>

            </div>
        </div>
    ); */
};

export default Achievements;


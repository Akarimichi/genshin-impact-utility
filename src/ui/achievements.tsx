import React from 'react';
import ImgBookCorner from '../assets/images/achievements/book_achievements_corner.png';
import ImgBookDeco1 from '../assets/images/achievements/book_achievements_deco_1.png';
import ImgBookDeco2 from '../assets/images/achievements/book_achievements_deco_2.png';
import ImgBookDeco3 from '../assets/images/achievements/book_achievements_deco_3.png';
import ImgBookDeco4 from '../assets/images/achievements/book_achievements_deco_4.png';
import ImgBookDeco5 from '../assets/images/achievements/book_achievements_deco_5.png';
import ImgBookDeco6 from '../assets/images/achievements/book_achievements_deco_6.png';
import ImgAchievement from '../assets/images/achievements/achievement.png';
import ImgPrimogem from '../assets/images/achievements/primogem.png';


const test = [1, 2, 3];

const Achievements = () => {
    return (
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

                <div className="book-achievements-content-block">
                    {test.map((item) => (

                        <div className="book-achievements-row">

                            <div className="book-achievements-row-head">
                                <img className="icon-achievement" src={ImgAchievement} />
                            </div>

                            <div className="book-achievements-row-desc">
                                <span>Pirates !</span>
                                <p>Jouez aux pirates avec Lulu, Fei et Petit Meng.</p>
                            </div>

                            <div className="book-achievements-row-primogem">
                                <img src={ImgPrimogem} />
                                <span>5</span>
                            </div>

                            <div className="book-achievements-row-foot">
                                0/1
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Achievements;


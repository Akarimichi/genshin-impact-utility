import React from 'react';
import ImgBookCorner from '../assets/images/achievements/book_achievements_corner.png';
import ImgBookDeco1 from '../assets/images/achievements/book_achievements_deco_1.png';
import ImgBookDeco2 from '../assets/images/achievements/book_achievements_deco_2.png';
import ImgBookDeco3 from '../assets/images/achievements/book_achievements_deco_3.png';
import ImgBookDeco4 from '../assets/images/achievements/book_achievements_deco_4.png';
import ImgBookDeco5 from '../assets/images/achievements/book_achievements_deco_5.png';
import ImgBookDeco6 from '../assets/images/achievements/book_achievements_deco_6.png';

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

            </div>
        </div>
    );
};

export default Achievements;


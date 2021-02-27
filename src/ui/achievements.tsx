import React from 'react';
import AchievementsJson from '../data/achievements.json';
import Book from './components/book';
import AchievementCategory from './components/achievement-category';
import ImgAchievementHead from '../assets/images/achievements/achievement_head.png';


const Achievements = () => {

    return (
        <>
            <div className="achievement__title">
                <img src={ImgAchievementHead} />
                <span>Achievements</span>
            </div>
            <div className="achievements">
                <AchievementCategory achievementTab={AchievementsJson} />
                <Book achievementTitle={AchievementsJson[ 0 ]} />
            </div>
        </>
    );

};

export default Achievements;

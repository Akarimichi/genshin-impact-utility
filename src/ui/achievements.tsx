import React from 'react';
import AchievementsJson from '../data/achievements.json';
import Book from './components/book';
import AchievementCategory from './components/achievement-category';
import _i18n from '../translations/i18n';
import ImgAchievementHead from '../assets/images/achievements/achievement_head.png';
import { LinkType } from '../typings/routes';
import { useParams } from 'react-router-dom';


const Achievements = () => {

    // Get url parameters
    const { locale }: LinkType = useParams();

    return (
        <>
            <div className="achievement__title">
                <img src={ImgAchievementHead} />
                <span>{_i18n(locale, 'achievements')}</span>
            </div>
            <div className="achievements">
                <AchievementCategory achievementTab={AchievementsJson} />
                <Book achievementTitle={AchievementsJson[ 0 ]} />
            </div>
        </>
    );

};

export default Achievements;

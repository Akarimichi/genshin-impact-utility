import React from 'react';
import ImgCategory1 from '../../assets/images/achievements/category-1.png';
import { AchievementTitle } from '../../typings/achievement';
import { AchievementCategoryProps, AchievementCategoryTitleProps } from '../../typings/achievement';
import { LinkType } from '../../typings/routes';
import { useParams } from 'react-router-dom';


const AchievementCategoryTitle = ({ index, achievementTitle }: AchievementCategoryTitleProps) => {

    // Get url parameters
    const { locale }: LinkType = useParams();

    return (
        <div className={`achievement__category__title ${(index === 0 ? 'active' : '')}`}>
            <div className="achievement__category__title-icon">
                <img src={ImgCategory1}/>
            </div>
            <div className="achievement__category__title-description">
                <span className="title">{achievementTitle.name[ locale ]}</span>
                {/* <span className="progress">100%</span> */}
            </div>
        </div>
    );
};


const AchievementCategory = ({ achievementTab }: AchievementCategoryProps) => {
    return (
        <div className="achievement__category">
            {achievementTab.map((item: AchievementTitle, key: number) => (
                <AchievementCategoryTitle
                    key={key}
                    index={key}
                    achievementTitle={item}
                />
            ))}
        </div>
    );
};

export default AchievementCategory;

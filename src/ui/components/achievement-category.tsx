import React from 'react';
import ImgCategory1 from '../../assets/images/achievements/category-1.png';
import { AchievementTitle } from '../../typings/achievement';
import { AchievementCategoryProps, AchievementCategoryTitleProps } from '../../typings/achievement';


const AchievementCategoryTitle = (props: AchievementCategoryTitleProps) => {
    return (
        <div className={`achievement__category__title ${(props.index === 0 ? 'active' : '')}`}>
            <div className="achievement__category__title-icon">
                <img src={ImgCategory1}/>
            </div>
            <div className="achievement__category__title-description">
                <span className="title">{props.achievementTitle.name.en}</span>
                {/* <span className="progress">100%</span> */}
            </div>
        </div>
    );
};


const AchievementCategory = (props: AchievementCategoryProps) => {
    return (
        <div className="achievement__category">
            {props.achievementTab.map((item: AchievementTitle, key: number) => (
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

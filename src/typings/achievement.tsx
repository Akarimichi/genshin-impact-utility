import { Languages } from './global';

export interface Achievement {
    id: string;
    order: number;
    name: Languages;
    description: Languages;
    reward: string | number;
    progress: string;
    version: string;
}

export interface AchievementTitle {
    name: Languages;
    icon: string;
    index: string;
    achievements: Achievement[];
}

export interface BookProps {
    achievementTitle: AchievementTitle;
}

export interface BookRowProps {
    item: Achievement;
    indexAchv: string;
    setRowActive: (index: string | null) => void;
    rowActive: string | null;
}

export interface AchievementCategoryProps {
    achievementTab: AchievementTitle[];
}

export interface AchievementCategoryTitleProps {
    index: number;
    achievementTitle: AchievementTitle;
}

import { Languages } from './global';

export interface Achievement {
    id: number;
    order: number;
    name: Languages;
    description: Languages;
    reward: string | number;
    progress: string;
    help: Languages;
    version: string;
    icon: string;
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
}


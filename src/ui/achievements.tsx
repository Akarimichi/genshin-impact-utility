import React, { useState, useEffect } from 'react';
import AchievementsJson from '../data/achievements.json';
import Book from './components/book';
import FilterAchievement, { selectOptionsStatut, selectOptionsVersion } from './components/filter-achievement';
import AchievementCategory from './components/achievement-category';
import _i18n from '../translations/i18n';
import ImgAchievementHead from '../assets/images/achievements/achievement_head.png';
import { LinkType } from '../typings/routes';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { Achievement } from '../typings/achievement';
import { getLocalStorage } from '../utils/utils';
import { axiosApiInstance } from '../utils/auth-provider';


const Achievements = () => {

    // Get url parameters
    const { locale }: LinkType = useParams();

    // Get location and history
    const location = useLocation();
    const history = useHistory();


    // State category achievements index
    const [achievementCategory, setAchievementCategory] = useState<number>(0);

    // State full list achievements
    const [listAchievementsFull, setListAchievementsFull] = useState<Achievement[]>([]);

    // State list achievements clear
    const [listAchievementsClear, setListAchievementsClear] = useState<any[]>([]);
    const [nbrAchievementsClear, setNbrAchievementsClear] = useState<number>(
        listAchievementsClear[ achievementCategory ]
            ? listAchievementsClear[ achievementCategory ].length : 0
    );

    // Filter list achievements
    const filterListAchievements = (
        version: string | null = null,
        statut: string | null = null,
        search: string | null = null
    ): Achievement[] => {

        // Update url
        if (version != null && statut != null && search != null) {

            history.replace({
                pathname: location.pathname,
                search: '?' + new URLSearchParams({
                    version: version,
                    statut: statut,
                    search: search
                }).toString()
            });

        } else {

            // Filter with params from url
            const searchParams = new URLSearchParams(location.search);
            if (searchParams.get('version') !== null) {
                version = selectOptionsVersion(locale).find((option) => searchParams.get('version') === option.value).value;
            }
            if (searchParams.get('statut') !== null) {
                statut = selectOptionsStatut(locale).find((option) => searchParams.get('statut') === option.value).value;
            }
            if (searchParams.get('search') !== null) {
                search = searchParams.get('search');
            }

        }

        const listAchievements = listAchievementsFull.filter((achv) => {
            if (version === null && statut === null && search === null) {
                return true;
            } else if (version !== 'all' && achv.version !== version) {
                return false;
            } else if (statut !== 'all' && !listAchievementsClear[ achievementCategory ]?.includes(achv.id) && statut === 'clear') {
                return false;
            } else if (statut !== 'all' && listAchievementsClear[ achievementCategory ]?.includes(achv.id) && statut === 'unclear') {
                return false;
            } else if (search !== '' && search !== null) {
                return (
                    achv.name[ locale ].toLowerCase().includes(search.toLowerCase())
                    ||
                    achv.description[ locale ].toLowerCase().includes(search.toLowerCase())
                );
            } else {
                return true;
            }

        });

        return listAchievements;
    };


    // State list achievements filtered
    const [listAchievements, setListAchievements] = useState<Achievement[]>(
        []
    );



    const getAchievementCategories = () => {
        return axiosApiInstance.get(`${process.env.API_GENSHIN_UTILTY_URL}/achievement`);
    };

    const getAchievements = (category: number) => {
        return axiosApiInstance.get(`${process.env.API_GENSHIN_UTILTY_URL}/achievement/${category}/list`)
    };


    useEffect(() => {

        (async () => {

            // Get categories
            const categories = (await getAchievementCategories())
            .data.achievement_categories;

            const firstCatId = categories[0].id;

            // Get achievements of the first category
            const achievements = (await getAchievements(firstCatId)).data.achievements;
            setListAchievements(achievements);

        })();

    }, []);

    return (
        <>
            <div className="achievement__title">
                <img src={ImgAchievementHead} />
                <span>{_i18n(locale, 'achievements')}</span>
            </div>
            <div className="achievements">
                <AchievementCategory
                    achievementTab={AchievementsJson}
                    nbrAchievementClear={nbrAchievementsClear}
                    nbrAchievement={listAchievementsFull.length}
                />
                <Book
                    listAchievementsFull={listAchievementsFull}
                    listAchievements={listAchievements}
                    achievementCategory={achievementCategory}
                    setListAchievements={setListAchievements}
                    listAchievementsClear={listAchievementsClear}
                    setListAchievementsClear={setListAchievementsClear}
                    setNbrAchievementsClear={setNbrAchievementsClear}
                />
            </div>
            <FilterAchievement
                filterListAchievements={filterListAchievements}
                setListAchievements={setListAchievements}
            />
        </>
    );

};

export default Achievements;

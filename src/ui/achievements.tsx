import React, { useState } from 'react';
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


const Achievements = () => {

    // Get url parameters
    const { locale }: LinkType = useParams();

    // Get location and history
    const location = useLocation();
    const history = useHistory();


    // State category achievements index
    const [achievementCategory, setAchievementCategory] = useState<number>(0);

    // State full list achievements
    const [listAchievementsFull, setListAchievementsFull] = useState<Achievement[]>(
        AchievementsJson[ achievementCategory ].achievements
    );

    // State list achievements clear
    const localStorageAchv: any[] = getLocalStorage('achievements', 'json');
    const [listAchievementsClear, setListAchievementsClear] = useState<any[]>(
        localStorageAchv
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

            /* filteredGalleryList = this.state.galleryList!.filter(item => {
                let date = moment(item.stat.mtime.getTime()).format('MMMM YYYY');
                return (item.vrmPath.toLowerCase().includes(this.state.search.toLowerCase()) || date.toLowerCase().includes(this.state.search.toLowerCase()));
            }); */

        });

        return listAchievements;
    };


    // State list achievements filtered
    const [listAchievements, setListAchievements] = useState<Achievement[]>(
        filterListAchievements()
    );



    return (
        <>
            <div className="achievement__title">
                <img src={ImgAchievementHead} />
                <span>{_i18n(locale, 'achievements')}</span>
            </div>
            <div className="achievements">
                <AchievementCategory achievementTab={AchievementsJson} />
                <Book
                    listAchievementsFull={listAchievementsFull}
                    listAchievements={listAchievements}
                    achievementCategory={achievementCategory}
                    setListAchievements={setListAchievements}
                    listAchievementsClear={listAchievementsClear}
                    setListAchievementsClear={setListAchievementsClear}
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

import React, { useRef } from 'react';
import { FilterAchievementProps } from '../../typings/achievement';
import Select from './select';
import ReactSelect from 'react-select';
import _i18n from '../../translations/i18n';
import GiVersionsJson from '../../data/versions.json';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { LinkType, LocaleType } from '../../typings/routes';
import { Option } from '../../typings/select';

// Get select version options
export const selectOptionsVersion = (locale: LocaleType) => ([].concat(
    [
        {
            value: 'all',
            label: _i18n(locale, 'all'),
            type: 'version'
        }
    ],
    GiVersionsJson.map((item) => (
        {
            value: item.number,
            label: item.number,
            type: 'version'
        }
    ))
));

// Get select statut options
export const selectOptionsStatut = (locale: LocaleType) => ([
    {
        value: 'all',
        label: _i18n(locale, 'all'),
        type: 'statut'
    },
    {
        value: 'clear',
        label: _i18n(locale, 'clear'),
        type: 'statut'
    },
    {
        value: 'unclear',
        label: _i18n(locale, 'unclear'),
        type: 'statut'
    }
]);

const FilterAchievement = ({
    filterListAchievements,
    setListAchievements
}: FilterAchievementProps) => {

    // Get url parameters
    const { locale }: LinkType = useParams();

    // Get location and history
    const location = useLocation();
    const history = useHistory();

    // Get url query
    const searchParams = new URLSearchParams(location.search);

    // Get select version options
    const optionsVersion = selectOptionsVersion(locale);

    // Get select statut options
    const optionsStatut = selectOptionsStatut(locale);

    // Get index of selected options
    let indexOptionVersion = optionsVersion.findIndex((option) => searchParams.get('version') === option.value);
    indexOptionVersion = (indexOptionVersion === -1 ? 0 : indexOptionVersion);

    let indexOptionStatut = optionsStatut.findIndex((option) => searchParams.get('statut') === option.value);
    indexOptionStatut = (indexOptionStatut === -1 ? 0 : indexOptionStatut);

    // On change filter
    const handleOnChangeFilter = (optionSelected: Option = null) => {
        let currentVersion: string = refSelectVersion.current.state.value.value;
        let currentStatut: string = refSelectStatut.current.state.value.value;
        const currentSearch: string = refInputSearch.current.value;

        if (optionSelected.type === 'version') {
            currentVersion = optionSelected.value;
        } else if (optionSelected.type === 'statut') {
            currentStatut = optionSelected.value;
        }

        setListAchievements(filterListAchievements(currentVersion, currentStatut, currentSearch));
    };

    // On input search
    const handleOnInputSearch = () => {
        const currentVersion: string = refSelectVersion.current.state.value.value;
        const currentStatut: string = refSelectStatut.current.state.value.value;
        const currentSearch: string = refInputSearch.current.value;

        setListAchievements(filterListAchievements(currentVersion, currentStatut, currentSearch));
    };

    // Select refs
    const refSelectVersion = useRef<any | null>(null);
    const refSelectStatut = useRef<any | null>(null);
    const refInputSearch = useRef<HTMLInputElement | null>(null);

    return (
        <div className="achievement__filters">
            <input
                ref={refInputSearch}
                className="gi__input"
                placeholder={`${_i18n(locale, 'search')}...`}
                onInput={handleOnInputSearch}
                defaultValue={searchParams.get('search')}
            />
            <Select
                innerRef={refSelectVersion}
                value={optionsVersion[ indexOptionVersion ]}
                isSearchable={false}
                options={optionsVersion}
                menuPlacement="top"
                onChange={handleOnChangeFilter}
            />

            <Select
                innerRef={refSelectStatut}
                value={optionsStatut[ indexOptionStatut ]}
                isSearchable={false}
                options={optionsStatut}
                menuPlacement="top"
                onChange={handleOnChangeFilter}
            />

        </div>
    );
};

export default FilterAchievement;

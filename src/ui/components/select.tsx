import React from 'react';
import ReactSelect, { components, Props } from 'react-select';

const DropdownIndicator = (props: any) => {
    return (
        <components.DropdownIndicator {...props}>
            <span className="select-gi-theme__dropdown-indicator-icon"></span>
        </components.DropdownIndicator>
    );
};

const Option = (props: any) => {
    return (
        <components.Option {...props}>
            <span>{props.label}</span>
            <span className="select-gi-theme__option-check-icon"></span>
        </components.Option>
    );
};

const Select = (props: Props) => {

    return (
        <ReactSelect
            components={{ DropdownIndicator, Option }}
            className="select-gi-theme__container"
            classNamePrefix="select-gi-theme"
            {...props}
        />
    );
};

export default Select;

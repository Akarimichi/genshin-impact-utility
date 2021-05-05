import { Reducer } from 'redux';
import { produce } from 'immer';

// ------------------- TYPES

// STATE
export interface State {
    menuActive: boolean;
    popupLoginShow: any | null;
}

export const initialState: Readonly<State> = {
    menuActive: false,
    popupLoginShow: null
};

// ACTION
export type Action = {
    type: 'Menu/ToggleMenu' | 'Login/ShowPopup';
    menuActive?: boolean;
    popupLoginShow?: any | null;
};

// REDUCER
export const reducer: Reducer<State, Action> = (
    state = initialState,
    action
) => {
    return produce(state, (newState: State) => {
        if (action.type === 'Menu/ToggleMenu') {
            newState.menuActive = action.menuActive;
        } else if (action.type === 'Login/ShowPopup') {
            newState.popupLoginShow = action.popupLoginShow;
        }
    });
};

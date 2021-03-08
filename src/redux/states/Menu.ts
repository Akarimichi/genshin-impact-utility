import { Reducer } from 'redux';
import { produce } from 'immer';

// ------------------- TYPES

// STATE
export interface State {
    menuActive: boolean;
}

export const initialState: Readonly<State> = {
    menuActive: false
};

// ACTION
export type Action = {
    type: 'Menu/ToggleMenu';
    menuActive?: boolean;
};

// REDUCER
export const reducer: Reducer<State, Action> = (
    state = initialState,
    action
) => {
    return produce(state, (newState: State) => {
        if (action.type === 'Menu/ToggleMenu') {
            newState.menuActive = action.menuActive;
        }
    });
};

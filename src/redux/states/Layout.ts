import { Reducer } from 'redux';
import { produce } from 'immer';

// ------------------- TYPES

// STATE
export interface State {
    items: any;
}

export const initialState: Readonly<State> = {
    items: []
};

// ACTION
export type Action = {
    type: 'Layout/SetDefault';
};

// REDUCER
export const reducer: Reducer<State, Action> = (
    state = initialState,
    action
) => {
    return produce(state, (newState: State) => {
        if (action.type === 'Layout/SetDefault') {
            newState.items = initialState.items;
        }
    });
};

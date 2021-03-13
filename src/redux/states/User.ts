import { Reducer } from 'redux';
import { produce } from 'immer';
import { User } from '../../typings/global';

// ------------------- TYPES

// STATE
export interface State {
    user: User | null;
}

export const initialState: Readonly<State> = {
    user: null
};

// ACTION
export type Action = {
    type: 'User/SetUser';
    user: User | null;
};

// REDUCER
export const reducer: Reducer<State, Action> = (
    state = initialState,
    action
) => {
    return produce(state, (newState: State) => {
        if (action.type === 'User/SetUser') {
            newState.user = action.user;
        }
    });
};

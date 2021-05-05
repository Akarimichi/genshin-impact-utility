import { Reducer } from 'redux';
import { produce } from 'immer';
import { User } from '../../typings/global';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

// ------------------- TYPES

// STATE
export interface State {
    user: User | null;
}

const refresh_token = localStorage.getItem('refresh_token');
let user = null;

if (refresh_token) {
    const data: any = jwt_decode(refresh_token);

    if (moment().isBefore(moment(data.exp, 'X'))) {
        user = data.sub;
    }
}


export const initialState: Readonly<State> = {
    user: user
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

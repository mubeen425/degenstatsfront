import {
    Profile_CONFIRMED_ACTION,
    Profile_FAILED_ACTION
} from '../actions/ProfileActions';

const initialState = {
    Data: [],
    errorMessage: '',
    successMessage: '',
    showLoading: false,
};

export function ProfileReducer(state = initialState, action) {
    if (action.type === Profile_CONFIRMED_ACTION) {
        ;
        return {
            ...state,
            successMessage: 'Signup Successfully Completed',

        };
    }
    if (action.type === Profile_FAILED_ACTION) {
        return {
            ...state,

            errorMessage: 'Login Successfully Completed',

        };
    }
    return state;
}



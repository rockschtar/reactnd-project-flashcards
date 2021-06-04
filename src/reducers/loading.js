import { APP_LOADING, IS_LOADING } from '../actions/loading';

export function isLoading(state = null, action) {

    if (action.type === IS_LOADING) {
        return action.isLoading;
    }

    return state;
}

export function appLoading(state = null, action) {

    if (action.type === APP_LOADING) {
        return action.appLoading;
    }

    return state;
}

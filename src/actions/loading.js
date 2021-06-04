export const IS_LOADING = 'IS_LOADING';
export const APP_LOADING = 'APP_LOADING';

export function isLoading(isLoading = true) {
    return {
        type: IS_LOADING,
        isLoading,
    };
}

export function appLoading(appLoading = true) {
    return {
        type: APP_LOADING,
        appLoading,
    };
}

import config from '../utils/config';

const Logger = store => next => action => {
    if (config.logging) {
        console.group(action.type);
        console.log('Action:', action);
        const returnValue = next(action);
        console.log('New State: ', store.getState());
        console.groupEnd();
        return returnValue;
    }

    return next(action);
};

export default Logger;

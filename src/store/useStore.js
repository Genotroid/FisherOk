import React, {createContext, useReducer, useContext} from 'react';
import {basketActions, basketInitialState} from './basketActions';

const initialState = {
    ...basketInitialState
};

const StoreContext = createContext(initialState);

const Actions = {
    ...basketActions
};

const reducer = (state, action) => {
    const act = Actions[action.type];
    const update = act(state, action.data);

    return {...state, ...update};
};

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = store => {
    const {state, dispatch} = useContext(StoreContext);

    return {state, dispatch};
};

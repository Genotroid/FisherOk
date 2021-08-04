import React, {createContext, useReducer, useContext} from 'react';
import {basketActions, basketInitialState} from './basketActions';
import {postModalActions, postModalInitialState} from './postModalActions';
import {courierModalActions, courierModalInitialState} from './courierModalActions';
import {addressModalActions, addressModalInitialState} from './addressModalActions';

const initialState = {
    ...basketInitialState,
    ...postModalInitialState,
    ...courierModalInitialState,
    ...addressModalInitialState
};

const StoreContext = createContext(initialState);

const Actions = {
    ...basketActions,
    ...postModalActions,
    ...addressModalActions,
    ...courierModalActions
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

import { createContext } from 'react';

export const pointsReducer = (state = [], action) => {
    switch (action.type) {
        case 'add':
            state = [...state, action.location]
            return [...state]
        case 'remove':
            state.splice(action.index, 1)
            return [...state]
        default:
            return [...state];
    }
}


export const PointsContext = createContext();
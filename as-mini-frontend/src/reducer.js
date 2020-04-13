import { type as actionType } from './actions';

const initialState = {
    session: localStorage.session ? JSON.parse(localStorage.session) : null,
    properties: { data: [] },
    filters: { name: '', maxPrice: 0 },
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case actionType.SET_SESSION:
            return {
                ...state,
                session: action.session
            };
        case actionType.SET_PROPERTIES:
            return {
                ...state,
                properties: action.properties
            };
        case actionType.SET_FILTERS:
            return {
                ...state,
                filters: action.filters
            };
        default:
            return state;
    }
}

export default reducer;

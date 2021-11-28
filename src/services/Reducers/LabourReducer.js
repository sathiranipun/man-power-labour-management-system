export const labourActionTypes = {
    SET_LABOUR_LIST: 'SET_LABOUR_LIST',
    SET_LABOUR_COUNT: 'SET_LABOUR_COUNT',
}

const labourReducer = (state, action) => {
    switch (action.type) {
        case labourActionTypes.SET_LABOUR_LIST:
            return {
                ...state,
                labourList: action.labourList,
            }

        case labourActionTypes.SET_LABOUR_COUNT:
            return {
                ...state,
                labourList: action.labourCount,
            }
        default:
            return state;
    }
}

export default labourReducer;
export const labourActionTypes = {
    SET_LABOUR_LIST: 'SET_LABOUR_LIST',
}

const labourReducer = (state, action) => {
    switch (action.type) {
        case labourActionTypes.SET_LABOUR_LIST:
            return {
                ...state,
                labourList: action.labourList,
            }
    
        default:
            return state;
    }
}

export default labourReducer;
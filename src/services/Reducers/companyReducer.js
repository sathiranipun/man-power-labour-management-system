export const companyActionTypes = {
    SET_COMPANY_LIST: 'SET_COMPANY_LIST',
}

const companyReducer = (state, action) => {
    switch (action.type) {
        case companyActionTypes.SET_COMPANY_LIST:
            return {
                ...state,
                companyList: action.companyList,
            }

        default:
            return state;
    }
}

export default companyReducer;
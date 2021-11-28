export const companyActionTypes = {
    SET_COMPANY_LIST: 'SET_COMPANY_LIST',
    SET_JOB_REQUESTS: 'SET_JOB_REQUESTS',
    SET_COMPANY_COUNT: 'SET_COMPANY_COUNT',
}

const companyReducer = (state, action) => {
    switch (action.type) {
        case companyActionTypes.SET_COMPANY_LIST:
            return {
                ...state,
                companyList: action.companyList,
            }

        case companyActionTypes.SET_JOB_REQUESTS:
            return {
                ...state,
                jobRequests: action.jobRequests
            }

        case companyActionTypes.SET_COMPANY_COUNT:
            return {
                ...state,
                companyCount: action.companyCount
            }
        default:
            return state;
    }
}

export default companyReducer;
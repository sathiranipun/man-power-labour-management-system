export const companyActionTypes = {
    SET_COMPANY_LIST: 'SET_COMPANY_LIST',
    SET_JOB_REQUESTS: 'SET_JOB_REQUESTS'
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

        default:
            return state;
    }
}

export default companyReducer;
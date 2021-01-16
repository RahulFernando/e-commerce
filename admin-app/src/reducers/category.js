import { categoryConstants } from "../actions/constant";

const initState = {
    categories: [],
    loading: false,
    error: null,
    message: ''
}

export default (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            } 
            break;
        case categoryConstants.CREATE_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.CREATE_NEW_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                categories: [...state.categories, action.payload.category]
            }
            break;
        case categoryConstants.CREATE_NEW_CATEGORY_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
        default:
            break;
    }

    return state;
}
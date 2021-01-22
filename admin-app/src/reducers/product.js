import { productConstants } from "../actions/constant";

const initState = {
    products: [],
    loading: false,
    message: '',
    error: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case productConstants.CREATE_NEW_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.CREATE_NEW_PRODUCT_SUCCESS:
            state = {
                initState,
                message: action.payload.message,
                products: [...state.products, action.payload.product]
            }
            break;
        case productConstants.CREATE_NEW_PRODUCT_FAILURE:
            state = {
                initState,
                error: action.payload.error
            }
            break
        case productConstants.GET_ALL_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false
            }
            break;
        case productConstants.GET_ALL_PRODUCT_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
}
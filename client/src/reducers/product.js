import { productConstants } from "../actions/constant";

const initState = {
    products: [],
    loading: false,
    error: null
}

export default (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case productConstants.GET_PRODUCT_BY_SLUG_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_PRODUCT_BY_SLUG_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false
            }
            break;
        case productConstants.GET_PRODUCT_BY_SLUG_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
                loading: false
            }
            break;
        default:
            break;
    }

    return state;
}
import { signupConstants } from '../actions/constant';

const initState = {
    error: null,
    message: '',
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case signupConstants.SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case signupConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case signupConstants.SIGNUP_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.message
            }
            break;
        default:
            break;
    }
    return state;
}
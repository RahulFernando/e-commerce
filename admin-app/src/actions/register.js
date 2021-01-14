import { signupConstants } from "./constant"
import axios from '../helpers/axios'

// user register
export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: signupConstants.SIGNUP_REQUEST });

        const res = await axios.post(`/admin/signup`, {
            ...user
        })

        if (res.status === 201) {
            const { message } = res.data;
            dispatch({
                type: signupConstants.SIGNUP_SUCCESS,
                payload: { message }
            });
        }else if (res.status === 400) {
            dispatch({
                type: signupConstants.SIGNUP_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
} 
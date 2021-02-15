import axios from "../helpers/axios"
import { categoryConstants } from "./constant";

// get all categories action
export const getAllCategories = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });

        const res = await axios.get(`/category/getCategories`);

        if (res.status === 200) {
            const { categories } = res.data;  
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories: categories }
            });
        }else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}
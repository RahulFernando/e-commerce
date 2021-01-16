import axios from "../helpers/axios"
import { categoryConstants } from "./constant";

// get all categories action
export const getAllCategories = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });

        const res = await axios.get(`/category/getCategories`);

        console.log(res);

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

// create new category action
export const addCategory = (category) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.CREATE_NEW_CATEGORY_REQUEST });

        try {
            const res = await axios.post(`/category/create`, category)
            console.log(res.data);
            if (res.status === 201) {
            dispatch({
                type: categoryConstants.CREATE_NEW_CATEGORY_SUCCESS,
                payload: { 
                    category: res.data.cat,
                    message: 'New category added'
                }
            })
            }else {
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}
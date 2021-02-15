import axios from "../helpers/axios";
import { productConstants } from "./constant"

// add new porduct action
export const create = (form) => {
    return async dispatch => {
        dispatch({ type: productConstants.CREATE_NEW_PRODUCT_REQUEST });

        const res = await axios.post(`/product/create`, form);

        if (res.status === 201) {
            dispatch({
                type: productConstants.CREATE_NEW_PRODUCT_SUCCESS,
                payload: {
                    product: res.data.product
                }
            })
        }else {
            dispatch({
                type: productConstants.CREATE_NEW_PRODUCT_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}

// retreive all products action
export const getAll = () => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_ALL_PRODUCT_REQUEST });
        const res = await axios.get(`/product/getAll`);

        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                payload: { products: res.data.products }
            });
        }else if (res.status === 400) {
            dispatch({
                type: productConstants.GET_ALL_PRODUCT_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}
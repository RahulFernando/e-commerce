import axios from '../helpers/axios'
import { productConstants } from './constant';

// get product by slug action 
export const getProductBySlug = (slug) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST })

        const res = await axios.get(`/product/${slug}`);

        if (res.status === 200) {
            const { products } = res.data;
            dispatch({
                type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload: { products: products }
            });
        }else {
            const { error } = res.data;
            dispatch({
                type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
                payload: { error: error }
            });
        }
    }
}
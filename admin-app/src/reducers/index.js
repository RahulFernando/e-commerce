import { combineReducers } from 'redux';
import authReducer from './auth';
import registerReducer from './register';
import categoryReducer from './category';
import productReducer from './product';
import orderReducer from './order';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer
});

export default rootReducer;
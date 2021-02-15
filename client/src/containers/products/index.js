import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../../actions/product';
import Layout from '../../components/layout';
import { publicUri } from '../../url';
import './style.css';

const Products = (props) => {
    const { match } = props;
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductBySlug(match.params.slug))
    }, []);

    return (
        <Layout>
            <div className="card">
                <div className="cardHeader">
                    <div>{props.match.params.slug}</div>
                </div>
                <div style={{display: 'flex'}}>
                    {
                        product.products.map((key, index) => {
                            return (
                                <div className="productContainer">
                                    <div className="productImg">
                                        <img src={publicUri(key.productImgs[0].img)}/>
                                    </div>
                                    <div className="productInfo">
                                        <div style={{ margin: '5px 0' }}>{key.name}</div>
                                        <div className="productPrice">Rs {key.price}.00</div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Products;

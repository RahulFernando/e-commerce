import React, { useState, useEffect } from 'react'
import Layout from '../../components/layouts'
import { Col, Row, Button, Container, Table } from "react-bootstrap";
import Input from '../../components/ui';
import { useSelector, useDispatch } from 'react-redux';
import { create } from '../../actions/product';
import ModalUI from '../../components/ui/modal';
import './style.css';
import { publicUri } from '../../url';

const Products = (props) => {
    // states
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productImgs, setProductImgs] = useState([]);
    const [category, setCategory] = useState('');
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const categoryState = useSelector(state => state.category);
    const product = useSelector(state => state.product)

    // retrieve categories
    const catergoryList = (categories, options = []) => {
        for (let cat of categories) {
            options.push({ value: cat._id, name: cat.name });
        }
        return options;
    }

    // retreive all products 
    const renderProducts = () => {
        return (
            <Table responsive="sm" className="products mt-2">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                   {
                       product.products.length > 0 ? 
                        product.products.map((prod,index) => 
                            <tr onClick={() => showProductDetailModal(prod)} key={prod._id}>
                                <td>{index + 1}</td>
                                <td>{prod.name}</td>
                                <td>{prod.description}</td>
                                <td>{prod.price}</td>
                                <td>{prod.category.name}</td>
                            </tr>
                        ): null
                   }                
                </tbody>
            </Table> 
        )
    }

    // show product details modal
    const showProductDetailModal = (product) => {
        setProductDetailModal(true);
        setProductDetails(product)
    }

    // render product detail modal
    const renderProductDetailModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <ModalUI
                show={productDetailModal}
                handleClose={handleCloseProductDetail}
                modalTitle={'Product detail'}
                size="lg"
            >
                <Row>
                    <Col md="12">
                        <label className="key">Product Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Product Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <label className="key">Product Image</label>
                        <div style={{display: 'flex'}}>
                        {
                            productDetails.productImgs.map(img => 
                                <div className="imgContainer">
                                    <img src={publicUri(img.img)}/>    
                                </div>
                            )
                        }
                        </div>
                    </Col>
                </Row>

                
            </ModalUI>
        )
    }

    // product detail modal handler
    const handleCloseProductDetail = () => {
        setProductDetailModal(false)
    }

    // handle product images
    const handleProductImgs = (e) => {
        setProductImgs([...productImgs, e.target.files[0]])
    }

    // submit form
    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('description', description);
        form.append('price', price);
        form.append('category', category);

        for (let img of productImgs) {
            form.append('productImgs', img);
        }

        dispatch(create(form))

        setShow(false);
      }
    
    // handle modal
    const handleShow = () => setShow(true);

    return (
        <Layout sidebar>
          <Container>
            <Row>
                <Col md={12}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Products</h3>
                    <Button variant="light" onClick={handleShow}>Add</Button>
                </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    { renderProducts() }
                </Col>
            </Row>
          </Container>

          <ModalUI
            show={show}
            handleClose={handleClose}
            modalTitle='Add new Product'
          >
            <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Select category</option>
                {
                    catergoryList(categoryState.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )
                }
            </select>
            <Input
            label="Product Name"
            placeholder="Enter product"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            />
            <Input
            label="Product Description"
            placeholder="Enter description"
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            />
            {
                productImgs.length > 0 ?
                productImgs.map((pic, index) => <div key={index}>{pic.name}</div>): null 
            }
            <input type="file" name="productImgs" onChange={handleProductImgs}/>
            <Input
            label="Product Price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
              
          </ModalUI>

            {renderProductDetailModal()}
            
        </Layout>
    )
}

export default Products;

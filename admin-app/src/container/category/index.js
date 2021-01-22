import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import Layout from "../../components/layouts";
import Input from '../../components/ui';
import ModalUI from "../../components/ui/modal";

const Category = (props) => {
    // states
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

    // rendering all categories
    const renderCategories = (categories) => {
      let myCategories = [];
      for (let category of categories) {
        myCategories.push(
          <li key={category._id}>{category.name}</li>
        )      
      }

      return myCategories;
    }

    // submit form
    const handleClose = () => {
      const category = { name }

      dispatch(addCategory(category));

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
                <h3>Categorys</h3>
                <Button variant="light" onClick={handleShow}>Add</Button>
              </div>
            </Col>
          </Row>
          <Row>
              <Col md={12}>
                <ul>
                  { renderCategories(category.categories) }
                </ul>
              </Col>
          </Row>
        </Container>

        <ModalUI 
          show={show}
          handleClose={handleClose}
          modalTitle="Add new category"
        >

          <Input
            label="Category Name"
            placeholder="Enter category"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            />
        </ModalUI>
      </Layout>
    );
}


export default Category;
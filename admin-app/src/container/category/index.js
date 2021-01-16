import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategories } from "../../actions";
import Layout from "../../components/layouts";
import Input from '../../components/ui';

const Category = (props) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

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

    const handleClose = () => {
      const category = { name }

      dispatch(addCategory(category));

      setShow(false);
    }
    const handleShow = () => setShow(true);

    return (
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Category</h3>
                <button className="btn" onClick={handleShow}>Add</button>
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

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
               label="Category Name"
               placeholder="Enter category"
               value={name}
               type="text"
               onChange={(e) => setName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    );
}


export default Category;
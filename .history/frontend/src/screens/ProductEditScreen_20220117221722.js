import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {listProductDetails} from '../actions/productActions';

const ProductEditScreen = ({history, match}) => {
  const productId = match.params.id;

  const [name, setName] = useState ('');
  const [price, setPrice] = useState (0);
  const [image, setImage] = useState ('');
  const [brand, setBrand] = useState ('');
  const [category, setCategory] = useState ('');
  const [countInStock, setCountInStock] = useState (0);
  const [description, setDescription] = useState ('');

  const dispatch = useDispatch ();

  const productDetails = useSelector (state => state.productDetails);
  const {loading, error, product} = productDetails;

  useEffect (
    () => {
      if (!product.name || product._id !== productId) {
        dispatch (listProductDetails (productId));
      } else {
        setName (product.name);
        setPrice (product.price);
        setImage (product.image);
        setBrand (product.brand);
        setCategory (product.category);
        setCountInStock (product.countInStock);
        setDescription (product.description);
      }
    },
    [dispatch, product, productId, history]
  );

  const submitHandler = e => {
    e.preventDefault ();
    // UPDATE PRODUCT
  };

  return (
    <React.Fragment>
      <Link to="/admin/productlist" className="btn btn-light my-2">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loading
          ? <Loader />
          : error
              ? <Message variant="danger">{error}</Message>
              : <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={e => setName (e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Price"
                      value={price}
                      onChange={e => setPrice (e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      onChange={e => setImage (e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Brand"
                      value={brand}
                      onChange={e => setBrand (e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="countInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Count In Stock"
                      value={countInStock}
                      onChange={e => setCountInStock (e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Category"
                      value={category}
                      onChange={e => setCategory (e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Description"
                      value={description}
                      onChange={e => setDescription (e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button type="submit" variant="primary">
                      Update
                    </Button>
                  </Form.Group>
                </Form>}

      </FormContainer>
    </React.Fragment>
  );
};

export default ProductEditScreen;

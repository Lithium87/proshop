import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Button, Form} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails, updateUserProfile} from '../actions/userActions';
import {listMyOrders} from '../actions/orderActions';

const ProfileScreen = ({history, location}) => {
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const [message, setMessage] = useState (null);

  const dispatch = useDispatch ();

  const userDetails = useSelector (state => state.userDetails);
  const {loading, error, user} = userDetails;

  const userLogin = useSelector (state => state.userLogin);
  const {userInfo} = userLogin;

  const userUpdateProfile = useSelector (state => state.userUpdateProfile);
  const {success} = userUpdateProfile;

  const orderListMy = useSelector (state => state.orderListMy);
  const {loading: loadingOrders, error: errorOrders, orders} = orderListMy;

  useEffect (
    () => {
      if (!userInfo) {
        history.push ('/login');
      } else {
        if (!user.name) {
          dispatch (getUserDetails ('profile'));
          dispatch (listMyOrders ());
        } else {
          setName (user.name);
          setEmail (user.email);
        }
      }
    },
    [history, userInfo, dispatch, user]
  );

  const submitHandler = e => {
    e.preventDefault ();
    if (password !== confirmPassword) {
      setMessage ('Passwords do not match!');
    } else {
      dispatch (updateUserProfile ({id: user._id, name, email, password}));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success &&
          <Message variant="success">Profile successfully updated!</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={e => setName (e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail (e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword (e.target.value)}
            />

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword (e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form.Group>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;

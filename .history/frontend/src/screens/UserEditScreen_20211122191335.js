import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {getUserDetails} from '../actions/userActions';

const UserEditScreen = ({history, match}) => {
  const userId = match.params.id;

  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [isAdmin, setIsAdmin] = useState (false);

  const dispatch = useDispatch ();

  const userDetails = useSelector (state => state.userDetails);
  const {loading, error, user} = userDetails;

  useEffect (
    () => {
      if (!user.name || user._id !== userId) {
        dispatch (getUserDetails (userId));
      } else {
        setName (user.name);
        setEmail (user.email);
        setIsAdmin (user.isAdmin);
      }
    },
    [dispatch, user, userId]
  );

  const submitHandler = e => {
    e.preventDefault ();
  };

  return (
    <React.Fragment>
      <Link to="/admin/userlist" className="btn btn-light my-2">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>
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

                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={e => setEmail (e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="isAdmin">
                    <Form.Check
                      type="checkbox"
                      label="Is Admin"
                      checked={isAdmin}
                      onChange={e => setIsAdmin (e.target.checked)}
                    />

                    <Button type="submit" variant="primary">
                      Update
                    </Button>
                  </Form.Group>
                </Form>}

      </FormContainer>
    </React.Fragment>
  );
};

export default UserEditScreen;

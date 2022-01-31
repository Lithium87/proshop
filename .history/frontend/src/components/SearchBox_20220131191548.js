import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

const SearchBox = () => {
  const [keyword, setKeyword] = useState ('');

  const submitHandler = () => {};

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword (e.target.value)}
        placeholder="Search Products..."
      >
        jgjhgh
      </Form.Control>
    </Form>
  );
};

export default SearchBox;

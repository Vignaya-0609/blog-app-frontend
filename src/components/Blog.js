import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MyBlogs from './MyBlogs';

function Blog() {

  return (
    <Container fluid className="mt-3">
      <Row>
        <MyBlogs/>
      </Row>
    </Container>
  );
}

export default Blog;

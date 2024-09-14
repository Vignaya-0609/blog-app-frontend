import React from 'react'
import Count from './Count'
import OthersBlogs from './OtherBlogs'
import Container from 'react-bootstrap/Container';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("Bloguser"));
  return (
    <Container fluid>
    <h2 className='mb-4 mt-3'>Welcome {user.username}!</h2>
    <Count/>
    <h4 className="mb-4">Blogs from Other Users</h4>
    <OthersBlogs/>
    </Container>
  )
}

export default Dashboard
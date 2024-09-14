import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CreateBlogModal from './CreateBlogModal';
import DetailedBlogViewModal from './DetailedBlogViewModal';
import EditBlogModal from './EditBlogModal';
import DeleteModal from './DeleteModal';

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailedModal, setShowDetailedModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
      const blogsData = await response.json();
      const user = JSON.parse(localStorage.getItem("Bloguser"));
      const myBlogs = blogsData.filter(blog => blog.userId === (user && user._id));
      setBlogs(myBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Function to handle blog creation success
  const handleBlogCreation = () => {
    fetchBlogs(); 
  };

  const handleEdit = (blogId) => {
    console.log("Edit blog", blogId);
    setSelectedBlogId(blogId);
    setShowEditModal(true);
  };

  const handleDelete = (blogId) => {
    setSelectedBlogId(blogId);
    setShowDeleteModal(true);
  };
  const handleTitleClick = (blogId) => {
    setSelectedBlogId(blogId);
    setShowDetailedModal(true);
  };
  const handleBlogDeletion = () => {
    fetchBlogs();
  };
  return (
    <>
    <div className='d-flex justify-content-between align-items-center'>
      <h2>My Blogs</h2>
      <Button variant="primary" onClick={() => setShowCreateModal(true)}>
        Create New Blog
      </Button>
    </div>
      <Row className="g-4 mt-3">
        {blogs.length > 0 ? (
          blogs.slice().reverse().map((blog) => (
            <Col key={blog._id} lg={4} md={6} sm={12}>
              <Card className="blog-card">
                <Card.Img variant="top" src={blog.thumbnail} className="blog-thumbnail" />
                <Card.Body>
                  <Card.Title className="blog-content" onClick={() => handleTitleClick(blog._id)} style={{ cursor: 'pointer',color:"blue" }}>{blog.title}</Card.Title>
                  {/* <Card.Text className="blog-content">
                    {blog.content}
                  </Card.Text> */}
                  <Card.Text className="text-muted">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" onClick={() => handleEdit(blog._id)}>Edit</Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(blog._id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </Row>

      <CreateBlogModal show={showCreateModal} handleClose={() => setShowCreateModal(false)} onBlogCreated={handleBlogCreation} />
      <DetailedBlogViewModal show={showDetailedModal} handleClose={() => setShowDetailedModal(false)} blogId={selectedBlogId}/>
      <EditBlogModal show={showEditModal} handleClose={() => setShowEditModal(false)} onBlogCreated={handleBlogCreation} blogId={selectedBlogId} />
      <DeleteModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} blogId={selectedBlogId} onBlogDeleted={handleBlogDeletion} />
    </>
  );
}

export default MyBlogs;

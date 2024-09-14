import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DetailedBlogViewModal from './DetailedBlogViewModal';

function OthersBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const handleTitleClick = (blogId) => {
    setSelectedBlogId(blogId);
    setShowModal(true);
  };
  useEffect(() => {
    fetchOtherBlogs(); 
  }, []);

  const fetchOtherBlogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
      const blogsData = await response.json();

      // Filter out blogs posted by the logged-in user (assuming you have the user ID)
      const user = JSON.parse(localStorage.getItem("Bloguser"));
      const otherBlogs = blogsData.filter(blog => blog.userId !== (user && user._id));

      // Set the state with the filtered blogs
      setBlogs(otherBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <>
      <Row className="g-4">
        {blogs.length > 0 ? (
          blogs.slice().reverse().map((blog, index) => (
            <Col key={blog._id} lg={4} md={6} sm={12}>
              <Card className='blog-card'>
                <Card.Img variant="top" src={blog.thumbnail} className='blog-thumbnail'/>
                <Card.Body>
                <Card.Title className="blog-content" onClick={() => handleTitleClick(blog._id)} style={{ cursor: 'pointer',color:"blue" }}>{blog.title}</Card.Title>
                  {/* <Card.Text className="blog-content">
                    {blog.content}
                  </Card.Text> */}
                  <Card.Text className="text-muted">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No blogs available from other users.</p>
        )}
      </Row>
      <DetailedBlogViewModal show={showModal} handleClose={() => setShowModal(false)} blogId={selectedBlogId}/>
    </>
  );
}

export default OthersBlogs;

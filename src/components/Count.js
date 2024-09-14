import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { FaUser, FaGlobe } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Count() {
  const [userBlogsCount, setUserBlogsCount] = useState(0);
  const [otherBlogsCount, setOtherBlogsCount] = useState(0);
  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("Bloguser"));

  useEffect(() => {
    if (user && user._id) {
      fetchBlogs(user._id);
    }
  }, [user]);

  const fetchBlogs = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
      const blogs = await response.json();

      // Filter blogs by userId
      const userBlogs = blogs.filter(blog => blog.userId === userId);
      const otherBlogs = blogs.filter(blog => blog.userId !== userId);
      // Set counts
      setUserBlogsCount(userBlogs.length);
      setOtherBlogsCount(otherBlogs.length);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const cardData = [
    {
      icon: <FaUser/>,
      title: "Your Blogs",
      subtitle: "Blogs by you",
      text: `You have posted ${userBlogsCount} blog(s).`
    },
    {
      icon: <FaGlobe />,
      title: "Other Blogs",
      subtitle: "Blogs by other users",
      text: `${otherBlogsCount} blog(s) shared by others.`
    }
  ];

  return (
    <>
    <Row className="g-2 mb-5">
      {cardData.map((card, index) => (
        <Col key={index} lg={4} md={6} sm={6} xs={12}>
          <Card style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <h1 className='m-3 fs-1'>{card.icon}</h1>
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{card.subtitle}</Card.Subtitle>
              <Card.Text>{card.text}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
}

export default Count;

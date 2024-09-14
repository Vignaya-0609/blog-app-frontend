import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DetailedBlogViewModal({ show, handleClose, blogId }) {
    const [blogDetails, setBlogDetails] = useState(null);

  useEffect(() => {
    if (blogId) {
      fetchBlogDetails(blogId);
    }
  }, [blogId]);
  const fetchBlogDetails = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blog/${id}`);
      const data = await response.json();
      setBlogDetails(data.post);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };
  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{blogDetails ? blogDetails.title : "Blog"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {blogDetails ? (
          <div>
            <p>{blogDetails.content}</p>
            <p><strong>Created At: </strong>{new Date(blogDetails.createdAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default DetailedBlogViewModal
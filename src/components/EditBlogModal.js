import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function EditBlogModal({ show, handleClose, onBlogCreated, blogId }) {

  // Form field states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [thumbnailError, setThumbnailError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const user = JSON.parse(localStorage.getItem("Bloguser"));

  // Fetch blog details if editing
  useEffect(() => {
    if (blogId) {
      fetchBlogDetails(blogId);
    }
  }, [blogId]);

  const fetchBlogDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${id}`);
      const data = await response.json();
      
      // Pre-fill form fields with blog details
      setTitle(data.post.title);
      setContent(data.post.content);
      setThumbnail(data.post.thumbnail);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  // Validation checks
  const titleCheck = () => {
    if (title.trim() === '') {
      setTitleError('Title is required');
    } else {
      setTitleError('');
    }
  };

  const contentCheck = () => {
    if (content.trim() === '') {
      setContentError('Content is required');
    } else {
      setContentError('');
    }
  };

  const thumbnailCheck = () => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (thumbnail.trim() === '') {
      setThumbnailError('Thumbnail URL is required');
    } else if (!urlRegex.test(thumbnail.trim())) {
      setThumbnailError('Valid thumbnail URL is required');
    } else {
      setThumbnailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    titleCheck();
    contentCheck();
    thumbnailCheck();

    if (titleError || contentError || thumbnailError || !title || !content || !thumbnail) {
      console.log('Validation failed');
      return;
    }

    const updatedBlog = {
      title,
      content,
      thumbnail,
      userId: user._id
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updateBlog/${blogId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });

      if (response.ok) {
        console.log('Blog updated successfully');
        setShowToast(true);
        handleClose();
        setTitle('');
        setContent('');
        setThumbnail('');
        onBlogCreated();
      } else {
        console.error('Failed to update blog');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{blogId ? 'Edit Blog' : 'Update Blog'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title <span className='text-danger'>*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyUp={titleCheck}
                isInvalid={!!titleError}
              />
              <Form.Control.Feedback type="invalid">{titleError}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content <span className='text-danger'>*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter blog content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyUp={contentCheck}
                isInvalid={!!contentError}
              />
              <Form.Control.Feedback type="invalid">{contentError}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formThumbnail">
              <Form.Label>Thumbnail URL <span className='text-danger'>*</span></Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter thumbnail URL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                onKeyUp={thumbnailCheck}
                isInvalid={!!thumbnailError}
              />
              <Form.Control.Feedback type="invalid">{thumbnailError}</Form.Control.Feedback>
            </Form.Group>

            <div className='d-flex justify-content-between'>
              <Button variant="secondary" onClick={() => {
                setTitle('');
                setContent('');
                setThumbnail('');
                setTitleError('');
                setContentError('');
                setThumbnailError('');
              }}>
                Reset
              </Button>
              <Button variant="primary" type="submit">
                {blogId ? 'Update Blog' : 'Blog'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body className='text-light'>{blogId ? 'Blog updated successfully!' : ''}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default EditBlogModal;
